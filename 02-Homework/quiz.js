// Button Constants
const startButton = document.getElementById("start-button")
const nextButton = document.getElementById("next-button")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById('question')
const answerButtonElement = document.getElementById('answer-button')
const scoreBoardElement = document.getElementById('scoreboard')

// Score Constants & Variables
const scoreBar = document.getElementById("right-answers");
const timeBar = document.getElementById("timer");
let scoreBoard = JSON.parse(localStorage.getItem("quizGame-scoreboard"))
let timer = 90;
let timerState = false;
let timerCallback;

// Logic Variables
let shuffledQuestions, currectQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click', newGame)
nextButton.addEventListener('click', () => {
  correctQuestionIndex++;
  setNextQuestion();
})

function newGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - 0.5)
  correctQuestionIndex = 0;
  questionContainerElement.classList.remove('hide')
  setNextQuestion();
  quizScore = 0;
  scoreBar.innerText = "Score: " + quizScore;
  timerState = true;
  timer = 90;
  timerCallback = setInterval(function () {
    timeBar.innerText = "Remaining Time: " + timer;

    // if timerState is false, unregister callback
    if (!timerState) {
      clearInterval(timerCallback)
    }

    // if game is running...
    if (timer <= 0) {
      gameover();
      //timerState = false;
    } else {
      timer--;
    }
  }, 1000) // call this routine once every second
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[correctQuestionIndex])
}

function showQuestion(question) {
  console.log(question);
  questionElement.innerText = question.question;
  question.options.forEach((answer) => {
    const button = document.createElement('button')
    button.innerText = answer;
    button.classList.add('btn')
    if (answer == question.answer) {
      button.dataset.correct = question.answer
    }
    button.addEventListener('click', selectAnswer)
    answerButtonElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonElement.firstChild) {
    answerButtonElement.removeChild(answerButtonElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct

  console.log(selectedButton.innerText);
  console.log(shuffledQuestions[correctQuestionIndex].answer);

  if (selectedButton.innerText == shuffledQuestions[correctQuestionIndex].answer) {
    setStatusClass(document.body, true);
    quizScore++;
  } else {
    setStatusClass(document.body, false);
    timer = timer - 5;
  }
  scoreBar.innerText = "Score: " + quizScore;

  // Array.from(answerButtonElement.children).forEach((button) => {
  // })


  // if quiz is NOT over - show next button
  if (shuffledQuestions.length > correctQuestionIndex + 1) {
    nextButton.classList.remove("hide")
  } else {
    // otherwise, offer to restart
    gameover();
    startButton.innerText = "restart"
    startButton.classList.remove("hide")
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
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

function gameover() {
  timerState = false;
  scoreBar.innerText = "Final Score: " + quizScore;
  const initials = prompt("Please enter your initials for the highscore table");
  if (!scoreBoard){ scoreBoard=[]; } // make sure scoreboard exists
  scoreBoard.push(
    {
      name: initials,
      score: quizScore
    }
  );

  scoreBoard.sort((a,b) => (a.score < b.score)?1:-1);

  localStorage.setItem("quizGame-scoreboard", JSON.stringify(scoreBoard));

  //TODO: Show Highscore Table
  showScoreBoard();
}

function showScoreBoard (){
  for (i=0; i< scoreBoard.length; i++){
    line = document.createElement('li');
    line.innerText = scoreBoard[i].name + " - " + scoreBoard[i].score;
    scoreBoardElement.appendChild(line);
  }

}

let questions = [
  {
    numb: 1,
    question: "Which one of these is a JavaScript framework?",
    answer: "React",
    options: [
      "Python",
      "Django",
      "React",
      "Eclipse"
    ]
  },
  {
    numb: 2,
    question: "Which one of these is a css style?",
    answer: "Font",
    options: [
      "Font",
      "Function",
      "Bike",
      "Fish"
    ]
  },
  {
    numb: 3,
    question: "Which one of these is an HTML element?",
    answer: "Link",
    options: [
      "Font",
      "Family",
      "Car",
      "Link"
    ]
  },
  {
    numb: 4,
    question: "Which one of these is a Jquery?",
    answer: "$",
    options: [
      "Rocket",
      "$",
      "Mountain",
      "Monkey"
    ]
  }
]
