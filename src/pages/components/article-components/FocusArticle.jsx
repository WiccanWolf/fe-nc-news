import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import CommentList from '../comment-components/CommentList';
import VoteCounter from '../article-components/VoteCounter';
import NotFoundPage from '../error-handling-components/NotFoundPage';

const FocusArticle = ({ baseURL, isLoggedIn }) => {
  const { article_id } = useParams();
  const [selectedArticle, setSelectedArticle] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(`${baseURL}/articles/${article_id}`);
        setSelectedArticle(response.data.article);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [article_id, baseURL]);

  if (isLoading) {
    return (
      <div className="loading-container">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="black"
          radius="9"
        />
      </div>
    );
  }

  if (isError) {
    return <NotFoundPage message="Article not found" />;
  }

  if (!selectedArticle.title) {
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
      <img src={selectedArticle.article_img_url} alt={selectedArticle.title} />
      <p>{selectedArticle.body}</p>

      <VoteCounter
        baseURL={baseURL}
        article_id={article_id}
        initialVotes={selectedArticle.votes}
        userVote={selectedArticle.user_vote || 'none'}
        isLoggedIn={isLoggedIn}
      />

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
