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



  return (
    <nav className="navbar">
      <div>SQL-Magic</div>
      <div className="controls">
        <button
          onClick={() => setShowLayoutOptions(!showLayoutOptions)}
          ref={layoutButtonRef}
          className="layout-button"
        >
          <AiFillLayout className="icon" aria-label="Toggle Layout"/> 
          
        </button>

        
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


        <button onClick={() => setDarkMode(!darkMode)} aria-label="Toggle Mode" >
          {darkMode ? <CiLight className="icon" /> : <MdDarkMode className="icon" />}
          
        </button>
      </div>
    </nav>
  );
});

export default Navbar;
