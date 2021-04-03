//variables from the DOM
var startMenuEl = document.querySelector("#homepage");
var questionArrayEl = document.querySelector("#question-array");
var questionsEl = document.getElementById("questions");
var choicesEl = document.querySelector("#choices");
var startButton = document.getElementById("start-button");
var timerEl = document.getElementById("timer");

//variables that keep track of the quiz as is active.
var timerLeft = 75;
var timerInterval;
var quizIndex = 0;
var hasQuizStarted = false;
var question = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["Strings", "Booleans", "Alerts", "Numbers"],
      answer: "Alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within ____.",
      choices: ["Quotes", "Curly brackets", "Parentheses", "Square brackets"],
      answer: "Parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store ____.",
      choices: ["Numbers and strings", "Other arrays", "Booleans", "All of the above"],
      answer: "All of the above"
    },
    {
      title: "String values must be enclosed within ____ when being assigned to variables.",
      choices: ["Commas", "Curly brackets", "Quotes", "Parentheses"],
      answer: "Quotes"
    },
    {
      title: "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "Terminal / Bash", "For loops", "Console.log"],
      answer: "Console.log"
    }
  ];

  //variables for end of the game

var highScoreDisplay = document.querySelector("#highscore-display");
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
var submitButton = document.querySelector("#submit-initials");

var hasQuizEnded = false;
var quizOverEl = document.querySelector("#quiz-over");
var initials = '';
var score = 0;
var highscoreDisplay = JSON.parse(localStorage.getItem("highscore")) || [];


//when clicking the button the following function need to be executed to start the quiz, timer, and questions

startButton.addEventListener("click", function() {
    startTime();
    startQuiz();
    startQuestion();
})
//start timer and show how much time is left before timer runs out and officially ending the quiz. 
function startTime() {
    timerInterval = setInterval(function() {
        if (timerLeft <= 0) {
            clearInterval(timerInterval);
            quizEnd();
        }
        timerLeft--;
        timerEl.textContent = "Timer: " + timerLeft;
    }, 1000)
}  
// hide homepage instruction and start button and show the questions area
function startQuiz() {
    hasQuizStarted = true;
    startMenuEl.setAttribute("class", "hidden");
    questionArrayEl.setAttribute("class", "visible");
    startQuestion();
}
//updating title with current questions from array and then clearing out any old choices from prior questions.
function startQuestion() {
    feedbackEl.textContent='';
    questionsEl.textContent = question[quizIndex].title;
    choicesEl.innerHTML = '';
    //looping each question, creating a button and adding a click event listener for each choice and display on page.
    for (var i = 0; i < question[quizIndex].choices.length; i++) {
        var button = document.createElement("button");
        button.textContent = question[quizIndex].choices[i];
        button.setAttribute("class", "choices-button")
        button.onclick = checkAnswer;
        choicesEl.append(button)
    }
}

function checkAnswer () {

    // check if user guessed wrong
    if (this.value !== question[quizIndex].answer) {
      // subtract time
      timerLeft -= 10;
   
      if (timerLeft < 0) {
        timerLeft = 0;
      }
  
      // display new time on page
      timerEl.textContent = timerLeft;
  
      
      feedbackEl.textContent = "Wrong!";
    } else {

      feedbackEl.textContent = "Correct!";
    }
  
    // display if answer was wrong or correct on page 
    feedbackEl.setAttribute("class", "feedback");
    setTimeout(function() {
      feedbackEl.setAttribute("class", "hide-feedback");
    }, 1000);
  
    // move to next question
    quizIndex++;
  
    // check if we've run out of questions
    if (quizIndex === question.length) {
      endQuiz();
      getInitials()
    } else {
        setTimeout(function() {
            startQuestion();     
        }, 1000);
      
    }                      
  }

  // end the quiz 
  function quizEnd() {
    // stop timer
    clearInterval(timerInterval);
  
    // show end screen
    var highscoreEl = document.querySelector("#quiz-over");
    highscoreEl.setAttribute("class", "show");
  
    // show final score
    var scoreEl = document.querySelector("#yourscore");
    ScoreEl.textContent = time;
  
    // hide questions section
    questionArrayEl.setAttribute("class", "hide");
  }
















/*var highscoresContainer.innerHtml = scoresHtml;

scoresHtml =‘<div class=“highscore”><div class=“initials”>dink</div><div class=“score”>500</div></div>”; 
*/










  /*

// function for saving highscore
function saveHighscore() {
    // get value of input box
    var initials = initialsEl.value.trim();
  
    // make sure value wasn't empty
    if (initials !== "") {
      // get saved scores from localstorage, or if not any, set to empty array
      var highscores =
        JSON.parse(window.localStorage.getItem("highscores")) || [];
  
      // format new score object for current user
      var newScore = {
        score: time,
        initials: initials
      };
  
      // save to localstorage
      highscores.push(newScore);
      window.localStorage.setItem("highscores", JSON.stringify(highscores));
  
      // redirect to next page
      window.location.href = "highScore.html";
    }
  }

  function checkForEnter(event) {
    // "13" represents the enter key
    if (event.key === "Enter") {
      saveHighscore();
    }
  }
  
  // user clicks button to submit initials
  submitBtn.onclick = saveHighscore;
  
  // user clicks button to start quiz
  startBtn.onclick = startQuiz;
  
  initialsEl.onkeyup = checkForEnter;



  function printHighscores() {
    // either get scores from localstorage or set to empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    // sort highscores by score property in descending order
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      // create li tag for each high score
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
  
      // display on page
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
  }
  
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  
  // run function when page loads
  printHighscores();*/