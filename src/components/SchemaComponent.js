import React from "react";
import schemaData from "./schemaData"; // Assuming your schema data is stored here
import "./SchemaComponent.css"; // Import styles

const SchemaComponent = () => {
  return (
    <div className="schema-container">
      <h2 className="schema-title">Database Schema</h2>
      {schemaData.map((table, index) => (
        <div key={index} className="table-box">
          <div className="table-header">{table.tableName}</div>
          <table className="schema-table">
            <thead>
              <tr>
                <th>Column</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {table.columns.map((column, colIndex) => (
                <tr key={colIndex}>
                  <td>{column.name}</td>
                  <td>{column.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default SchemaComponent;
