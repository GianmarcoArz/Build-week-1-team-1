const stars = document.querySelectorAll(".fdbck-stars svg");

let currentRating = 0; // Variabile per mantenere traccia della selezione corrente

stars.forEach((star) => {
  star.addEventListener("click", () => {
    stars.forEach((s) => s.classList.remove("selected")); // Rimuovo la classe 'selected' da tutte le stelle

    let selectedValue = parseInt(star.dataset.value); // Aggiungo la classe 'selected' alla stella cliccata e a tutte le stelle precedenti
    currentRating = selectedValue; // Aggiorna il valore della selezione corrente
    stars.forEach((s) => {
      if (parseInt(s.dataset.value) <= selectedValue) {
        s.classList.add("selected");
      }
    });
  });

  // Evento mouseover per l'hover
  star.addEventListener("mouseover", () => {
    stars.forEach((s) => s.classList.remove("selected"));

    // Aggiungo la classe 'selected' alla stella su cui si passa il mouse e a tutte le stelle precedenti
    let hoverValue = parseInt(star.dataset.value);
    stars.forEach((s) => {
      if (parseInt(s.dataset.value) <= hoverValue) {
        s.classList.add("selected");
      }
    });
  });

  // Evento mouseout per ripristinare lo stato
  star.addEventListener("mouseout", () => {
    // Ripristina lo stato delle stelle alla selezione corrente
    stars.forEach((s) => s.classList.remove("selected"));
    stars.forEach((s) => {
      if (parseInt(s.dataset.value) <= currentRating) {
        s.classList.add("selected");
      }
    });
  });
});

const feedbackInput = document.querySelector(".fdbck-input");
const feedbackButton = document.getElementById("fdbck-button");

feedbackButton.onclick = (event) => {
  event.preventDefault();
  let inputText = feedbackInput.value;
  if (inputText === "") {
    alert("please leave your feedback");
  } else {
    const fdbk1 = document.getElementById("fdbckComment");
    const fdbk2 = document.getElementById("fdbckFinal");
    fdbk1.style.display = "none";
    fdbk2.style.display = "block";
    const ratingText = document.querySelector("#fdbckFinal p");
    if (currentRating < 6) {
      ratingText.innerText = "We're Sorry for your Bad Experience.";
    } else if (currentRating < 8) {
      ratingText.innerText = "Thank you for your positive Feedback.";
    } else {
      ratingText.innerText = "We're very Grateful for your Feedback.";
    }
  }
};
