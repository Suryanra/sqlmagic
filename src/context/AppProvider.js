import React, { useState } from "react";
import AppContext from "./AppContext";

const AppProvider = ({ children }) => {
  // Global state variables
  const [query, setQuery] = useState("");             
  const [result, setResult] = useState(null);         
  const [history, setHistory] = useState([]);    

  return (
    <AppContext.Provider value={{ query, setQuery, result, setResult,history, setHistory }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
