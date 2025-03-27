import React, { useState, useEffect, useContext } from "react";
import { IoCloseCircle } from "react-icons/io5";
import "./Terminal.css";
import CsvTable from "./CsvTable";
import AppContext from "../context/AppContext";

const Terminal = ({ height, setHeight, setShowTerminal }) => {
  const [csvData, setCsvData] = useState(null);
  const { query,path} = useContext(AppContext);




  // ✅ Fetch CSV dynamically based on path
  useEffect(() => {
    const loadCsv = async () => {
      try {
        const response = await fetch(path); // ✅ Uses dynamic path
        if (!response.ok) {
          throw new Error("Failed to load CSV");
        }
        const text = await response.text();
        setCsvData(text);
      } catch (error) {
        console.error("Error loading CSV:", error);
      }
    };

    loadCsv();
  }, [path]); // ✅ Re-fetch CSV when path changes

  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    setHeight((prevHeight) => Math.max(100, prevHeight - e.movementY));
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="terminal" style={{ height: `${height}px` }}>
      {/* Sticky header */}
      <div className="terminal-header">
        <div className="resizer" onMouseDown={handleMouseDown}></div>
        <IoCloseCircle className="close-icon" onClick={() => setShowTerminal(false)} />
      </div>

      {/* Scrollable content */}
      <div className="terminal-content">
        {csvData ? (
          <div className="table-wrapper">
            <CsvTable csvFile={csvData} />
          </div>
        ) : (
          <p>Loading CSV...</p>
        )}
      </div>
    </div>
  );
};

export default Terminal;
