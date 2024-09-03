//______________________WELCOME__________________________//
const welcomeButton = document.getElementById("welcomeButton");
const prcedbutton = document.getElementById("prcedbutton");

function cangepage(event) {
  event.preventDefault();
  window.location.href = "../question.html";
}
welcomeButton.onsubmit = cangepage;
//______________________WELCOME__________________________//
