const buttonEasy = document.getElementById("difficultyEasy");
const buttonNormal = document.getElementById("difficultyNormal");
const buttonHard = document.getElementById("difficultyHard");
const buttonCasual = document.getElementById("difficultyCasual");

const buttonMinus = document.getElementById("difficultyMinus");
const buttonPlus = document.getElementById("difficultyPlus");

const InputNumber = document.getElementById("NumberQuestion");

InputNumber.addEventListener("input", () => {
  const value = parseInt(InputNumber.value);
  if (value > 30) {
    InputNumber.value = 30;
  } else if (value < 1) {
    InputNumber.value = 1;
  }
});

buttonMinus.addEventListener("click", () => {
  const value = parseInt(InputNumber.value);
  if (value <= 1) {
    InputNumber.value = 1;
    return;
  } else {
    InputNumber.value--;
  }
});

buttonPlus.addEventListener("click", () => {
  const value = parseInt(InputNumber.value);
  if (value >= 30) {
    InputNumber.value = 30;
    return;
  } else {
    InputNumber.value++;
  }
});

buttonEasy.addEventListener("click", () => {
  if (InputNumber.value === "") {
    alert("You must enter a value");
  } else {
    const valueAnswer = InputNumber.value;
    console.log(valueAnswer);
    let apiUrl = `https://opentdb.com/api.php?amount=${valueAnswer}&category=18&difficulty=easy`;
    // Funzione per creare l'oggetto con i dati delle domande
    async function createQuestionsObject() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          alert("We couldn't find the questions, please try again!");
          throw new Error("Error in request: " + response.status);
        }
        const data = await response.json(); // Convertire la risposta in JSON
        const questionsObject = data.results; // Estrarre l'array delle domande

        // Restituisce l'oggetto delle domande
        return questionsObject;
      } catch (error) {
        console.error("Error creating question subject:", error);
        return;
      }
    }

    let questions = [];

    createQuestionsObject().then((questionsObject) => {
      if (questionsObject) {
        // Controlla che l'oggetto delle domande esista
        questionsObject.forEach((obj) => questions.push(obj));

        const questionsJSON = JSON.stringify(questions);
        sessionStorage.setItem("questions", questionsJSON);

        console.log(sessionStorage.getItem("questions"));
        window.location.href = "question.html";
      } else {
        console.error("No questions found or errors in question creation.");
      }
    });
  }
});

buttonNormal.addEventListener("click", () => {
  if (InputNumber.value === "") {
    alert("Please enter the number of questions to continue");
  } else {
    const valueAnswer = InputNumber.value;
    console.log(valueAnswer);
    let apiUrl = `https://opentdb.com/api.php?amount=${valueAnswer}&category=18&difficulty=medium`;
    // Funzione per creare l'oggetto con i dati delle domande
    async function createQuestionsObject() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          alert("We couldn't find the questions, please try again!");
          throw new Error("Error: " + response.status);
        }
        const data = await response.json(); // Convertire la risposta in JSON
        const questionsObject = data.results; // Estrarre l'array delle domande

        // Restituisce l'oggetto delle domande
        return questionsObject;
      } catch (error) {
        console.error("Error creating the question subject:", error);
        return;
      }
    }

    let questions = [];

    createQuestionsObject().then((questionsObject) => {
      if (questionsObject) {
        // Controlla che l'oggetto delle domande esista
        questionsObject.forEach((obj) => questions.push(obj));

        const questionsJSON = JSON.stringify(questions);
        sessionStorage.setItem("questions", questionsJSON);

        console.log(sessionStorage.getItem("questions"));
        window.location.href = "question.html";
      } else {
        console.error("No questions found or errors in question creation.");
      }
    });
  }
});

buttonHard.addEventListener("click", () => {
  if (InputNumber.value === "") {
    alert("You must enter a value");
  } else {
    const valueAnswer = InputNumber.value;
    console.log(valueAnswer);
    let apiUrl = `https://opentdb.com/api.php?amount=${valueAnswer}&category=18&difficulty=hard`;
    // Funzione per creare l'oggetto con i dati delle domande
    async function createQuestionsObject() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          alert("We couldn't find the questions, please try again!");
          throw new Error("Error in the request: " + response.status);
        }
        const data = await response.json(); // Convertire la risposta in JSON
        const questionsObject = data.results; // Estrarre l'array delle domande

        // Restituisce l'oggetto delle domande
        return questionsObject;
      } catch (error) {
        console.error("Error creating the question subject:", error);
        return;
      }
    }

    let questions = [];

    createQuestionsObject().then((questionsObject) => {
      if (questionsObject) {
        // Controlla che l'oggetto delle domande esista
        questionsObject.forEach((obj) => questions.push(obj));

        const questionsJSON = JSON.stringify(questions);
        sessionStorage.setItem("questions", questionsJSON);

        console.log(sessionStorage.getItem("questions"));
        window.location.href = "question.html";
      } else {
        console.error("No questions found or errors in question creation.");
      }
    });
  }
});

buttonCasual.addEventListener("click", () => {
  if (InputNumber.value === "") {
    alert("You must enter a value");
  } else {
    const valueAnswer = InputNumber.value;
    console.log(valueAnswer);
    let apiUrl = `https://opentdb.com/api.php?amount=${valueAnswer}&category=18`;
    // Funzione per creare l'oggetto con i dati delle domande
    async function createQuestionsObject() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          alert("We couldn't find the questions, please try again!");
          throw new Error("Error in request: " + response.status);
        }
        const data = await response.json(); // Convertire la risposta in JSON
        const questionsObject = data.results; // Estrarre l'array delle domande

        // Restituisce l'oggetto delle domande
        return questionsObject;
      } catch (error) {
        console.error("Error creating question subject:", error);
        return;
      }
    }

    let questions = [];

    createQuestionsObject().then((questionsObject) => {
      if (questionsObject) {
        // Controlla che l'oggetto delle domande esista
        questionsObject.forEach((obj) => questions.push(obj));

        const questionsJSON = JSON.stringify(questions);
        sessionStorage.setItem("questions", questionsJSON);

        console.log(sessionStorage.getItem("questions"));
        window.location.href = "question.html";
      } else {
        console.error("No questions found or errors in question creation.");
      }
    });
  }
});
