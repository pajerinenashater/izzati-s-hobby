// JavaScript Document

let slider = document.querySelector('.slider');
let slides = document.querySelectorAll('.slider img');
let currentIndex = 0;

function showNextSlide() {
  currentIndex++;
  if (currentIndex >= slides.length) currentIndex = 0;
  updateSlidePosition();
}

function updateSlidePosition() {
  const offset = -currentIndex * slides[0].clientWidth;
  slider.style.transform = `translateX(${offset}px)`;
}

// Automatically slide every 3 seconds
setInterval(showNextSlide, 3000);

// Optional: responsive fix if window resizes
window.addEventListener('resize', updateSlidePosition);
