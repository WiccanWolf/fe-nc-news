import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import loki from '../assets/20180816_120800.jpg';

const Homepage = () => {
  return (
    <section className="homepage">
      <p>Hello world! Let's build a news site...</p>
      <p>
        Loki is just making sure nothing untoward occurs in the homepage whilst
        Toni builds the rest of the endpoints.
      </p>
      <img className="ph-img" src={loki} />
      <Link to="/articles">
        <Button variant="outline-info">View Articles</Button>
      </Link>
    </section>
  );
};

export default Homepage;
