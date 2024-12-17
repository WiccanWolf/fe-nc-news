// import { createContext, useContext, useState } from 'react';

// const StatusContext = createContext();

// export const useStatusContext = () => {
//   const value = useContext(StatusContext);
//   if (!value) {
//     throw new Error('useStatusContext has no value!');
//   }
//   return value;
// };

// const StatusProvider = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(null);

//   return (
//     <StatusContext.Provider
//       value={{ isLoading, setIsLoading, isError, setIsError }}
//     >
//       {children}
//     </StatusContext.Provider>
//   );
// };
// export default StatusProvider;
