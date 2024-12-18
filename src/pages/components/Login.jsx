import { useState } from 'react';
import { Button, Form, Collapse } from 'react-bootstrap';
import defaultImage from '../../assets/20171206_01.jpg';

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const storedUsername = 'User1';
  const storedPassword = 'password12345@';

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    if (username === storedUsername && password === storedPassword) {
      const token = 'fake-jwt-token';
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);

      setUser({ username });
      window.location.href = '/users/login';
    } else {
      setError(true);
      throw new Error('Invalid Credentials');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser({});
    window.location.href = '/';
  };

  const token = localStorage.getItem('token');
  const usernameInStorage = localStorage.getItem('username');

  if (token && usernameInStorage) {
    return (
      <>
        <div className="login">
          <h4>Welcome, {usernameInStorage}</h4>
          <img src={defaultImage} className="user-image" />
          <Button variant="outline-dark" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="login">
        <h2>Login</h2>
        <Form onSubmit={handleLogin}>
          <section id="username-form">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            ></input>
          </section>
          <section id="password-form">
            <label htmlFor="password">Password</label>
            <input
              type="text"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></input>
          </section>
          {isError && <p>{error}</p>}
          <Button type="submit" variant="outline-dark" disabled={isLoading}>
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>
      </div>
    </>
  );
};
export default Login;
