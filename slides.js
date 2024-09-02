const container = document.querySelector(".container");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function slider() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[currentSlide].style.display = "block";
  currentSlide++;

  if (currentSlide >= slides.length) {
    currentSlide = 0;
  }
}

setInterval(slider, 3000);


const icon = document.querySelector('.icon');
    const menu = document.querySelector('.menu');
    const span = document.querySelector('.span')

    function toggleNavbar() {
        menu.classList.toggle('active');
        icon.classList.toggle('active');
    }

    document.querySelector('.toggle-btn').addEventListener('click', function () {
        toggleNavbar();
    });