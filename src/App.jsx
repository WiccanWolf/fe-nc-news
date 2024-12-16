import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import Articles from './pages/Articles';
// import Topics from './pages/Topics';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="articles" element={<Articles />} />
          {/* <Route path="topics" element={<Topics />} /> */}
        </Routes>
      </BrowserRouter>
    </>
  );
};
export default App;
