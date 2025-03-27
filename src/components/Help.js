import React from 'react'

const Help = () => {
  return (
        <div className="help-section">
          <h3 className="help-text">SQL Basics</h3>
          <p className="sql-basic-para">
            SQL (Structured Query Language) is used to communicate with a
            database.
          </p>
          <h3 className="help-text">Common Commands</h3>
          <ul className="help-list">
            <li>
              <strong>SELECT</strong> - extracts data from a database
            </li>
            <li>
              <strong>UPDATE</strong> - updates data in a database
            </li>
            <li>
              <strong>DELETE</strong> - deletes data from a database
            </li>
            <li>
              <strong>INSERT INTO</strong> - inserts new data
            </li>
            <li>
              <strong>CREATE TABLE</strong> - creates a new table
            </li>
            <li>
              <strong>ALTER TABLE</strong> - modifies a table
            </li>
            <li>
              <strong>DROP TABLE</strong> - deletes a table
            </li>
          </ul>

          <div className="external-links">
            <h3 className="help-text">Extra Resources:</h3>
            <a
              href="https://sqliteonline.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SQLite Online
            </a>{" "}
            |
            <a
              href="https://www.w3schools.com/sql/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              W3Schools SQL Tutorial
            </a>
          </div>
        </div>
  )
}

export default Help
