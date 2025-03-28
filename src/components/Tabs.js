import React, { useContext, useEffect, useState } from "react";
import SqlEditor from "./SqlEditor";
import "./style/Tabs.css";
import AppContext from "../context/AppContext";
import { IoIosAddCircleOutline } from "react-icons/io";
import { VscRunAll } from "react-icons/vsc";
import { Tooltip } from "react-tooltip";



const Tabs = ({ setShowTerminal, showTerminal }) => {

  const [tabs, setTabs] = useState([{ id: 1, title: "Tab 1", query: "" }]);
  const [activeTab, setActiveTab] = useState(1);
  const { query, setQuery, setHistory, history, path, setPath } =
    useContext(AppContext);

  useEffect(() => {
    const activeTabData = tabs.find((tab) => tab.id === activeTab);
    if (activeTabData) {
      setQuery(activeTabData.query);
    }
  }, [activeTab, tabs, setQuery]);

  const addTab = () => {
    const newTabId = tabs.length + 1;
    const newTab = { id: newTabId, title: `Tab ${newTabId}`, query: "" };
    setTabs([...tabs, newTab]);
    setActiveTab(newTabId);
    setQuery("");
  };

  const removeTab = (id) => {
    const newTabs = tabs
      .filter((tab) => tab.id !== id)
      .map((tab, index) => ({
        ...tab,
        id: index + 1,
        title: `Tab ${index + 1}`,
      }));

    setTabs(newTabs);

    if (newTabs.length) {
      const newActiveTab = newTabs[Math.min(activeTab - 1, newTabs.length - 1)];
      setActiveTab(newActiveTab.id);
      setQuery(newActiveTab.query);
    } else {
      setActiveTab(1);
      setQuery("");
    }
  };

  const updateQuery = (id, newQuery) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) =>
        tab.id === id ? { ...tab, query: newQuery } : tab
      )
    );
    if (id === activeTab) {
      setQuery(newQuery);
    }
  };

  const handleQueryExecution = () => {
    if (query.length <= 1) {
      alert("Write the query");
      return;
    }
    setShowTerminal(true);

    setHistory((prevHistory) => {
      if (!prevHistory.includes(query)) {
        return [...prevHistory, query];
      }
      return prevHistory;
    });

    if (query === "select * from customers") {
      setPath("/data/customers.csv");
    } else if (query === "select * from employee") {
      setPath("/data/employee.csv");
    } else if (query === "select * from order") {
      setPath("/data/order.csv");
    } else {
      setPath("/data/order.csv");
    }

    console.log("Executing query:", query);
  };

  return (
    <div className="tabs-container">
      <div className="tabs-header-wrapper">
        <div className="tabs-scroll">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
              {tabs.length > 1 && (
                <button
                  className="close-btn"
                  aria-label="Close-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTab(tab.id);
                    
                  }}
                >
                  ✖
                </button>
              )}
            </div>
          ))}
        </div>

        <div>
          <button
            className="add-tab-btn"
            data-tooltip-id="add-tab-tooltip"
            data-tooltip-content="Add New Tab"
            aria-label="add-tab-btn"
            onClick={addTab}
          >
            <IoIosAddCircleOutline />
          </button>

          <button
            className="add-tab-btn"
            data-tooltip-id="execute-tooltip"
            data-tooltip-content="Execute Query"
            aria-label="execute-btn"
            onClick={handleQueryExecution}
          >
            <VscRunAll />
          </button>
        </div>
      </div>

      <div className="tab-content">
        {tabs.map((tab) =>
          activeTab === tab.id ? (
            <SqlEditor
              key={tab.id}
              query={tab.query}
              updateQuery={(newQuery) => updateQuery(tab.id, newQuery)}
            />
          ) : null
        )}
      </div>

      
      <Tooltip id="add-tab-tooltip" place="bottom" style={{fontSize:"0.6rem"}} />
      <Tooltip id="execute-tooltip" place="bottom" style={{fontSize:"0.6rem"}} />
    </div>
  );
};

export default Tabs;
