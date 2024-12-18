import axios from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import NotFoundPage from './components/error-handling-components/NotFoundPage';

const Topics = ({ baseURL }) => {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const topicResponse = await axios.get(`${baseURL}/topics`);
        setTopics(topicResponse.data.topic);
        const articleResponse = await axios.get(`${baseURL}/articles`);
        setArticles(articleResponse.data.articles);
      } catch (err) {
        console.error('Error fetching Topics:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
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

  if (isError) {
    return <NotFoundPage message="Topic not found" />;
  }

  if (!topics || topics.length === 0) {
    return (
      <>
        <p>No Topics Found</p>
        <Link to="/">Back to Homepage</Link>
      </>
    );
  }

  return (
    <section>
      <ul>
        {topics.map((topic) => {
          const capitalisedSlug =
            topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1);
          return (
            <li key={topic.slug}>
              <Link to={`/topics/${topic.slug}`}>
                <Button variant="outline-dark">
                  <h1 className="topic-title">{capitalisedSlug}</h1>
                </Button>
              </Link>
              <p>{topic.description}</p>
            </li>
          );
        })}
      </ul>
      <Link to="/">
        <Button variant="outline-dark">Return to Home Page</Button>
      </Link>
    </section>
  );
};

export default Topics;
