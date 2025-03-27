import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import "./HistoryComponents.css";

const HistoryComponent = () => {
  const { history, setQuery } = useContext(AppContext);
  const [copiedIndex, setCopiedIndex] = useState(null);

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
          <div key={index} className="history-query">
            <span onClick={() => handleClick(query)}>{query}</span>

            {/* Copy Button */}
            <button
              className="copy-btn"
              onClick={() => handleCopy(query, index)}
            >
              {copiedIndex === index ? "✅" : "📋"}
            </button>
          </div>
        ))}
    </div>
  );
};

export default HistoryComponent;
