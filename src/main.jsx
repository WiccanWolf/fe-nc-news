import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
// import RootProvider from './pages/components/ContextProvider.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <RootProvider> */}
    <App />
    {/* </RootProvider> */}
  </StrictMode>
);
