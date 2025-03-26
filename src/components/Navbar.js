import React from "react";

const Navbar = React.memo(
  ({
    showLeftSidebar,
    setShowLeftSidebar,
    showRightSidebar,
    setShowRightSidebar,
    showTerminal,
    setShowTerminal,
    darkMode,
    setDarkMode,
  }) => {
    return (
      <nav className="navbar">
        <div className="controls">
          <button onClick={() => setShowLeftSidebar(!showLeftSidebar)}>
            Toggle Left Sidebar
          </button>
          <button onClick={() => setShowRightSidebar(!showRightSidebar)}>
            Toggle Right Sidebar
          </button>
          <button onClick={() => setShowTerminal(!showTerminal)}>Execute</button>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </nav>
    );
  }
);

export default Navbar;
