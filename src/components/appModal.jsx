import React from "react";
import Modal from "react-modal";

import "../App.css";

Modal.setAppElement("#root");

export default function AppModal({ isOpen, onClose, type, hiddenWord }) {
  return (
    <div style={{ borderRadius: "25%" }}>
      <Modal
        isOpen={isOpen}
        onRequestClose={onClose}
        style={{
          content: {
            width: "400px",
            height: "250px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "rgba(100%, 100%, 100%, 0.8)",
          },
        }}
      >
        <p className={type === 1 ? "win" : "lose"}>
          {type === 1
            ? "Conrats! You won the game."
            : "Sorry! You Lost the game."}
        </p>
        {hiddenWord ? (
          <>
            <p className="hiddenWordDescription">The hidden word is</p>
            <div className="hiddenWord">{hiddenWord}</div>
          </>
        ) : null}
        <button
          className="btn btn-close"
          onClick={onClose}
          style={{ cursor: "pointer" }}
        >
          Close
        </button>
      </Modal>
    </div>
  );
}
