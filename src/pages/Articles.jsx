import axios from 'axios';
import ArticleCard from './components/ArticleCard';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FallingLines, ThreeDots } from 'react-loader-spinner';

const Articles = () => {
  const url = 'https://the-wolves-den.onrender.com/api/articles';
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then(({ data }) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <Link to="/">Click here to return to the homepage.</Link>
      {isLoading ? (
        <ThreeDots
          className="loading"
          visible={true}
          height="80"
          width="80"
          color="black"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <>
          <p>We're in Articles now baby!</p>
          <ul className="articles-container">
            {articles.map((article) => (
              <ArticleCard article={article} key={article.article_id} />
            ))}
          </ul>
        </>
      )}
    </>
  );
};

export default Articles;
