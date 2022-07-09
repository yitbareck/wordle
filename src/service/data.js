const words = [
  "world",
  "slice",
  "splice",
  "find",
  "map",
  "reduce",
  "filter",
  "select",
  "match",
  "sort",
  "script",
  "red",
  "blue",
  "green",
  "city",
  "united",
  "pop",
  "push",
  "reject",
  "resolve",
  "redirect",
  "spread",
  "withdraw",
  "deposit",
  "fragment",
  "suspence",
  "transition",
  "perfect",
  "perfection",
  "algorithm",
  "structure",
  "database",
  "queue",
  "stack",
  "hash",
  "tree",
  "graph",
  "program",
  "dynamic",
];

const getRandomWord = (len) => {
  return new Promise((resolve, reject) => {
    if (len < 3 || len > 10)
      reject(new Error("Word length must be between 3 and 10 inclusive"));
    const filteredWords = words.filter((word) => word.length === len);
    if (!filteredWords) reject(new Error("No word found"));
    resolve(filteredWords[Math.floor(Math.random() * filteredWords.length)]);
  });
};
const data = { getRandomWord };
export default data;
