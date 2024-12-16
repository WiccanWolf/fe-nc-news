import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ArticlesProvider } from './pages/components/contexts/ArticlesContext';
import { StatusProvider } from './pages/components/contexts/StatusContext';
import { URLProvider } from './pages/components/contexts/URLContext';
import Homepage from './pages/Homepage';
import Articles from './pages/Articles';
import FocusArticle from './pages/components/FocusArticle';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ArticlesProvider>
          <StatusProvider>
            <URLProvider>
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="articles" element={<Articles />} />
                <Route
                  path="/articles/:article_id"
                  element={<FocusArticle />}
                />
              </Routes>
            </URLProvider>
          </StatusProvider>
        </ArticlesProvider>
      </BrowserRouter>
    </div>
  );
};
export default App;
