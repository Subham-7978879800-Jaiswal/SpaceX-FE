import { useContext, useState } from "react";
import React from "react";

const ErrorContext = React.createContext({});

const ErrorProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState("");

  const updateErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 5000);
  };

  return (
    <ErrorContext.Provider value={{ errorMessage, updateErrorMessage }}>
      {children}
    </ErrorContext.Provider>
  );
};

const useErrorContext = () => {
  return useContext(ErrorContext);
};

export { ErrorProvider, useErrorContext };
