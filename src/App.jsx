import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Articles from './pages/Articles';
import FocusArticle from './pages/components/FocusArticle';
import Topics from './pages/Topics';

const baseURL = 'https://the-wolves-den.onrender.com/api/';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="articles" element={<Articles baseURL={baseURL} />} />
          <Route
            path="/articles/:article_id"
            element={<FocusArticle baseURL={baseURL} />}
          />
          <Route path="topics" element={<Topics baseURL={baseURL} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
export default App;
