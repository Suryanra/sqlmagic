import React from "react";
import "./SqlEditor.css";

const SqlEditor = ({ query, updateQuery }) => {
  return (
    <div className="sql-editor">
      <label>
      <textarea
      aria-label="sql-query" 
      id="sql-query"
      name="sql-query-editor"
        className="editor-input"
        value={query}
        onChange={(e) => updateQuery(e.target.value)}
        placeholder="Write your SQL query here..."
      />
      </label>
    </div>
  );
};

export default SqlEditor;
