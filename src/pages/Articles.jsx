import axios from 'axios';
import ArticleCard from './components/ArticleCard';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ThreeDots } from 'react-loader-spinner';
import { useArticlesContext } from './components/contexts/ArticlesContext';
import { useStatusContext } from './components/contexts/StatusContext';
import { useURLContext } from './components/contexts/URLContext';

const Articles = () => {
  const { articles, setArticles } = useArticlesContext();
  const { isLoading, setLoading, isError, setError } = useStatusContext();
  const { baseURL } = useURLContext();

  useEffect(() => {
    setLoading(true);
    setError(false);

    axios
      .get(`${baseURL}/articles`)
      .then(({ data }) => {
        setArticles(data.articles || []);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [baseURL, setLoading, setError, setArticles]);

  if (isError) {
    return <p>Error loading Articles</p>;
  }

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

  if (articles.length === 0) {
    return <p>No Articles Available.</p>;
  }

  return (
    <>
      <Link to="/">Click here to return to the homepage.</Link>
      <ul className="articles-container">
        {articles.map((article) => (
          <ArticleCard article={article} key={article.article_id} />
        ))}
      </ul>
    </>
  );
};

export default Articles;
