import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import CommentList from './CommentList';
import { Button } from 'react-bootstrap';

const FocusArticle = ({ baseURL, isLoggedIn }) => {
  const { article_id } = useParams();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [votes, setVotes] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(`${baseURL}articles/${article_id}`);
        const articleData = response.data.article || response.data;
        setSelectedArticle(articleData);
        setVotes(articleData.votes);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [article_id, baseURL]);

  const handleVoteChange = async (inc_votes) => {
    if (!isLoggedIn) {
      alert('You must be logged in to vote.');
      navigate('/');
      return;
    } else {
      setLoading(true);
      setError(false);
    }
    try {
      const { data } = await axios.patch(`${baseURL}/articles/${article_id}`, {
        inc_votes,
      });
      setVotes(data.article.votes);
      setSelectedArticle((prevArticle) => ({
        ...prevArticle,
        votes: data.article.votes,
      }));
    } catch (err) {
      setError(true);
      console.error(
        'Error updating votes:',
        err.response ? err.response.data : err.message
      );
      alert('Failed to update votes, please try again.');
    } finally {
      setLoading(false);
    }
  };

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
    return <p>Error loading article. Please try again later.</p>;
  }

  if (!selectedArticle) {
    return (
      <>
        <p>No Article Found</p>
        <Link to="/articles">Back to Articles</Link>
      </>
    );
  }

  return (
    <section>
      <h1>{selectedArticle.title}</h1>
      <img
        src={selectedArticle.article_img_url}
        alt={selectedArticle.title}
        style={{ maxWidth: '100%' }}
      />
      <p>{selectedArticle.body}</p>
      <h3>Votes: {votes}</h3>
      <section className="voting-buttons">
        <Button variant="outline-dark" onClick={() => handleVoteChange(1)}>
          Upvote
        </Button>
        <Button variant="outline-dark" onClick={() => handleVoteChange(-1)}>
          Downvote
        </Button>
      </section>
      <h3>Comments: </h3>
      <CommentList
        baseURL={baseURL}
        selectedArticle={selectedArticle}
        isLoggedIn={isLoggedIn}
      />
    </section>
  );
};

export default FocusArticle;
