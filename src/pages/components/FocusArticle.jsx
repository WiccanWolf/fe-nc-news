import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import CommentList from './CommentList';

const FocusArticle = ({ baseURL }) => {
  const { article_id } = useParams();
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(`${baseURL}/articles/${article_id}`);
        setSelectedArticle(response.data.article || response.data);
      } catch (err) {
        console.error('Error fetching article:', err);
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
      <h3>Comments: </h3>
      <CommentList baseURL={baseURL} selectedArticle={selectedArticle} />
    </section>
  );
};

export default FocusArticle;
