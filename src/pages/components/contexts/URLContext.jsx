import { createContext, useContext } from 'react';

export const URLContext = createContext();

export const useURLContext = () => {
  return useContext(URLContext);
};

export const URLProvider = ({ children }) => {
  const baseURL = 'https://the-wolves-den.onrender.com/api/';
  return (
    <URLContext.Provider value={{ baseURL }}>{children}</URLContext.Provider>
  );
};
