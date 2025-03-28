import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import "./HistoryComponents.css";

const HistoryComponent = () => {
  const { history, setQuery } = useContext(AppContext);
  const [copiedIndex, setCopiedIndex] = useState(null);  // Track copied item index

  const handleClick = (query) => {
    setQuery(query);
  };

  const handleCopy = (query, index) => {
    navigator.clipboard.writeText(query); // Copy to clipboard
    setCopiedIndex(index);

    // Reset "Copied!" message after 2 seconds
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="history-container">
      {history &&
        history.map((query, index) => (
          <div key={index} className="sql-text-container">
            <pre className="sql-text">{query.length < 26 ? query : query.slice(0, 25) + "..."}</pre>

            <img
              src="/copyicon.jpg"
              alt="Copy"
              className="copy-icon"
              onClick={() => handleCopy(query, index)}
            />

            {/* Show "Copied!" message only for the copied index */}
            {copiedIndex === index && <span className="copied-text">Copied!</span>}
          </div>
        ))}
    </div>
  );
};

export default HistoryComponent;
