import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';

const Homepage = ({ baseURL = '/api' }) => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setLoading] = useState(false); // Create new loading component.

  useEffect(() => {
    const fetchArticles = async () => {
      // Best practice to not have sorting logic in Frontend <--- Backend/PSQL would be better.
      // Add a specific endpoint to make the request for the homepage.
      setLoading(true);
      try {
        const response = await axios.get(`${baseURL}articles`);
        const sortedArticles = response.data.articles
          .sort((a, b) => b.votes + b.comments - (a.votes + a.comments))
          .slice(0, 4);

        setArticles(sortedArticles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [baseURL]);

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
  return (
    <section className="homepage">
      <h1>Whispers on the Wind</h1>
      <p>
        There's Whispers on the Wind all around us; this is just a site to
        collect the most interesting ones for your viewing pleasure.
      </p>

      <h2>Most Active Article</h2>
      {articles.length > 0 && (
        <div className="homepage">
          <img
            src={articles[0].article_img_url}
            alt={articles[0].title}
            className="headline-image"
          />
          <Link
            className="article-link"
            to={`/articles/${articles[0].article_id}`}
          >
            <Button variant="outline-dark">{articles[0].title}</Button>
          </Link>
        </div>
      )}

      <h2>Popular Articles</h2>
      {articles.length === 0 ? (
        <p>No articles available</p>
      ) : (
        <ul className="grid-container">
          {articles.slice(1).map((article) => (
            <li key={article.article_id}>
              <img
                src={article.article_img_url}
                alt={article.title}
                className="thumbnail"
              />
              <Link to={`/articles/${article.article_id}`}>
                <Button variant="outline-dark">{article.title}</Button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Homepage;
