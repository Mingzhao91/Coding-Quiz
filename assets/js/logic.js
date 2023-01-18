import questionsArr from "./questions.js";

//--------------- Variable Declarations -----------------------//
// DOM elements
const startScreenEl = document.getElementById("start-screen");
const startBtnEl = document.getElementById("start");
const timeSpanEl = document.getElementById("time");
const questionBlockEl = document.getElementById("questions");
const questionTitleEl = document.getElementById("question-title");
const questionOptionsEl = document.getElementById("choices");

// local variables
const quizDurationInSec = 75;
let questionsSelectedArr = []; // store questions that are shown by user

//---------------Event Listeners -----------------------//
startBtnEl.addEventListener("click", startTheQuiz);

function startTheQuiz() {
  updateLayoutOnStart();
  startTimer();
  showQuestionToUser();
}

//---------------Functions -----------------------//
function updateLayoutOnStart() {
  startScreenEl.classList.add("hide");
  questionBlockEl.classList.remove("hide");
}

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
function showQuestionToUser() {
  // select a question randomly
  const randomQuestionIndex = getRandomNumber(questionsArr.length);
  const randomQuestion = questionsArr[randomQuestionIndex];
  questionsSelectedArr.push(randomQuestion);
  // remove selected question so that it wouldn't be shown up again
  questionsArr.splice(randomQuestionIndex, 1);
  // console.log("questionsArr: ", questionsArr);
  // console.log("questionsSelectedArr: ", questionsSelectedArr);
  // console.log("randomQuestion: ", randomQuestion);

  // put question in h2 tag
  questionTitleEl.textContent = randomQuestion.question;

  // build options in order list
  const optionsOrderListEl = document.createElement("ol");
  // make a copy of options
  let optionsList = JSON.parse(JSON.stringify(randomQuestion.options));
  let optionsRandomArr = [];

  // add questions in different order for each quiz
  while (optionsRandomArr.length !== randomQuestion.options.length) {
    const randomOptionIndex = getRandomNumber(optionsList.length);
    const randomOption = optionsList[randomOptionIndex];
    optionsRandomArr.push(randomOption);
    optionsList.splice(randomOptionIndex, 1);
  }

  // console.log("randomQuestion: ", randomQuestion);
  // console.log("optionsRandomArr: ", optionsRandomArr);

  // append options to the other list
  optionsRandomArr.forEach((option) => {
    const optionLiEl = document.createElement("li");
    optionLiEl.classList.add("option");
    optionLiEl.textContent = option;
    optionLiEl.dataset.option = option;
    optionsOrderListEl.appendChild(optionLiEl);
  });

  // console.log("questionTitleEl: ", questionTitleEl);
  // console.log("optionsOrderListEl: ", optionsOrderListEl);

  // append options to choice element in DOM
  questionOptionsEl.appendChild(optionsOrderListEl);
}

function getRandomNumber(maxNum) {
  return Math.floor(Math.random() * maxNum);
}
