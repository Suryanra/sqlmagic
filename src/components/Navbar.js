import React, { useState, useRef, useEffect, useContext } from "react";
import { BsLayoutSidebar, BsReverseLayoutSidebarReverse } from "react-icons/bs";
import { TfiLayoutSidebarNone, TfiLayoutSidebar2 } from "react-icons/tfi";
import { AiFillLayout } from "react-icons/ai";
import { VscRunAll } from "react-icons/vsc";
import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";
import AppContext from "../context/AppContext";
import { VscRunCoverage } from "react-icons/vsc";

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
  const { setHistory, query, history, path, setPath } = useContext(AppContext);

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

  const handleQueryExecution = () => {
    if(query.length<=1){
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
    <nav className="navbar">
      <div>SQL-Magic</div>
      <div className="controls">

        {/* Layout Button */}
        <button
          onClick={() => setShowLayoutOptions(!showLayoutOptions)}
          ref={layoutButtonRef}
          className="layout-button"
        >
          <AiFillLayout className="icon" aria-label="Toggle Layout"/> 
          {/* Layout */}
        </button>

        {/* Layout Options */}
        {showLayoutOptions && (
          <div className="layout-controls" ref={layoutRef}>
            <button onClick={() => { setShowLeftSidebar(true); setShowRightSidebar(false); }} aria-label="leftsidebar">
              <BsLayoutSidebar className="icon" />
            </button>
            <button onClick={() => { setShowLeftSidebar(false); setShowRightSidebar(false); }}  aria-label="maincontent">
              <TfiLayoutSidebarNone className="icon" />
            </button>
            <button onClick={() => { setShowLeftSidebar(false); setShowRightSidebar(true); }}  aria-label="rightsidebar">
              <BsReverseLayoutSidebarReverse className="icon" />
            </button>
            <button onClick={() => { setShowLeftSidebar(true); setShowRightSidebar(true); }}  aria-label="bothsidebar">
              <TfiLayoutSidebar2 className="icon" />
            </button>
          </div>
        )}

        {/* Execute Button */}
        <button onClick={handleQueryExecution}>
          <VscRunAll className="icon" aria-label="Execute" />
           {/* Execute */}
        </button>

        {/* Dark Mode Toggle */}
        <button onClick={() => setDarkMode(!darkMode)} aria-label="Toggle Mode" >
          {darkMode ? <CiLight className="icon" /> : <MdDarkMode className="icon" />}
          {/* {darkMode ? " Light Mode" : " Dark Mode"} */}
        </button>
      </div>
    </nav>
  );
});

export default Navbar;
