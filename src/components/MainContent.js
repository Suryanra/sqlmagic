import React from "react";
import Tabs from "./Tabs";
import './MainContent.css'
const MainContent = ({setShowTerminal,showTerminal}) => {
  return (
    <div className="main-content" >
      <Tabs setShowTerminal={setShowTerminal} showTerminal={showTerminal} />
    </div>
  );
};

export default MainContent;
