import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NewComment = ({
  article_id,
  baseURL,
  setCommentList,
  isLoggedIn,
  username,
  commentList,
}) => {
  const [commentBody, setCommentBody] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [isError, setError] = useState(false);
  const [showMyComments, setShowMyComments] = useState(false);

  const navigate = useNavigate();

  const handleNewComment = async (e) => {
    if (!isLoggedIn) {
      alert('You must be logged in to comment.');
      navigate('/');
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
        ...prevComments,
        response.data.comment,
      ]);
      setCommentBody('');
    } catch (err) {
      setError(true);
      console.error('Error posting new comment: ', err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!isLoggedIn) {
      alert('You must be logged in to delete comments.');
      navigate('/');
      return;
    }
    try {
      await axios.delete(`${baseURL}comments/${commentId}`);
      setCommentList((prevComments) =>
        prevComments.filter((comment) => comment.comment_id !== commentId)
      );
      alert('Comment deleted.');
    } catch (err) {
      setError(true);
      console.error('Error deleting comment: ', err);
    }
  };

  const handleShowMyComments = () => {
    setShowMyComments((prevState) => !prevState);
  };

  const filteredComments = showMyComments
    ? commentList.filter((comment) => comment.author === username)
    : commentList;

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
        {isError && <p>Error submitting comment. Please try again later.</p>}
      </Form>

      <Button variant="outline-dark" onClick={handleShowMyComments}>
        {showMyComments ? 'Show All Comments' : 'Show My Comments'}
      </Button>

      <h3>Comments</h3>
      <ol>
        {filteredComments.map((comment) => (
          <li key={comment.comment_id}>
            <h4>{comment.author}</h4>
            <p>{comment.body}</p>
            {comment.author === username && (
              <Button
                variant="danger"
                onClick={() => handleDeleteComment(comment.comment_id)}
              >
                Delete
              </Button>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default NewComment;
