import React, { useState } from "react";

const NlptoSql = () => {
    const [inputText, setInputText] = useState("");
    const [generatedSQL, setGeneratedSQL] = useState("");
    const [copied, setCopied] = useState(false);
    
  const handleGenerateSQL = () => {
    if (inputText.trim()) {
      setGeneratedSQL("select * from employee");
    } else {
      setGeneratedSQL("");
    }
  };
  return (
        <div className="nl-to-sql">
          <label className="input-label" htmlFor="nlp-to-sql">Ask in natural language</label>
          <textarea
          id="nlp-to-sql"
            className="textarea-input"
            aria-label="nlp-to-sql"
            name="nlp-to-sql" 
            rows="3"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>
          <button className="generate-btn" onClick={handleGenerateSQL}>
            Generate SQL
          </button>

          {generatedSQL && (
            <div className="sql-output">
              <label className="sql-label">Generated SQL</label>
              <div className="sql-text-container">
                <pre className="sql-text">{generatedSQL}</pre>
                <img
                  src="/copyicon.jpg"
                  alt="Copy"
              loading="lazy"
              width="12"
              height="12"
                  className="copy-icon"
                  onClick={() => {
                    navigator.clipboard.writeText(generatedSQL);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000); // Hide message after 2 sec
                  }}
                />
                {copied && <span className="copied-text">Copied!</span>}
              </div>

              {/* Explanation Section */}
              <label className="sql-label">Explanation</label>
              <pre className="explanation-text">
                This is a basic query that selects all columns from the detected
                table of interest and limits the results to 50 rows.
              </pre>
            </div>
          )}
        </div>
  )
}

export default NlptoSql
