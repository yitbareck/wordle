import React from "react";

import "../App.css";

export default function Key({ color, desc }) {
  return (
    <div class="key">
      <div
        className="keySymbol"
        style={{
          backgroundColor: color,
        }}
      ></div>
      <p>{desc}</p>
    </div>
  );
}
