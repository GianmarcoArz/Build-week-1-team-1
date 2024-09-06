/*const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: ["Central Process Unit", "Computer Personal Unit", "Central Processor Unit"]
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"]
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"]
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"]
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"]
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet"]
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"]
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"]
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"]
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"]
  }
];
*/
const questJSON = sessionStorage.getItem("questions");

const questions = JSON.parse(questJSON);
console.log(questions);
let score = 0;
let timeLeft = 30;
let timerInterval;
let totalTime = 30;
const userAnswers = [];

// function insertUserAnswers() {

// }
const startTimer = () => {
  if (questions[currentQuestionIndex].difficulty === "easy") {
    timeLeft = 30;
    totalTime = 30;
  } else if (questions[currentQuestionIndex].difficulty === "medium") {
    timeLeft = 45;
    totalTime = 45;
  } else if (questions[currentQuestionIndex].difficulty === "hard") {
    timeLeft = 60;
    totalTime = 60;
  }

  timerInterval = setInterval(() => {
    timeLeft--;
    document.querySelector("#time h3").textContent = timeLeft;

    let timeLeftPerc = (timeLeft / totalTime) * 100;
    let timeLeftPercInvers = 100 - timeLeftPerc + 1;
    //30(totalTime):100(100%) = 30(timeLeft):x
    let donutChart = document.querySelector(".timer-big-circle");
    if (timeLeft <= 5) {
      donutChart.style.setProperty("--gradient-color", "#ff0000");
      donutChart.style.setProperty("--countdown-color", "#ff0000"); //RED 5 SECONDI
    } else if (timeLeft <= 10) {
      donutChart.style.setProperty("--gradient-color", "#ffa500");
      donutChart.style.setProperty("--countdown-color", "#ffa500"); // ORANGE 10 SEC
    } else {
      donutChart.style.setProperty("--gradient-color", "#00ffff");
      donutChart.style.setProperty("--countdown-color", "#fff"); // NORMALE DA 30 A 10 SEC
    }

    //Si crea una variabile su CSS

    donutChart.style.setProperty("--gradient-perc", `${timeLeftPercInvers}%`);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      console.log(userAnswers);
      userAnswers.push({
        question: questions[currentQuestionIndex].question,
        correctAnswers: questions[currentQuestionIndex].correct_answer,
        userAnswers: null,
        answers: [
          ...questions[currentQuestionIndex].incorrect_answers,
          questions[currentQuestionIndex].correct_answer,
        ],
        difficulty: questions[currentQuestionIndex].difficulty,
      });

      if (currentQuestionIndex + 1 < questions.length) {
        setTimeout(() => {
          clearInterval(timerInterval);
          currentQuestionIndex++;
          showQuestion();
          console.log(currentQuestionIndex, questions.length);
          let questionNumbers = document.getElementById("questionNumbers");
          questionNumbers.innerText = currentQuestionIndex + 1;
        }, 500); // 1/2 SEC E REINDERIZZO
      } else {
        // Attendo qualche secondo e poi vado alla pagina dei risultati
        setTimeout(() => {
          sessionStorage.setItem("score", score);
          sessionStorage.setItem("totalQuestions", questions.length);
          sessionStorage.setItem("userAnswers", JSON.stringify(userAnswers));
          window.location.href = "result.html"; // VADO SU RESULT PAGINA
        }, 500); // 1/2 SEC E REINDERIZZO
      }
    }
  }, 1000); //1 sec
};
// MESCOLO DOM IN MODO CASUALE
shuffleArray(questions);

// VAR PER TRACCIARE L'INDICE DELLA DOMAND CORRENTE
let currentQuestionIndex = 0;

// QUANDO SI CARICA LA PAGINA , ESEUO FUNZIONE SHOWQUESTION PER VISUALIZZARE LA PRIMA DOMANDA.
window.onload = function () {
  showQuestion();
};

// FUNZIONE DOVE MESCOLO L'ARRAY IN MODO CASUALE.
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // ALGORITMO FISHER-YATES
    [array[i], array[j]] = [array[j], array[i]]; // LA J SERVE PER PRENDERE L'INDICE DELL'ARRAY PER SCAMBIARLO CON QUELLO DELLA I IN MODO CASUALE
  }
}

// QUESTA E' LA FUNZIONE PER VISUALIZZARE LA DOMANDA CORRENTE
function showQuestion() {
  const totalQuestionNumber = document.getElementById("totalQuestionNumber");
  totalQuestionNumber.innerText = questions.length;
  startTimer();
  const questionContainer = document.querySelector(".question");

  const optionsContainer = document.querySelector(".question-options");

  // OTTENGO L'OGGETTO DELLA DOMANDA CORRENTE DALL'ARRAY QUESTION
  const currentQuestion = questions[currentQuestionIndex];

  // COSI' INSERISCO IL TESTO DELLA DOMANDE NELL'ELEMENTO CURRENT QUESTION
  questionContainer.innerHTML = currentQuestion.question;

  // CANCELLO TUTTE LE OPZIONI DI RISP PRECDENTI
  optionsContainer.innerHTML = "";

  // Combina le risposte CORRETTE e INCORRETTE in un unico array e LE MESCOLO.
  const answers = [
    ...currentQuestion.incorrect_answers,
    currentQuestion.correct_answer,
  ];
  answers.sort(() => Math.random() - 0.5); // COSì MESCOLO LE OPZIONI A CASO

  // CREO UN PULSANTE PER OGNI RISPOSTA E AGGIUNGO L'EVENTO CLICK
  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add("question-option");
    button.classList.add("hover");
    button.innerText = answer; // IMPOSTO IL TESTO DEL PULSANTE COME RISPOSTA
    button.onclick = (e) => handleAnswer(e, answer); // Aggiunge l'evento click che gestisce la selezione della risposta, con la e mi torna tutto ciò che sta dentro l'evento
    optionsContainer.appendChild(button);
  });

  // COSì AGGIORNO IL NUMERO DELLA DOMANDA CORRENTE
  let questionNumbers = document.getElementById("questionNumbers");
  questionNumbers.innerText = currentQuestionIndex + 1;
}

// Funzione che gestisce la selezione di una risposta
function handleAnswer(e, selectedAnswer) {
  const selectedButton = e.target;
  const isCorrect =
    selectedAnswer === questions[currentQuestionIndex].correct_answer;

  console.log(userAnswers);

  userAnswers.push({
    question: questions[currentQuestionIndex].question,
    correctAnswers: questions[currentQuestionIndex].correct_answer,
    userAnswers: selectedAnswer,
    answers: [
      ...questions[currentQuestionIndex].incorrect_answers,
      questions[currentQuestionIndex].correct_answer,
    ],
    difficulty: questions[currentQuestionIndex].difficulty,
  });

  if (isCorrect) {
    selectedButton.style.backgroundColor = "#47bc27"; // VERDE CORRETTO
  } else {
    selectedButton.style.backgroundColor = "#bb1616"; // ROSSO SBAGLIATO
  }

  // Disabilita tutti i pulsanti per impedire ulteriori clic
  const buttons = document.querySelectorAll(".question-option");
  buttons.forEach((button) => {
    button.disabled = true;
    button.classList.remove("hover");
    if (button.innerText === questions[currentQuestionIndex].correct_answer) {
      button.style.backgroundColor = "#47bc27"; // Colore verde per la risposta corretta
    }
  });

  // Aggiorna il punteggio se la risposta è corretta
  if (isCorrect) {
    score++;
  }

  // Passa alla prossima domanda incrementando l'indice
  currentQuestionIndex++;
  clearInterval(timerInterval);
  // Se ci sono altre domande, visualizza la prossima domanda, altrimenti reindirizza alla pagina dei risultati
  if (currentQuestionIndex < questions.length) {
    setTimeout(() => {
      showQuestion();
    }, 500); // 1/2 SEC E REINDERIZZO
  } else {
    // Attendo qualche secondo e poi vado alla pagina dei risultati
    setTimeout(() => {
      sessionStorage.setItem("score", score);
      sessionStorage.setItem("totalQuestions", questions.length);
      sessionStorage.setItem("userAnswers", JSON.stringify(userAnswers));
      window.location.href = "result.html"; // VADO SU RESULT PAGINA
    }, 1000); // 1 SEC E REINDERIZZO
  }
}
