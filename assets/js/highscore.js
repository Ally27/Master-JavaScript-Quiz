var highscoreList = document.getElementById("highscoreList");

var clearHistoryEl = document.getElementById("clearHistory");
var storedHighscores =
  JSON.parse(localStorage.getItem("storedHighscores")) || [];
console.log(storedHighscores);

//stores objects
storedHighscores.sort(function (a, b) {
  var answerA = a.answerScore;
  var timeA = a.timeScore;
  var answerB = b.answerScore;
  var timeB = b.timeScore;

  return answerA < answerB
    ? 1
    : answerA > answerB
    ? -1
    : answerA === answerB
    ? timeA < timeB
      ? 1
      : timeA > timeB
      ? -1
      : 0
    : null;
});
