import React, { useState } from "react";
import "./LeftSidebar.css";
import SchemaComponent from "./SchemaComponent";
import HistoryComponent from "./HistoryComponent";
import { FaDatabase } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
const LeftSidebar = () => {
  const [activeTab, setActiveTab] = useState("schema");

  return (
    <aside className="sidebar left">
      <div className="sidebar-navbar">
        <button
          className={activeTab === "schema" ? "active" : ""}
          onClick={() => setActiveTab("schema")}
        >
          <FaDatabase className="databaseicon" />
          Schema
        </button>
        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => setActiveTab("history")}
        >
          <FaHistory className="databaseicon"/>
          History
        </button>
      </div>
      <div className="side-bar-content-to-render">
        {activeTab === "schema" ? <SchemaComponent /> : <HistoryComponent />}
      </div>
    </aside>
  );
};

export default LeftSidebar;
