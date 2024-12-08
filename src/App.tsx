import { ChangeEvent, useState } from "react";
import "./App.css";

function App() {
  const [color, setColor] = useState<string>("");

  async function onClick() {
    const [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript<string[], void>({
      target: { tabId: tab.id as number },
      args: [color],
      func: (color) => {
        document.body.style.backgroundColor = color;
      },
    });
  }

  return (
    <div className="app-container">
      <header className="header">
        <h1>Theme Setter</h1>
      </header>
      <main>
        <div className="color-picker">
          <label htmlFor="colorInput">Choose Background Color:</label>
          <input
            type="color"
            id="colorInput"
            value={color}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setColor(e.target.value);
            }}
            aria-label="Background Color Picker"
          />

        </div>
        {color && (
          <div
            className="color-preview"
            style={{
              backgroundColor: color,
              width: "50px",
              height: "50px",
              border: "1px solid #000",
            }}
          />
        )}
        <div className="card">
          <button onClick={onClick} disabled={!color} className="change-button">
            Apply Background Color
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
