import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Articles from './pages/Articles';
import FocusArticle from './pages/components/FocusArticle';
import Topics from './pages/Topics';
import { useEffect, useState } from 'react';
import Login from './pages/components/Login';
import NavigationMenu from './pages/components/NavigationMenu';

const baseURL = 'https://the-wolves-den.onrender.com/api/';

const App = () => {
  const [user, setUser] = useState({});
  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setUser({ username });
    }
  }, []);

  return (
    <div>
      <BrowserRouter>
        <NavigationMenu className="navigation" />
        <Login className="login" setUser={setUser} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="articles" element={<Articles baseURL={baseURL} />} />
          <Route
            path="/articles/:article_id"
            element={
              <FocusArticle
                baseURL={baseURL}
                isLoggedIn={user ? true : false}
              />
            }
          />
          <Route path="topics" element={<Topics baseURL={baseURL} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
