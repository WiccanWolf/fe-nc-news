import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Homepage from './pages/Homepage';
import Articles from './pages/Articles';
import Topics from './pages/Topics';
import Login from './pages/components/Login';
import NavigationMenu from './pages/components/NavigationMenu';
import FocusArticle from './pages/components/article-components/FocusArticle';
import TopicDetails from './pages/components/topic-components/TopicDetails';
import NotFoundPage from './pages/components/error-handling-components/NotFoundPage';

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
        <NavigationMenu user={user} className="navigation" />
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
          <Route
            path="topics/:slug"
            element={<TopicDetails baseURL={baseURL} />}
          />
          <Route
            path="/users/login"
            element={<Login className="login" setUser={setUser} />}
          />
          <Route path="*" element={NotFoundPage} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
