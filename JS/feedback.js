const stars = document.querySelectorAll(".fdbck-stars svg").forEach((star) => {
  star.addEventListener("click", () => {
    console.log(star.getAttribute("data-value"));
    const value = star.getAttribute("data-value");
    document.querySelectorAll(".fdbck-stars svg").forEach((s) => {
      s.classList.toggle("selected", s.getAttribute("data-value") <= value);
    });
  });
});
console.log(stars);
