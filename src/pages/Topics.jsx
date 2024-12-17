import axios from 'axios';
import { useEffect, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

const Topics = ({ baseURL }) => {
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [topics, setTopics] = useState([]);
  useEffect(() => {
    const fetchTopics = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await axios.get(`${baseURL}/topics`);
        setTopics(response.data.topic);
        console.log(response.data.topic);
      } catch (err) {
        console.error('Error fetching Topics:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTopics();
  }, []);

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
    return <p>Error loading topics. Please try again later.</p>;
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
              <h1>{capitalisedSlug}</h1>
              <p>{topic.description}</p>
            </li>
          );
        })}
      </ul>
      <Link to="/">Return to Homepage</Link>
    </section>
  );
};

export default Topics;
