//--------------- Variable Declarations -----------------------//
// DOM elements
const highscoresOrderListEl = document.getElementById("highscores");
const clearBtnEl = document.getElementById("clear");

// local variables
const quizLocalStorageKey = "codeQuiz"; // key for the local storage

//------------------------------------------------ Event Listeners ----------------------------------------------//
clearBtnEl.addEventListener("click", clearHighScores);

//-------------------------------------------------- Functions --------------------------------------------------//
// sort by score in descending order. if scores are equal, sort by name alphabetically
function sortScoreBoardDesc(item1, item2) {
  if (item2.score !== item1.score) {
    return item2.score - item1.score;
  } else {
    return item1.name.localeCompare(item2.name);
  }
}

// clear local storage for this application
function clearHighScores() {
  // clear storage
  window.localStorage.clear("quizLocalStorageKey");
  // clear order list
  highscoresOrderListEl.innerHTML = "";
}

// show scores in the DOM
function showScores() {
  // get data stored in local storage
  // get storage for this application
  let storageObj = window.localStorage.getItem(quizLocalStorageKey);
  // create a new object if it doesn't exist, otherwise, transform it to an object
  storageObj =
    storageObj === null ? { scoreBoard: [] } : JSON.parse(storageObj);

  if (
    storageObj.scoreBoard &&
    Array.isArray(storageObj.scoreBoard) &&
    storageObj.scoreBoard.length > 0
  ) {
    // sort array by score in descending order, if scores are equal, sort by name alphabetically
    storageObj.scoreBoard.sort(sortScoreBoardDesc);
    // insert each item(user name and score) into order list
    storageObj.scoreBoard.forEach((item) => {
      const liEl = document.createElement("li");
      liEl.textContent = `${item.name} - ${item.score}`;
      highscoresOrderListEl.appendChild(liEl);
    });
  }
}

//------------------------------------------- Run Functions When The Page Is Loaded ------------------------------//
showScores();
