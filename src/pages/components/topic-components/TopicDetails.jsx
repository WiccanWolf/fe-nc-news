import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ThreeDots } from 'react-loader-spinner';
import NotFoundPage from '../error-handling-components/NotFoundPage';

const TopicDetails = ({ baseURL }) => {
  const { slug } = useParams();
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [topic, setTopic] = useState([]);
  const [articles, setArticles] = useState([]);
  const [relatedArticles, setRelatedArticles] = useState([]);

  useEffect(() => {
    const fetchTopicDetails = async () => {
      setLoading(true);
      setError(false);
      try {
        const topicResponse = await axios.get(`${baseURL}/topics/${slug}`);
        setTopic(topicResponse.data.topic);
        const articleResponse = await axios.get(`${baseURL}articles`);
        setArticles(articleResponse.data.articles);
        const filteredArticles = articleResponse.data.articles.filter(
          (article) => article.topic === topicResponse.data.topic[0].slug
        );
        setRelatedArticles(filteredArticles);
      } catch (err) {
        console.error('Error fetching topic details:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTopicDetails();
  }, [slug, baseURL]);

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
    return <NotFoundPage message="Topic not found" />;
  }

  if (!topic) {
    return <p>No topic found.</p>;
  }

  return (
    <section>
      <h1>{topic.slug}</h1>
      <p>{topic.description}</p>
      <h3>Related Articles</h3>
      <ul>
        {relatedArticles.length > 0 ? (
          relatedArticles.map((article) => (
            <li key={article.article_id}>
              <Link to={`/articles/${article.article_id}`}>
                <Button
                  className="related-articles"
                  variant="outline-secondary"
                >
                  {article.title}
                </Button>
              </Link>
            </li>
          ))
        ) : (
          <p>No articles found for this topic.</p>
        )}
      </ul>
      <Link to="/topics">
        <Button variant="outline-dark">Back to Topics</Button>
      </Link>
    </section>
  );
};

export default TopicDetails;
