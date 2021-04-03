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

  //variables for end of the quiz

/*var highScoreDisplay = document.querySelector("#highscore-display");*/
var initialsEl = document.querySelector("#initials");
var feedbackEl = document.querySelector("#feedback");
var submitButton = document.querySelector("#submit-initials");
var hasQuizEnded = false;
var quizOverEl = document.querySelector("#quiz-over");
var initials = '';
var score = 0;
var highscoreList = JSON.parse(localStorage.getItem("highscore")) || [];


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
        choicesEl.appendChild(button)
    }
}

function checkAnswer () {

    // check if user guessed wrong
    if (this.textContent !== question[quizIndex].answer) {
      // subtract time
      timerLeft -= 10;
   
      if (timerLeft < 0) {
        timerLeft = 0;
      }
  
      // display new time on page
      timerEl.textContent = timerLeft;
  
      
      feedbackEl.textContent = "Wrong!";
    } else {
      score++
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
      quizEnd();

    } else {
        setTimeout(function() {
            startQuestion();     
        }, 1000);
      
    }                      
  }


  // end the quiz 
  function quizEnd() { 
    console.log("quizEnd")
    hasQuizEnded = true;
    // stop timer
    clearInterval(timerInterval); 

    document.getElementById("yourscore").textContent = "Your score is " + score;
    document.querySelector("#quiz-over").classList.remove("hidden");
    questionArrayEl.setAttribute("class", "hidden");

    
 
  }
  function saveLocalStorage() {
   
    highscoreList.push({"initials": initials, "score": score});
    localStorage.setItem("highscore", JSON.stringify(highscoreList));
    window.location.assign("highscores.html");
}
    
      document.querySelector("#submit-initials").addEventListener("click", function () {
        initials = initialsEl.value;
      
       saveLocalStorage()
      })
    
  



