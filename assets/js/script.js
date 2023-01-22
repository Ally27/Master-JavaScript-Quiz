var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn");
var questionContainerEl = document.getElementById("question-container");
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-btn");
var timerEl = document.getElementById("timerValue");
var mainMenuEl = document.getElementById("main-Menu");

var timeLeft;
var timerInterval;
let shuffledQuestions, currentQuestionIndex;

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
  var selectedButton = event.target;
  var correct = selectedButton.dataset.correct;
  setStatusClass(document.body, correct);
  Array.from(answerButtonsEl.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct);
  });

  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide");
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

function wrongTimer() {}

function endGame() {
  clearInterval(timerInterval);
  if (timeLeft < 0) {
    timeLeft = 0;
  }
  updateTimerValue();
}
