import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavigationMenu = () => {
  return (
    <>
      <Link to="/articles">
        <Button variant="outline-info">View Articles</Button>
      </Link>
      <Link to="/topics">
        <Button variant="outline-info">View Topics</Button>
      </Link>
    </>
  );
};
export default NavigationMenu;
