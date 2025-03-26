import React, { useRef, useCallback, useState } from "react";
import { createReactEditorJS } from "react-editor-js";
import axios from "axios";
import "./TextEditor.css"; // Import the CSS file

// Import only the paragraph tool
import Paragraph from "@editorjs/paragraph";

const EDITOR_JS_TOOLS = {
  paragraph: Paragraph,
};

const TextEditor = () => {
  const ReactEditorJS = createReactEditorJS();
  const editorCore = useRef(null);
  const [content, setContent] = useState(null);

  const handleInitialize = useCallback((instance) => {
    editorCore.current = instance;
  }, []);

  const handleSave = useCallback(async () => {
    if (editorCore.current) {
      const savedData = await editorCore.current.save();
      setContent(savedData); // Store the data in the state
      console.log("Editor content:", savedData);

      // Send data to backend
      axios
        .post("http://localhost:3001/save", { data: savedData })
        .then(() => alert("Data saved successfully!"))
        .catch((error) => console.error("Error saving content:", error));
    }
  }, []);

  return (
    <div className="editor-container">
      <h1 className="editor-title">Text Editor with Backend</h1>
      <ReactEditorJS onInitialize={handleInitialize} tools={EDITOR_JS_TOOLS} />
      <button className="save-button" onClick={handleSave}>
        Save to Backend
      </button>

      {content && (
        <div className="saved-content">
          <h2>Saved Content:</h2>
          <pre>{JSON.stringify(content, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default TextEditor;
