const slides = document.querySelector('.slides');
const slide = document.querySelectorAll('.slide');
const navDots = document.querySelectorAll('.slider-nav div');
let index = 0;

function showSlide(i) {
  slides.style.transform = `translateX(${-i * 100}%)`;
  navDots.forEach(dot => dot.classList.remove('active'));
  navDots[i].classList.add('active');
}

navDots.forEach((dot, i) => {
  dot.addEventListener('click', () => { index = i; showSlide(index); });
});

setInterval(() => {
  index = (index + 1) % slide.length;
  showSlide(index);
}, 5000);

function submitForm(e){
  e.preventDefault();
  alert('Thank you! Your message has been submitted.');
  e.target.reset();
}