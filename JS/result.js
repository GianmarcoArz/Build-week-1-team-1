const score = sessionStorage.getItem("score");
console.log(score);
const questionLength = sessionStorage.getItem("totalQuestions");

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
    resultText.innerHTML = `<h4>Sorry, retry the exam!!!</h4>
            <h3 style="color: #d20094; margin-top: 10px">You didn't pass the exam.</h3>`;
    resultText.style.marginTop = "50px";
  }
}

changeText();

const rateBtn = document.querySelector("button");

rateBtn.onclick = () => {
  window.location.href = "../feedback.html";
};

//Change color

let donutChart = document.querySelector(".result-big-circle");

//Si crea una variabile su CSS

donutChart.style.setProperty("--gradient-perc", `${scorePerc}%`);
