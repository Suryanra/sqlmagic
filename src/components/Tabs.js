import React, { useContext, useEffect, useState } from "react";
import SqlEditor from "./SqlEditor";
import "./Tabs.css";
import AppContext from "../context/AppContext";

const Tabs = () => {
  const [tabs, setTabs] = useState([{ id: 1, title: "Query 1", query: "" }]);
  const [activeTab, setActiveTab] = useState(1);
  const { query, setQuery } = useContext(AppContext);

  // Sync the active tab's query with Context API when switching tabs
  useEffect(() => {
    const activeTabData = tabs.find((tab) => tab.id === activeTab);
    if (activeTabData) {
      setQuery(activeTabData.query);
    }
  }, [activeTab, tabs, setQuery]); // Runs when activeTab or tabs change

  const addTab = () => {
    const newTabId = tabs.length + 1;
    const newTab = { id: newTabId, title: `Query ${newTabId}`, query: "" };
    setTabs([...tabs, newTab]);
    setActiveTab(newTabId);
    setQuery(""); // Set new tab's query as empty
  };

  const removeTab = (id) => {
    const newTabs = tabs
      .filter((tab) => tab.id !== id)
      .map((tab, index) => ({
        ...tab,
        id: index + 1, // Reassign consecutive IDs
        title: `Query ${index + 1}`,
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
      setQuery(newQuery); // Update the context state only for the active tab
    }
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
        <button className="add-tab-btn" onClick={addTab}>
          + Add Tab
        </button>
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
    </div>
  );
};

export default Tabs;
