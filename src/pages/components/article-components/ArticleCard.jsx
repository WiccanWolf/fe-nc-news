import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ArticleCard = ({ article }) => {
  return (
    <section className="article-card">
      <Card className="article-card-item">
        <Card.Img
          className="article-image"
          variant="top"
          src={article.article_img_url}
          alt={`Thumbnail for the article ${article.title}`} // Shorten a bit if at all possible.
        />
        <Card.Body>
          <Card.Title>{article.title}</Card.Title>
          <Card.Text>{article.body.slice(0, 50).trim() + '...'}</Card.Text>
          {/* Extract everything into a separate function.*/}
          <Link to={`/articles/${article.article_id}`}>
            <Button variant="outline-dark">View Full Article</Button>
          </Link>
        </Card.Body>
      </Card>
    </section>
  );
};

export default ArticleCard;
