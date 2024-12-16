import { Card } from 'react-bootstrap';

const ArticleCard = ({ article }) => {
  return (
    <section className="article-card">
      <Card style={{ width: '18rem' }}>
        <Card.Img
          className="article-image"
          variant="top"
          src={article.article_img_url}
        />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.body}</Card.Text>
          <Card.Text className="semi-important">
            Topic: {article.author}
          </Card.Text>
        </Card.Body>
      </Card>
    </section>
  );
};

export default ArticleCard;
