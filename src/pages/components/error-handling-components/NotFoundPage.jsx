import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ConfusedMan from '/images/—Pngtree—confused man concept_7418852.png';

const NotFoundPage = ({ message = 'Page not found' }) => {
  return (
    <div>
      <img
        alt="Confused looking man"
        className="error-image"
        src={ConfusedMan}
      />
      <h1>404 - {message}</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">
        <Button variant="outline-dark">Cick here to Return to Homepage.</Button>
      </Link>
    </div>
  );
};

export default NotFoundPage;
