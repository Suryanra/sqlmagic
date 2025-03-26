import React, { useState, lazy, Suspense } from "react";
import "./App.css";
import Navbar from "./components/Navbar"; // Import the new Navbar component

// Lazy loading components
const LeftSidebar = lazy(() => import("./components/LeftSidebar"));
const RightSidebar = lazy(() => import("./components/RightSidebar"));
const Terminal = lazy(() => import("./components/Terminal"));

const App = () => {
  const [showLeftSidebar, setShowLeftSidebar] = useState(true);
  const [showRightSidebar, setShowRightSidebar] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalHeight, setTerminalHeight] = useState(200);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`container ${darkMode ? "dark-mode" : "light-mode"}`}>
      <Navbar
        showLeftSidebar={showLeftSidebar}
        setShowLeftSidebar={setShowLeftSidebar}
        showRightSidebar={showRightSidebar}
        setShowRightSidebar={setShowRightSidebar}
        showTerminal={showTerminal}
        setShowTerminal={setShowTerminal}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />

      <div className="main-layout">
        <Suspense fallback={<div>Loading Left Sidebar...</div>}>
          {showLeftSidebar && <LeftSidebar />}
        </Suspense>

        <main className="content">Main Content</main>

        <Suspense fallback={<div>Loading Right Sidebar...</div>}>
          {showRightSidebar && <RightSidebar />}
        </Suspense>
      </div>

      {showTerminal && (
        <div
          className="terminal-container"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            zIndex: 1000,
          }}
        >
          <Suspense fallback={<div>Loading Terminal...</div>}>
            <Terminal
              height={terminalHeight}
              setHeight={setTerminalHeight}
              onClose={() => setShowTerminal(false)}
            />
          </Suspense>
        </div>
      )}
    </div>
  );
};

export default App;
