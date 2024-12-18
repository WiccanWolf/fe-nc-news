import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import { Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewComment = ({
  article_id,
  baseURL,
  setCommentList,
  isLoggedIn,
  username,
}) => {
  const [commentBody, setCommentBody] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [isError, setError] = useState(false);

  const navigate = useNavigate();

  const handleNewComment = async (e) => {
    if (!isLoggedIn) {
      alert('You must be logged in to comment.');
      navigate('/users/login');
      return;
    }
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    try {
      const response = await axios.post(
        `${baseURL}articles/${article_id}/comments`,
        {
          author: username,
          body: commentBody,
        }
      );
      setCommentList((prevComments) => [
        response.data.comment,
        ...prevComments,
      ]);
      setCommentBody('');
    } catch (err) {
      setError(true);
      console.error('Error posting new comment: ', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <Form onSubmit={handleNewComment}>
        <Form.Label htmlFor="comment-body">Your Comment</Form.Label>
        <InputGroup className="mb-3">
          <Form.Control
            as="textarea"
            id="comment-body"
            value={commentBody}
            onChange={(e) => setCommentBody(e.target.value)}
            aria-label="comment-body"
            placeholder="Write your comment here."
          />
        </InputGroup>
        <Button type="submit" variant="outline-dark" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting Comment. Please wait.' : 'Submit Comment'}
        </Button>
        {isError && (
          <Alert variant="warning">
            <Alert.Heading>Error submitting your comment.</Alert.Heading>
            <p>
              There was an error while submitting your comment. Please check if
              the comment body is empty or try again later.
            </p>
            <hr />
            <Alert.Link href="/users/login">
              Please Note: Only logged in Users may vote and comment on
              articles.
            </Alert.Link>
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default NewComment;
