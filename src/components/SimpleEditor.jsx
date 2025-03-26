import React, { useContext } from "react";
import "./SimpleEditor.css";
import AppContext from "../context/AppContext";

const SimpleEditor = () => {
  const { query, setQuery } = useContext(AppContext);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Query:", query);
    // You can perform query execution or further processing here
  };

  return (
    <div className="sql-editor-container">
      <h1 className="editor-title">SQL Query Editor</h1>

      <form onSubmit={handleSubmit}>
        <textarea
          value={query}
          onChange={handleInputChange}
          className="sql-textarea"
          placeholder="Write your SQL query here..."
        />
      </form>
    </div>
  );
};

export default SimpleEditor;
