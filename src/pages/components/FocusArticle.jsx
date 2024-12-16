import { useEffect } from 'react';
import { useArticlesContext } from './contexts/ArticlesContext';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useStatusContext } from './contexts/StatusContext';
import { useURLContext } from './contexts/URLContext';

const FocusArticle = () => {
  const { article_id } = useParams();
  const { setArticles } = useArticlesContext();
  const { selectedArticle } = useArticlesContext();
  const { isLoading, setLoading, isError, setError } = useStatusContext();
  const { baseURL } = useURLContext();

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${baseURL}/articles/${article_id}`);
        setArticles(response.data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchArticle();
  }, [article_id]);

  if (!selectedArticle || selectedArticle.article_id !== parseInt(article_id))
    return (
      <>
        <p>No Article Found</p>
        <Link to="/articles">Back to Articles</Link>
      </>
    );
  return (
    <>
      {isError ? (
        <p>Error Loading Article.</p>
      ) : isLoading ? (
        setLoading(true)
      ) : (
        <section>
          <h1>{selectedArticle.title}</h1>
          <img
            src={selectedArticle.article_img_url}
            alt={selectedArticle.title}
          />
          <p>{selectedArticle.body}</p>
        </section>
      )}
    </>
  );
};
export default FocusArticle;
