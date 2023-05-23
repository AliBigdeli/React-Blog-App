import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "highlight.js/styles/default.css";
import hljs from "highlight.js";

// Define a custom syntax highlighting function using highlight.js
const highlightSyntax = (text) => {
  const highlighted = hljs.highlightAuto(text);
  return highlighted.value;
};

const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video", "code-block", "clean", "blockquote"],
  ],
  clipboard: {
    matchVisual: false,
  },
  syntax: { highlight: (text) => highlightSyntax(text) },
  //   resize: {
  //     // Default height of the editor
  //     height: "500px",
  //     // Enable resizing of the editor
  //     enabled: true,
  //     // Specify the minimum and maximum height of the editor
  //     min_height: "200px",
  //     max_height: "800px",
  //   },
  //   // Enable fullscreen mode
  //   fullscreen: {
  //     enabled: true,
  //     // Specify the button label
  //     buttonLabel: "Fullscreen",
  //     // Specify the custom exit fullscreen method
  //     exitHandler: () => {
  //       document.exitFullscreen();
  //     },
  //   },
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
  "code-block",
];
const TextEditor = ({ name, value, onChange }) => {
  const [editorValue, setEditorValue] = useState(value);

  useEffect(() => {
    setEditorValue(value);
  }, [value]);

  const handleEditorChange = (content, delta, source, editor) => {
    setEditorValue(content);
    onChange(name, content);
  };
  return (
    <ReactQuill
      id={name}
      name={name}
      value={editorValue}
      onChange={handleEditorChange}
      theme="snow"
      formats={formats}
      modules={modules}
      placeholder="Type something..."
    />
  );
};

export default TextEditor;
