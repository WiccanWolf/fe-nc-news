import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import NotFoundPage from '../error-handling-components/NotFoundPage';
import Loading from '../Loading';
import TopicCard from './TopicCard';

const TopicDetails = ({ baseURL }) => {
  const { slug } = useParams();
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [topic, setTopic] = useState([]);

  useEffect(() => {
    const fetchTopicDetails = async () => {
      setLoading(true);
      setError(false);
      try {
        const topicResponse = await axios.get(`${baseURL}/topics/${slug}`);
        setTopic(topicResponse.data.topic);
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
    <Loading />;
  }

  if (isError) {
    return <NotFoundPage message="Topic not found" />;
  }

  return (
    <section>
      <h1>{topic[0] ? topic[0].slug : 'Loading topic title...'}</h1>
      <h2>Related Articles</h2>
      {topic.map((topic) => (
        <TopicCard topic={topic} key={topic.slug} />
      ))}
      <Link to="/topics">
        <Button variant="outline-dark">Back to Topics</Button>
      </Link>
    </section>
  );
};

export default TopicDetails;
