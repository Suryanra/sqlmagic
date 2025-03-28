import React from "react";
import "./SqlEditor.css";

const SqlEditor = ({ query, updateQuery }) => {
  return (
    <div className="sql-editor">
      <textarea
      aria-label="sql-query" 
        className="editor-input"
        value={query}
        onChange={(e) => updateQuery(e.target.value)}
        placeholder="Write your SQL query here..."
      />
    </div>
  );
};

export default SqlEditor;
