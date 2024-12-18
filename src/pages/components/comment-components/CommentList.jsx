import { useEffect, useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import NewComment from './NewComment';
import { Button } from 'react-bootstrap';

const CommentList = ({ baseURL, selectedArticle, isLoggedIn }) => {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [commentList, setCommentList] = useState([]);
  const [showUserComments, setShowUserComments] = useState(false);
  const article_id = selectedArticle.article_id;

  useEffect(() => {
    const fetchCommentList = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(
          `${baseURL}/articles/${article_id}/comments`
        );
        setCommentList(
          Array.isArray(response.data.comments) ? response.data.comments : []
        );
      } catch (err) {
        setError(true);
        console.error('Error retrieving Comments: ', err);
        alert('Failed to retrieve comments, please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (article_id) {
      fetchCommentList();
    }
  }, [article_id, baseURL]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <ThreeDots
          className="loading"
          visible={true}
          height="80"
          width="80"
          color="black"
          radius="9"
          ariaLabel="three-dots-loading"
        />
      </div>
    );
  }

  if (isError) {
    return (
      <>
        <p>Error loading comments. Please try again later.</p>
      </>
    );
  }

  if (commentList.length === 0) {
    return <p>No comments available for this article.</p>;
  }

  const britishify = (date) => {
    let options = {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(date).toLocaleString('en-GB', options);
  };

  const userComments = commentList.filter(
    (comment) => comment.author === localStorage.getItem('username')
  );

  const allComments = commentList;

  return (
    <>
      <NewComment
        article_id={article_id}
        baseURL={baseURL}
        setCommentList={setCommentList}
        isLoggedIn={isLoggedIn}
        username={localStorage.getItem('username')}
        commentList={userComments}
      />

      <h3>Comments</h3>
      <button
        onClick={() => setShowUserComments((prevState) => !prevState)}
        className="btn btn-outline-dark"
      >
        {showUserComments ? 'Show All Comments' : 'Show My Comments'}
      </button>

      <ol className="comment-section">
        {(showUserComments ? userComments : allComments).map((comment) => (
          <li key={comment.comment_id}>
            <h4>{comment.author}</h4>
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p>
            <p>Created At: {britishify(comment.created_at)}</p>
            {comment.author === localStorage.getItem('username') && (
              <Button
                variant="outline-danger"
                onClick={async (comment_id) => {
                  if (!isLoggedIn) {
                    alert('You must be logged in to delete comments.');
                    navigate('/users/login');
                    return;
                  }
                  try {
                    await axios.delete(
                      `${baseURL}comments/${comment.comment_id}`
                    );
                    setCommentList((prevComments) =>
                      prevComments.filter(
                        (comment) => comment.comment_id !== comment_id
                      )
                    );
                    alert(
                      'Comment deleted. Please refresh the page to update.'
                    );
                  } catch (err) {
                    setError(true);
                    console.error('Error deleting comment: ', err);
                  }
                }}
              >
                Delete
              </Button>
            )}
          </li>
        ))}
      </ol>
    </>
  );
};

export default CommentList;
