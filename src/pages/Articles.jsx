import axios from 'axios';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Form } from 'react-bootstrap';
import ArticleCard from './components/article-components/ArticleCard';
import NotFoundPage from './components/error-handling-components/NotFoundPage';
import SortArticles from './components/article-components/FilterArticles';
import Loading from './components/Loading';

const Articles = ({ baseURL }) => {
  const [articles, setArticles] = useState([]); // Shouldn't need both states VVV
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    axios
      .get(`${baseURL}/articles`)
      .then(({ data }) => {
        setArticles(data.articles);
      })
      .catch((err) => {
        setError(true);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [baseURL]);

  if (isError) {
    return <NotFoundPage message="Article not found" />;
  }

  if (isLoading) {
    <Loading />;
  }

  return (
    <>
      <h1 className="articles">Articles</h1>
      <SortArticles articles={articles} setArticles={setArticles} />
      <div className="article-card-container">
        {articles.map((article) => (
          <ArticleCard article={article} key={article.article_id} />
        ))}
      </div>
    </>
  );
};

export default Articles;
