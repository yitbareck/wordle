import React from "react";

import "../App.css";

function getLetterFrequency(word) {
  //create and return letter frequency map for the word
  const wordMap = {};
  for (let ch of word) wordMap[ch] = wordMap[ch] ? wordMap[ch] + 1 : 1;
  return wordMap;
}
function getCheckedCells(guessedWord, hiddenWord, wordLength) {
  //generate and return checked (i.e. marked) cells
  const cells = [];
  const spotOnGuesses = Array(wordLength).fill(0);
  const hiddenWordMap = getLetterFrequency(hiddenWord);

  //mark correct guesses
  for (let i = 0; i < wordLength; i++) {
    if (hiddenWord[i] === guessedWord[i]) {
      spotOnGuesses[i] = 1;
      hiddenWordMap[hiddenWord[i]]--;
    }
  }

  //generate cells
  for (let i = 0; i < wordLength; i++) {
    const letter = guessedWord[i];
    let classname = "cell";
    if (spotOnGuesses[i]) {
      classname += " letterInCorrectPosition";
    } else if (hiddenWordMap[letter]) {
      classname += " letterPresent";
      hiddenWordMap[letter]--;
    } else classname += " letterNotPresent";

    cells.push(
      <div key={i} className={classname}>
        {letter}
      </div>
    );
  }
  return cells;
}
function getUncheckedCells(guessedWord, wordLength) {
  //generate and return unchecked (i.e. unmarked) cells
  const cells = [];
  for (let i = 0; i < wordLength; i++) {
    const letter = guessedWord[i];
    let classname = "cell";
    if (letter) {
      classname += " notEmptyCell";
    } else {
      classname += " emptyCell";
    }
    cells.push(
      <div key={i} className={classname}>
        {letter}
      </div>
    );
  }
  return cells;
}
export default function Row({ guessedWord, hiddenWord, wordLength }) {
  let cells = [];
  guessedWord.content = guessedWord.content.toLowerCase();
  hiddenWord = hiddenWord.toLowerCase();
  if (guessedWord.checkMode) {
    cells = getCheckedCells(guessedWord.content, hiddenWord, wordLength);
  } else {
    cells = getUncheckedCells(guessedWord.content, wordLength);
  }
  return <div className="cellContainer">{cells}</div>;
}
