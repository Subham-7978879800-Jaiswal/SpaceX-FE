import React, { useState } from "react";
import { useContext } from "react";

const Store = React.createContext({});

const StoreProvider = ({ children }) => {
  const [launches, saveLaunches] = useState([]);
  return (
    <Store.Provider value={{ launches, saveLaunches,}}>
      {children}
    </Store.Provider>
  );
};

const useStore = () => {
  return useContext(Store);
};

export { useStore, StoreProvider };
