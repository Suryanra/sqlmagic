import React, { useContext } from "react";
import AppContext from "../context/AppContext";
import './HistoryComponents.css'
const HistoryComponent = () => {
  const { history, setQuery } = useContext(AppContext);

  const handleClick = (query) => {
    setQuery(query);  
  };

  return (
    <div className="history-container">
      {history && history.map((query, index) => (
        <div 
          key={index} 
          className="history-query" 
          onClick={() => handleClick(query)} 
        >
          {query}
        </div>
      ))}
    </div>
  );
};

export default HistoryComponent;
