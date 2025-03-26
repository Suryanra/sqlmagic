import React, { useState, useRef, useEffect,useContext } from "react";
import { BsLayoutSidebar, BsReverseLayoutSidebarReverse } from "react-icons/bs";
import { TfiLayoutSidebarNone, TfiLayoutSidebar2 } from "react-icons/tfi";
import AppContext from "../context/AppContext";

const Navbar = React.memo(({
  showLeftSidebar,
  setShowLeftSidebar,
  showRightSidebar,
  setShowRightSidebar,
  showTerminal,
  setShowTerminal,
  darkMode,
  setDarkMode,
}) => {
  const [showLayoutOptions, setShowLayoutOptions] = useState(false);
  const layoutRef = useRef(null);
  const layoutButtonRef = useRef(null);
const {setHistory,query,history}=useContext(AppContext);
  useEffect(() => {
    function handleClickOutside(event) {
      if (layoutRef.current && !layoutRef.current.contains(event.target)) {
        setShowLayoutOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleQueryExecution=()=>{
    setShowTerminal(true);
setHistory((prevHistory) => {
  if (!prevHistory.includes(query)) {
    return [...prevHistory, query];
  }

  return prevHistory; 
});

  console.log(history,query)
  }
  return (
    <nav className="navbar">
      <div className="controls">
        <button 
          onClick={() => setShowLayoutOptions(!showLayoutOptions)} 
          ref={layoutButtonRef} 
          className="layout-button"
        >
          Layout
        </button>
        {showLayoutOptions && (
          <div className="layout-controls" ref={layoutRef}>
            <button onClick={() => { setShowLeftSidebar(true); setShowRightSidebar(false); }}>
              <BsLayoutSidebar />
            </button>
            <button onClick={() => { setShowLeftSidebar(false); setShowRightSidebar(false); }}>
              <TfiLayoutSidebarNone />
            </button>
            <button onClick={() => { setShowLeftSidebar(false); setShowRightSidebar(true); }}>
              <BsReverseLayoutSidebarReverse />
            </button>
            <button onClick={() => { setShowLeftSidebar(true); setShowRightSidebar(true); }}>
              <TfiLayoutSidebar2 />
            </button>
          </div>
        )}
        <button onClick={handleQueryExecution }>Execute</button>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
});

export default Navbar;
