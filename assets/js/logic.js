import questionsArr from "./questions.js";

//--------------- Variable Declarations -----------------------//
// DOM elements
const startBtnEl = document.getElementById("start");
const timeSpanEl = document.getElementById("time");
// local variables
const quizDurationInSec = 5;

//---------------Event Listeners -----------------------//
startBtnEl.addEventListener("click", startTheQuiz);

function startTheQuiz() {
  startTimer();
}

//---------------Functions -----------------------//
// start the countdown timer
function startTimer() {
  // initilase the duration for the quiz
  let timeLeft = quizDurationInSec;
  // update text for the countdown in the DOM
  timeSpanEl.textContent = quizDurationInSec;

  const quizInterval = setInterval(function () {
    if (timeLeft > 0) {
      // decrement the coutdown and show to the user
      timeLeft--;
      timeSpanEl.textContent = timeLeft;
    } else {
      // clear the interval and navigate to the score page
      clearInterval(quizInterval);
      window.location.href = "highscores.html";
    }
  }, 1000);
}

// show question to the user
function showQuestionToUser() {}
