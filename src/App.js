import { useState } from "react";

import Board from "./components/board";
import Key from "./components/key";

import "./App.css";

function App() {
  const [wordLength, setWordLength] = useState(5);
  return (
    <div className="App">
      <div className="instructions">
        <p className="instructionsHeading">Game Instructions</p>
        <hr />
        <ul>
          <li>Set word length</li>
          <li>Guess a word of the specified length</li>
          <li>Start typing</li>
          <li>
            Press <strong>Backspace</strong> to clear
          </li>
          <li>
            Press <strong>Enter</strong> when done typing
          </li>
          <li>
            Click <strong>Restart</strong> to restart again
          </li>
        </ul>
      </div>
      <div className="gameField">
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

        <Board wordLength={wordLength} />
      </div>
      <div>
        <div className="keyHeading">
          <p>Key</p>
          <hr />
        </div>
        <Key color="mediumseagreen" desc="Letter in correct spot" />
        <Key color="gold" desc="Letter in wrong spot" />
        <Key color="tomato" desc="Letter not in the hidden word" />
      </div>
    </div>
  );
}

export default App;
