import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';

const NewComment = ({ article_id, baseURL, setCommentList }) => {
  const [username, setUsername] = useState('');
  const [commentBody, setCommentBody] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [isError, setError] = useState(false);

  const handleNewComment = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(false);
    try {
      const response = await axios.post(
        `${baseURL}articles/${article_id}/comments`,
        {
          author: username || 'Anon',
          body: commentBody,
        }
      );
      setCommentList((prevComments) => [
        ...prevComments,
        response.data.comment,
      ]);
      setUsername('');
      setCommentBody('');
    } catch (err) {
      setError(true);
      throw new Error('Error posting new comment: ', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form onSubmit={handleNewComment}>
      <InputGroup className="mb-3">
        <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
        <Form.Control
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          aria-label="Username"
        />
      </InputGroup>

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
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting Comment. Please wait.' : 'Submit Comment'}
      </Button>
      {isError && <p>Error submitting comment. Please try again later.</p>}
    </Form>
  );
};

export default NewComment;
