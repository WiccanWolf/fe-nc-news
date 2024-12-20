import { useState } from 'react';
import { Button, Card } from 'react-bootstrap';

const TopicCard = ({ article }) => {
  const [viewAsGrid, setViewAsGrid] = useState(true);

  const toggleView = () => {
    setViewAsGrid((prev) => !prev);
  };

  return (
    <>
      <Button variant="outline-dark" onClick={toggleView}>
        {viewAsGrid ? 'Switch to List View' : 'Switch to Grid View'}
      </Button>
      <Card className="topic-card">
        <Card.Body>
          <Card.Link to={`article/${article.article_id}`}>
            {article.title}
          </Card.Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default TopicCard;
