const startButton = docunment.gitElementById("start-btn")
const nextButton = docunment.gitElementById("next-btn")
const questionContainerElement = docunment.gitElementById("question-container")
const questionElement = document.gitElementById('question')
const answerButtonElement = document.getElementById('answer-button')

let shuffledQuestions,currectQuestionIndex;
let quizScore = 0;

startButton.addEventListener('click',startGame)
nextButton.addEventListener('click', () => {
  correctQuestionIndex++
})

function newGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => math.random() -0.5)
  correctQuestionIndex = 0;
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
  quizScore = 0
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[correctQuestionIndex])
}

function showQuestion(question) {
  questionElement.innertext = question.question;
  question.answer.forEach((answer) => {
    const button = document.createElement('button') 
    button.innerText = answer.text;
    button.classList.add('btn')
    if(answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click',selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while(answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
   }
}

function selectAnswer(e) {
  const selectedButton = e.target 
  const correct = selectrButton.dataset.correct
  
   setStatusClass(document.body,correct)
    Array.from(answerButtonsElement.children).forEach((button)=>{
    })
  if(shuffledQuestions.lenght > correctQuestionIndex +1) {
    nextButton.classList.remove("hide")
  } else {
    startButton.innerText = "restert"
    startButton.classList.remove("hide")
  }
  if(selectedButton.dataset = correct) {
    quizScore++
  } 
}

function setStatusClass(element,correct) {
  if(correct) {
    element.classList.add("correct")
  } else {
    element.classList.add("wrong")  
  } 
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
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