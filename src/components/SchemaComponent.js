import React from "react";
import schemaData from "./schemaData"; 
import "./style/SchemaComponent.css"; 
import TableDropdown from "./TableDropdown";
const SchemaComponent = ({setShowTerminal, showTerminal }) => {
  return (
    <div className="schema-container">
      <div className="schema-title">Database Schema</div>
      <TableDropdown setShowTermianl={setShowTerminal} />
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
