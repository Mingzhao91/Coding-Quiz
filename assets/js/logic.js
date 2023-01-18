import questionsArr from "./questions.js";

//--------------- Variable Declarations -----------------------//
// DOM elements
const startScreenEl = document.getElementById("start-screen");
const startBtnEl = document.getElementById("start");
const timeSpanEl = document.getElementById("time");
const questionBlockEl = document.getElementById("questions");
const questionTitleEl = document.getElementById("question-title");
const questionOptionsEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");

// local variables
const wrongAnswerTimePenalty = 15;
let quizDurationInSec = 75;
let questionsSelectedArr = []; // store questions that are shown by user
let currentQuestion = null; // store the question that is currently shown to the user

//---------------Event Listeners -----------------------//
startBtnEl.addEventListener("click", startTheQuiz);

//---------------Functions -----------------------//
// start the quiz
function startTheQuiz() {
  updateLayoutOnStart();
  startTimer();
  showQuestionToUser();
}

function updateLayoutOnStart() {
  startScreenEl.classList.add("hide");
  questionBlockEl.classList.remove("hide");
}

// start the countdown timer
function startTimer() {
  // initilase the duration for the quiz
  // let timeLeft = quizDurationInSec;
  // update text for the countdown in the DOM
  timeSpanEl.textContent = quizDurationInSec;

  const quizInterval = setInterval(function () {
    if (quizDurationInSec > 0) {
      // decrement the coutdown and show to the user
      quizDurationInSec--;
      timeSpanEl.textContent = quizDurationInSec;
    } else {
      // clear the interval and navigate to the score page
      clearInterval(quizInterval);
      endQuiz();
    }
  }, 1000);
}

// clear an answer result in DOM
function clearAnswerResult() {
  feedbackEl.textContent = "";
  feedbackEl.classList.add("hide");
}

// check answer and show the result
function onOptionClick(event) {
  // hide previous result
  clearAnswerResult();
  // get option from li dataset
  const selectedOption = event.target.dataset.option;
  // console.log("selectedOption: ", selectedOption);

  // check if the user gives the correct answer
  const isCorrect = currentQuestion.answer === selectedOption;
  // console.log("isCorrect: ", isCorrect);

  // deduct time as penalty if wrong answer is given
  if (!isCorrect) {
    quizDurationInSec -= wrongAnswerTimePenalty;
  }

  // show message to say if answer is right or not
  feedbackEl.textContent = isCorrect ? "Correct!" : "Wrong!";
  feedbackEl.classList.remove("hide");

  // show new question to the user if there's any, otherwise, end the quiz
  if (questionsArr.length > 0) {
    showQuestionToUser();
  } else {
    endQuiz();
  }
}

// show question to the user
function showQuestionToUser() {
  // remove all question and its options from the last one
  questionTitleEl.textContent = "";
  questionOptionsEl.innerHTML = "";

  // show question to user if there's remaning.
  if (questionsArr.length > 0) {
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
      optionLiEl.addEventListener("click", onOptionClick);
      optionsOrderListEl.appendChild(optionLiEl);
    });

    // console.log("questionTitleEl: ", questionTitleEl);
    // console.log("optionsOrderListEl: ", optionsOrderListEl);

    // append options to choice element in DOM
    questionOptionsEl.appendChild(optionsOrderListEl);
    // store the question that the user needs to answser
    currentQuestion = JSON.parse(JSON.stringify(randomQuestion));
  }
}

function endQuiz() {
  window.location.href = "highscores.html";
}

function getRandomNumber(maxNum) {
  return Math.floor(Math.random() * maxNum);
}
