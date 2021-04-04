
//get scores from localstorage or set to empty array
var data = JSON.parse(window.localStorage.getItem("highscore")) || [];

// sort highscores by score property from highest to lowerst.
data.sort(function(a, b) {
  return b.score - a.score;
});

data.forEach(element => {
    var tableEl = document.createElement("tr");
    var td1 = document.createElement("td");
    td1.textContent = element.initials;
    var td2 = document.createElement("td");
    td2.textContent = element.score;

    tableEl.appendChild(td1);
    tableEl.appendChild(td2);

    document.getElementById("highscorestable").appendChild(tableEl);
});

function clearHighscores() {
  window.localStorage.removeItem("highscore");
  window.location.reload();
}

document.getElementById("clear-btn").onclick = clearHighscores;

