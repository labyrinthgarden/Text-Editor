import { useState } from "react";
import { open,BaseDirectory,writeTextFile } from "@tauri-apps/plugin-fs";
import Titlebar from "./components/Titlebar";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [fontColor, setFontColor] = useState("#FFFFFF");
  const [editorFontColor, setEditorFontColor] = useState("#FFFFFF");
  const [bgColor, setBgColor] = useState("rgba(0,0,0,0.1)");
  const [editorBgColor, setEditorBgColor] = useState("rgba(0,0,0,0.5)");

  const filePath = "main.c";

  const handleSave = async () => {
    try {
      await writeTextFile(filePath, text );
    } catch (error) {
      alert(`Failed to save file:${error}`);
    }
  };

  const updateCSSVariable = (variable: string, value: string) => {
    document.documentElement.style.setProperty(variable, value);
  };

  function hexToRgba(hex: string, alpha: number): string {
    hex = hex.replace(/^#/, "");
    let r = 0,
      g = 0,
      b = 0;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else if (hex.length === 6) {
      r = parseInt(hex.slice(0, 2), 16);
      g = parseInt(hex.slice(2, 4), 16);
      b = parseInt(hex.slice(4, 6), 16);
    }
    return `rgba(${r},${g},${b},${alpha})`;
  }

  const handleFontColorChange = (color: string) => {
    setFontColor(color);
    updateCSSVariable("--font-color", color);
  };
  const handleEditorFontColorChange = (color: string) => {
    setEditorFontColor(color);
    updateCSSVariable("--editor-font-color", color);
  };
  const handleBgColorChange = (color: string) => {
    const rgba = hexToRgba(color, 0.2);
    setBgColor(rgba);
    updateCSSVariable("--bg-color", rgba);
  };
  const handleEditorBgColorChange = (color: string) => {
    const rgba = hexToRgba(color, 0.5);
    setEditorBgColor(rgba);
    updateCSSVariable("--editor-background-color", rgba);
  };

  return (
    <div className="app-container">
      <Titlebar title="Basic Text Editor" />
      <div className="main-container">
        <Navbar
          onFontColorChange={handleFontColorChange}
          onEditorFontColorChange={handleEditorFontColorChange}
          onBgColorChange={handleBgColorChange}
          onEditorBgColorChange={handleEditorBgColorChange}
        />
        <div className="filename">
          <h1>{filePath}</h1>
        </div>
        <div className="editor-wrapper">
          <textarea
            className="typingarea"
            spellCheck="false"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={async (e) => {
              if (e.key === "Tab") {
                e.preventDefault();
                const textarea = e.target as HTMLTextAreaElement;
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                const newValue =
                  text.substring(0, start) + "  " + text.substring(end);
                setText(newValue);
                setTimeout(() => {
                  textarea.selectionStart = textarea.selectionEnd = start + 2;
                }, 0);
              }
              // Ctrl+S or Cmd+S
              if ((e.ctrlKey || e.metaKey) && e.key === "s") {
                e.preventDefault();
                await handleSave();
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
