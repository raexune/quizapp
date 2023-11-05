"usestrict";

const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswer = false;
let score = 0;
let questionCounter = 0;
let availibleQuestions = [];

let questions = [
  {
    question: "Inside which Html element do we put the Javascript?",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3
  },
  {
    question: "How do you write 'Hello World!' in an alert box?",
    choice1: "msgBox('Hello World!')",
    choice2: "alertBox('Hello World!')",
    choice3: "msg('Hello World!')",
    choice4: "alert('Hello World!')",
    answer: 4
  }
];

//Constans
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availibleQuestions = [...questions];
  console.log(availibleQuestions);
  getNewQuestions();
};

getNewQuestions = () => {
  if (availibleQuestions == 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("/end.html");
  }
  questionCounter++;
  questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

  const questionIndex = Math.floor(Math.random() * availibleQuestions.length);
  currentQuestion = availibleQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availibleQuestions.splice(questionIndex, 1);

  acceptingAnswer = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswer) return;

    acceptingAnswer = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToAply = "incorrect";
    if (selectedAnswer == currentQuestion.answer) {
      classToAply = "correct";
    }

    if (classToAply == "correct") {
      incrementScore(CORRECT_BONUS);
    }
    console.log(classToAply);

    console.log(selectedAnswer == currentQuestion);

    selectedChoice.parentElement.classList.add(classToAply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToAply);
      getNewQuestions();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
