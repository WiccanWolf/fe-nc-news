import { useEffect, useState } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import NewComment from './NewComment';

const CommentList = ({ baseURL, selectedArticle, isLoggedIn }) => {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [commentList, setCommentList] = useState([]);
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

  return (
    <>
      <NewComment
        article_id={article_id}
        baseURL={baseURL}
        setCommentList={setCommentList}
        isLoggedIn={isLoggedIn}
        username={localStorage.getItem('username')}
        commentList={commentList}
      />
      <ol>
        {commentList.map((comment) => (
          <li key={comment.comment_id}>
            <h4>{comment.author}</h4>
            <p>{comment.body}</p>
            <p>Votes: {comment.votes}</p>
            <p>Created At: {britishify(comment.created_at)}</p>
          </li>
        ))}
      </ol>
    </>
  );
};

export default CommentList;
