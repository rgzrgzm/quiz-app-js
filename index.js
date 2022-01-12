console.log("on");

const container = document.querySelector("#container");
const categoryText = document.querySelector("#categoryText");
const questionText = document.querySelector("#questionText");
const questionList = document.querySelector("#questionList");
const questionBody = document.querySelector(".question.body");
const gameResults = document.querySelector(".game-results");
const gameResultsLoser = document.querySelector(".game-results.loser");
const winnerMsg = document.querySelector("#winnerMsg");
const replayBtn = document.querySelector(".replay");
const replayBtn2 = document.querySelector(".replay2");
const count = document.querySelector("#count");
const answerMsg = document.querySelector("#answerMsg");


document.addEventListener("DOMContentLoaded", getDataAPI);

count.addEventListener("click", () => {
  console.log("click");
});

replayBtn.addEventListener("click", () => {
  window.location.reload();
});

replayBtn2.addEventListener("click", () => {
  window.location.reload();
});

let arrayRespuestas = [];
let cargando = false;
let arrayQuestions = [];
let counter;

const api_url = "https://opentdb.com/api.php?amount=1&type=multiple";

function getDataAPI() {
  showSpinner();

  fetch(api_url)
    .then((response) => response.json())
    .then((data) => {
      // console.log(data.results)
      data.results.forEach((item) => {
        // console.log(item)
        arrayQuestions.push(item);
        createHTML();
      });
    });
}

function createHTML() {
  //   console.log(arrayQuestions);

  arrayQuestions.forEach((element) => {
    console.log(element);
    const {
      category,
      correct_answer,
      difficulty,
      incorrect_answers,
      question,
      type,
    } = element;

    incorrect_answers.forEach((answer) => {
      arrayRespuestas = [...arrayRespuestas, answer];
    });

    arrayRespuestas = [...arrayRespuestas, correct_answer];

    console.log(arrayRespuestas); // Creamos un array para agrupar las variables incorrect_answers + correct_answer

    setTimeout(() => {
      const spinner = document.querySelector(".spinner");
      spinner.remove();

      categoryText.innerHTML = `${category}`;
      questionText.innerHTML = `${question}`;

      respuestasCards(correct_answer);
      startTimer(10, correct_answer);
    }, 2000);
  });
}

function showSpinner() {
  const divSpinner = document.createElement("div");
  divSpinner.classList.add("sk-fading-circle", "spinner");
  divSpinner.innerHTML = `
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>`;

  container.appendChild(divSpinner);
}

function respuestasCards(correct) {
  arrayRespuestas.sort();
  console.log(arrayRespuestas);
  arrayRespuestas.forEach((answers) => {
    const li = document.createElement("li");
    li.textContent = answers;
    // questionList.innerHTML += `<li>${answers}</li> `;
    questionList.appendChild(li);
    li.addEventListener("click", (e) => {
      selectAnswer(correct, e);
    });
  });
}

function startTimer(time, correct) {
  counter = setInterval(timer, 1000);

  function timer() {
    
    if (time <= 5) {
      count.classList.add('bg-red')
    }
    
    if (time < 0) {
      loser(correct);
      return;
    }

    count.textContent = `${time} s`;
    time--;
  }
}

function selectAnswer(correct, e) {
  clearInterval(counter);
  const respuesta = e.target.textContent;

  if (correct === e.target.textContent) {
    winner(correct, respuesta);
  } else {
    loser(correct, respuesta);
  }
}

function winner(correct, respuesta) {
  questionBody.classList.add("d-none");
  gameResults.classList.remove("d-none");
  winnerMsg.innerHTML = `
  <p class="correct-text">Correct Answer: ${correct}</p>
  <p class="respuesta-user">Your Answer: ${respuesta}</p>`;
}

function loser(correct, respuesta) {
  const loserMsg = document.querySelector("#loserMsg");

  questionBody.classList.add("d-none");
  gameResultsLoser.classList.remove("d-none");

  loserMsg.innerHTML = `
  <p class="correct-text">Correct Answer: ${correct}</p>
  <p class="respuesta-user">Your Answer: ${respuesta ? respuesta : 'Unanswered'}</p>
  `;
}
