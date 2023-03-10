// import all questions from questions module
import questionsAllArr from "./questions.js";

//---------------------------------------- Variable Declarations ----------------------------------------//
// DOM elements
const startScreenEl = document.getElementById("start-screen");
const startBtnEl = document.getElementById("start");
const timeSpanEl = document.getElementById("time");
const questionBlockEl = document.getElementById("questions");
const questionTitleEl = document.getElementById("question-title");
const questionOptionsEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");
const endScreenEl = document.getElementById("end-screen");
const finalScoreEl = document.getElementById("final-score");
const initialInputEl = document.getElementById("initials");
const submitBtnEl = document.getElementById("submit");

// local variables
const quizLocalStorageKey = "codeQuiz"; // key for the local storage
const wrongAnswerTimePenalty = 15; // amount of time deducted from remaining time when wrong answer is given
let quizInterval = null; // time internal for count down and clear it when it's needed
let quizDurationInSec = 75; // total time for this quiz in second
let questionsShownArr = []; // questions that are shown by user
let currentQuestion = null; // the question that is currently shown to the user
let numOfCorrectAnswer = 0; // the number of question that user answers correctly
let score = 0; // score for the user after the quiz is finished

//---------------------------------------- Event Listeners ----------------------------------------//
startBtnEl.addEventListener("click", startTheQuiz);
initialInputEl.addEventListener("focus", clearAnswerResult);
submitBtnEl.addEventListener("click", submitInitals);

//------------------------------------------- Functions ------------------------------------------//
// clear quiz introduction
function updateLayoutOnStart() {
  startScreenEl.classList.add("hide");
  questionBlockEl.classList.remove("hide");
}

// called after answering all questions or time is up
function endQuiz() {
  // clear interval to stop the timer
  clearInterval(quizInterval);

  // get total number of questions by adding questions that are answered and questions that aren't answered
  const totalNumOfQuestions = questionsAllArr.length + questionsShownArr.length;
  // calculate percentage of correct answer as score
  score = Math.floor((numOfCorrectAnswer / totalNumOfQuestions) * 100);
  // set final score to DOM element
  finalScoreEl.textContent = score;

  // hide questions div
  questionBlockEl.classList.add("hide");
  // show
  endScreenEl.classList.remove("hide");
}

// start the countdown timer
function startTimer() {
  // initilase the duration for the quiz
  // let timeLeft = quizDurationInSec;
  // update text for the countdown in the DOM
  timeSpanEl.textContent = quizDurationInSec;

  quizInterval = setInterval(function () {
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

// store score in local storage
function storeScore() {
  let isStored = false;

  if (initialInputEl.value.trim().length > 0) {
    // get storage for this application
    let storageObj = window.localStorage.getItem(quizLocalStorageKey);
    // create a new object if it doesn't exist, otherwise, transform it to an object
    storageObj =
      storageObj === null ? { scoreBoard: [] } : JSON.parse(storageObj);
    // add user score in scoreBoard array
    storageObj.scoreBoard.push({
      name: initialInputEl.value,
      score,
      date: new Date()
    });

    // update storage
    window.localStorage.setItem(
      quizLocalStorageKey,
      JSON.stringify(storageObj)
    );
    isStored = true;
    // clear initials after storing it in local storage
    initialInputEl.value = "";
  } else {
    // ask user to provide initial if input field is empty after trimmming
    window.alert("Please Enter initials.");
  }

  return isStored;
}

// navigate to a page
function navigate(url) {
  window.location.href = url;
}

// handle initial submission
function submitInitals() {
  // if the score is stored, navigate user to highscores page
  if (storeScore()) navigate("highscores.html");
}

// show question to the user
function showQuestionToUser() {
  // remove all question and its options from the last one
  questionTitleEl.textContent = "";
  questionOptionsEl.innerHTML = "";

  // show question to user if there's remaning.
  if (questionsAllArr.length > 0) {
    // select a question randomly
    const randomQuestionIndex = getRandomNumber(questionsAllArr.length);
    const randomQuestion = questionsAllArr[randomQuestionIndex];
    questionsShownArr.push(randomQuestion);
    // remove selected question so that it wouldn't be shown up again
    questionsAllArr.splice(randomQuestionIndex, 1);
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
    // append options to the other list
    optionsRandomArr.forEach((option) => {
      const optionLiEl = document.createElement("li");
      optionLiEl.classList.add("option");
      optionLiEl.textContent = option;
      optionLiEl.dataset.option = option;
      // add click event listener to each option
      optionLiEl.addEventListener("click", onOptionClick);
      optionsOrderListEl.appendChild(optionLiEl);
    });
    // append options to choice element in DOM
    questionOptionsEl.appendChild(optionsOrderListEl);
    // store the question that the user needs to answser
    currentQuestion = JSON.parse(JSON.stringify(randomQuestion));
  }
}

// start the quiz
function startTheQuiz() {
  updateLayoutOnStart();
  startTimer();
  showQuestionToUser();
}

// get a random number below a given number
function getRandomNumber(maxNum) {
  return Math.floor(Math.random() * maxNum);
}

// clear an answer result in DOM
function clearAnswerResult() {
  feedbackEl.textContent = "";
  feedbackEl.classList.add("hide");
}

// play audio regarding to the right or wrong answer
function playAudio(isCorrect) {
  const audio = new Audio(
    `./assets/sfx/${isCorrect ? "correct.wav" : "incorrect.wav"}`
  );
  audio.play();
}

// check answer and show the result
function onOptionClick(event) {
  // hide previous result
  clearAnswerResult();
  // get option from li dataset
  const selectedOption = event.target.dataset.option;
  // check if the user gives the correct answer
  const isCorrect = currentQuestion.answer === selectedOption;

  if (!isCorrect) {
    // deduct time as penalty if wrong answer is given
    quizDurationInSec -= wrongAnswerTimePenalty;
  } else {
    // increment the number of question that user gives correct answer
    numOfCorrectAnswer += 1;
  }

  // play audio depending on whether the answer is correct or not
  playAudio(isCorrect);

  // show message to say if answer is right or not
  feedbackEl.textContent = isCorrect ? "Correct!" : "Wrong!";
  feedbackEl.classList.remove("hide");

  // show new question to the user if there's any, otherwise, end the quiz
  if (questionsAllArr.length > 0) {
    showQuestionToUser();
  } else {
    endQuiz();
  }
}
