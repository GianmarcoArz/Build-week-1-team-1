const score = sessionStorage.getItem("score");
console.log(score);
const questionLength = sessionStorage.getItem("totalQuestions");
const userAnswers = JSON.parse(sessionStorage.getItem("userAnswers"));
console.log(userAnswers);
for (let i = 0; i < userAnswers.length; i++) {
  const answer = userAnswers[i];
  const answerContainer = document.getElementById("questions-list");
  const answerDifficult = document.createElement("h4");
  answerDifficult.innerText = answer.difficulty;
  answerContainer.appendChild(answerDifficult);
  const question = document.createElement("h3");
  question.innerText = answer.question;
  answerContainer.appendChild(question);
  const questionUl = document.createElement("ul");

  for (let j = 0; j < answer.answers.length; j++) {
    const li = document.createElement("li");
    li.innerText = answer.answers[j];

    if (li.innerText === answer.userAnswers) {
      li.classList.add("selected");
      if (li.innerText === answer.correctAnswers) {
        li.classList.add("correct");
      } else {
        li.classList.add("incorrect");
      }
    } else if (li.innerText === answer.correctAnswers) {
      li.classList.add("correct");
    }
    questionUl.appendChild(li);
  }
  answerContainer.appendChild(questionUl);
}

let correctPerc = document.getElementById("correct-perc");
let wrongPerc = document.getElementById("wrong-perc");
const correctNumb = document.getElementById("correct-numb");
const wrongNumb = document.getElementById("wrong-numb");

let scorePerc = (score / questionLength) * 100;
let wrongScorePerc = ((questionLength - score) / questionLength) * 100;

correctPerc.innerText = Math.ceil(scorePerc) + " %";
correctNumb.innerText = score;
wrongPerc.innerText = Math.ceil(wrongScorePerc) + " %";
wrongNumb.innerText = questionLength - score;

const totalQuestionNumber = document.querySelectorAll(".questionLength");
totalQuestionNumber.forEach((span) => (span.innerText = questionLength));
function changeText() {
  const resultText = document.getElementById("result-text");

  if ((score / questionLength) * 100 < 60) {
    resultText.innerHTML = `<h4 style="margin-bottom: 20px;">Sorry,retry the exam!!!</h4>
            <h3 style="color: #d20094;">You didn't pass the exam.</h3>`;
  }
}

changeText();

const rateBtn = document.getElementById("rateBtn");

rateBtn.onclick = () => {
  window.location.href = "../feedback.html";
};

//Change color

let donutChart = document.querySelector(".result-big-circle");

//Si crea una variabile su CSS

donutChart.style.setProperty("--gradient-perc", `${scorePerc}%`);
