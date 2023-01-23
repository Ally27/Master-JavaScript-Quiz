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
//storing user list
for (var i = 0; i < storedHighscores.length; i++) {
  var li = document.createElement("li");
  li.textContent = `${i + 1}. ${storedHighscores[i].initals} --- ${
    storedHighscores[i].answerScore
  } Correct --- ${storedHighscores[i].timeScore} Seconds remaining`;
  highscoreList.append(li);
}
//deleting score history
clearHistoryEl.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
