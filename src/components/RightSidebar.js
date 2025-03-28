import React, { useState } from "react";
import NlptoSql from "./NlptoSql";
import Help from "./Help";
import { FaDatabase } from "react-icons/fa";
import { MdLiveHelp } from "react-icons/md";
import { SiConvertio } from "react-icons/si";
import './style/RightSidebar.css'
const RightSidebar = () => {
  
  const [activeTab, setActiveTab] = useState("schema");
  return (
    <aside className="sidebar right">
      <div className="sidebar-navbar">
        <button
          className={activeTab === "schema" ? "active" : ""}
          onClick={() => setActiveTab("schema")}
        >
          <SiConvertio className="databaseicon" />
          NLP to SQL
        </button>
        <button
          className={activeTab === "history" ? "active" : ""}
          onClick={() => setActiveTab("history")}
        >
          <MdLiveHelp  className="databaseicon"/>
          Help
        </button>
      </div>
      <div className="side-bar-content-to-render">
        <div className="component-wrapper">
          {activeTab === "schema" ? <NlptoSql /> : <Help />}
        </div>
        
      </div>
    </aside>
  )
}

export default RightSidebar
