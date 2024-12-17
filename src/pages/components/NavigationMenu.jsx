import { Container, Nav, Navbar } from 'react-bootstrap';

const NavigationMenu = () => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          <Nav.Link href="/articles">Articles</Nav.Link>
          <Nav.Link href="/topics">Topics</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};
export default NavigationMenu;
