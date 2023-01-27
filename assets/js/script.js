//start and next buttons
var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");

//End of quiz
var finishedScoreEl = document.getElementById("finished-score");
var correctScoreSpan = document.querySelector("#answeredCorrectScore");
var initalsFormEl = document.querySelector("#initalsHere");
var initalsEl = document.querySelector("#initials");
var correctScoreSpan = document.querySelector("#answeredCorrectScore");
//questions & answers
var correctAnswersEl = document.getElementById("correctAnswers");
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-btn");

//timer
var timerEl = document.getElementById("timerValue");
var mainMenuEl = document.getElementById("main-Menu");
var selectedButton = document.getElementById("selectedButton");
// score list
var initalsEl = document.getElementById("initals");
var initialsHereEl = document.getElementById("initials-here");

//empty variables
var timeLeft = 40;
var timerInterval;
var incorrectAnswer;
var correctAnswers;

let shuffledQuestions, currentQuestionIndex;
//event listener for start/next
startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  mainMenuEl.classList.add("hide");
  startButton.classList.add("hide");
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  timeLeft = 10 * questions.length;
  questionContainerEl.classList.remove("hide");
  startTimer();
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(questions) {
  questionEl.innerText = questions.question;
  questions.answers.forEach((answer) => {
    var button = document.createElement("button");
    button.innerText = answer;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsEl.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add("hide");
  while (answerButtonsEl.firstChild) {
    answerButtonsEl.removeChild(answerButtonsEl.firstChild);
  }
}

function selectAnswer(event) {
  var selectedButton = event.target.innerText;
  console.log("target:", selectedButton);
  console.log("this: ", questions[currentQuestionIndex].correct);
  //   setStatusClass(document.body, correct);
  Array.from(answerButtonsEl.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    console.log("", shuffledQuestions.length > currentQuestionIndex + 1);
    nextButton.classList.remove("hide");
  } else {
    incorrectAnswer();
    console.log(incorrectAnswer);
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
  }
}

function correctAnswers() {
  correctAnswers++;
  correctAnswers.textContent = correctAnswers;
}

function wrongAnswer() {
  timeLeft -= 10;
  updateTimerValue();
  wrongEl.classList.remove("hidden");
}

function checkAnswer(event) {
  if (event.target.type === "submit") {
    clearTimeout(correctWrongTimeout);
    hideCorrectWrong();

    var answer = event.target.getAttribute("data-answer");

    answer === questions[index].correct ? correctAnswer() : wrongAnswer();

    nextQuestion();
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}

function updateTimerValue() {
  timerEl.textContent = timeLeft;
}

function startTimer() {
  timerInterval = setInterval(function () {
    timeLeft -= 1;
    updateTimerValue();
    if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
      endGame();
    }
  }, 1000);
}

function incorrectAnswer() {
  timeLeft -= 10;
  console.log("timeLeft -= 10;");
  updateTimerValue();
}

function endGame() {
  clearInterval(timerInterval);
  if (timeLeft < 0) {
    timeLeft = 0;
  }
  updateTimerValue();
}

function saveScore(event) {
  event.preventDefault();
  var scoreData = {
    initals: initalsEl.value,
    answerScore: correctAnswers,
    timeScore: timeLeft,
  };

  var storedHighscores =
    JSON.parse(localStorage.getItem("storedHighscores")) || [];

  storedHighscores.push(scoreData);

  localStorage.setItem("storedHighscores", JSON.stringify(storedHighscores));
  questionContainerEl.addEventListener("click", checkAnswer);
  initalsEl.addEventListener("submit", saveScore);
}
