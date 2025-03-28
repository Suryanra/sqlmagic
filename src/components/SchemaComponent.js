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
            <tbody>
              {table.columns.map((column, colIndex) => (
                <tr key={colIndex}>
                  <td className="col-name">{column.name}</td>
                  <td className="col-type">{column.type}</td>
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
