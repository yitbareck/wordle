import { useState } from "react";
import "./App.css";
import Board from "./components/board";

function App() {
  const [wordLength, setWordLength] = useState(5);
  return (
    <div className="App">
      <div>
        <p className="head-text">Set Word Length</p>
        <input
          className="wordLengthInput"
          type="number"
          value={wordLength}
          min="3"
          max="10"
          onChange={(e) => {
            setWordLength(parseInt(e.target.value));
            e.target.blur();
          }}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        />
      </div>
      <Board wordLength={wordLength} />
    </div>
  );
}

export default App;
