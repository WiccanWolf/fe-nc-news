import { createContext, useContext, useState } from 'react';

const StatusContext = createContext();

export const useStatusContext = () => {
  return useContext(StatusContext);
};

export const StatusProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  return (
    <StatusContext.Provider
      value={{ isLoading, setIsLoading, isError, setIsError }}
    >
      {children}
    </StatusContext.Provider>
  );
};
