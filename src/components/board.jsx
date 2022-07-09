import React, { useEffect, useRef, useState } from "react";
import data from "../service/data";
import AppModal from "./appModal";

import Row from "./row";

export default function Board({ wordLength = 5 }) {
  const [guessedWords, setGuessedWords] = useState(() => {
    return Array(6)
      .fill(null)
      .map(() => ({
        checkMode: false,
        content: "",
      }));
  });
  const [guessedWord, setGuessedWord] = useState("");
  const [hiddenWord, setHiddenWord] = useState("");
  const [index, setIndex] = useState(0);
  const [gameStatus, setGameStatus] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const btnRef = useRef();

  useEffect(() => {
    handleRestart();
  }, [wordLength]);
  useEffect(() => {
    if (gameStatus !== 0) return;
    const onKeyDown = (e) => {
      const char = e.key;
      if (
        guessedWord.length === hiddenWord.length &&
        char !== "Enter" &&
        char !== "Backspace"
      ) {
        //extra letter pressed
        return;
      }
      if (char === "Enter") {
        //if user presses 'Enter'
        if (guessedWord.length < hiddenWord.length) {
          //unfinished guess
          return;
        }
        setGuessedWords((prevGusses) => {
          const guesses = [...prevGusses];
          guesses[index].checkMode = true;
          return guesses;
        });

        if (guessedWord === hiddenWord) {
          setGameStatus(1);
          setShowModal(true);
        } else if (index === 5 && guessedWord !== hiddenWord) {
          setGameStatus(2);
          setShowModal(true);
        } else {
          setGuessedWord(""); //reset the guess word
          setIndex(index + 1); //increment current index by 1
        }
        return;
      }
      if (char === "Backspace") {
        //if user presses 'Backspace'
        const modifiedGuessedWord = guessedWord.slice(0, -1); //remove the last leter from the guessed word
        setGuessedWord(modifiedGuessedWord);
        setGuessedWords((prevGusses) => {
          const guesses = [...prevGusses];
          guesses[index].content = modifiedGuessedWord;
          return guesses;
        });
        return;
      }
      if (!char.match(/^[a-z]$/i)) return; //return if key is not a letter
      const newGuess = guessedWord + char; //append the pressed letter to the guessed word
      setGuessedWord(newGuess);
      setGuessedWords((prevGusses) => {
        const guesses = [...prevGusses];
        guesses[index].content = newGuess;
        return guesses;
      });
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [index, guessedWord, hiddenWord, gameStatus]);

  //restart game
  const handleRestart = () => {
    setIndex(0);
    setGuessedWords((prev) => {
      return prev.map((word) => {
        word.checkMode = false;
        word.content = "";
        return word;
      });
    });
    setGuessedWord("");
    setGameStatus(0);
    data.getRandomWord(wordLength).then((word) => {
      setHiddenWord(word);
    });
    btnRef.current.blur();
  };

  return (
    <div>
      {guessedWords.map((guessedWord, i) => (
        <Row key={i} hiddenWord={hiddenWord} guessedWord={guessedWord} />
      ))}
      <button ref={btnRef} className="btn" onClick={handleRestart}>
        Restart
      </button>
      <AppModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
        }}
        type={gameStatus}
        hiddenWord={gameStatus === 2 ? hiddenWord : null}
      />
    </div>
  );
}
