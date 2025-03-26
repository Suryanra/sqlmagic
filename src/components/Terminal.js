import React from "react";


const Terminal = ({ height, setHeight }) => {
  const handleMouseDown = (e) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e) => {
    setHeight((prevHeight) => Math.max(100, prevHeight - e.movementY));
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="terminal" style={{ height: `${height}px` }}>
      <div className="resizer" onMouseDown={handleMouseDown}></div>
      <p>Terminal Output</p>
    </div>
  );
};

export default Terminal;
