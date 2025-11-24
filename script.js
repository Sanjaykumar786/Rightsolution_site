// ===== SLIDER FUNCTIONALITY =====
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.slider-dots');
const prevBtn = document.querySelector('.slider-prev');
const nextBtn = document.querySelector('.slider-next');

let currentSlide = 0;
let autoAdvanceTimer;

// Initialize slider
function initSlider() {
  // Create dots dynamically
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  // Show first slide
  showSlide(currentSlide);

  // Auto-advance every 5 seconds
  startAutoAdvance();

  // Add event listeners
  prevBtn.addEventListener('click', () => {
    stopAutoAdvance();
    previousSlide();
    startAutoAdvance();
  });

  nextBtn.addEventListener('click', () => {
    stopAutoAdvance();
    nextSlide();
    startAutoAdvance();
  });

  // Pause on hover
  slider.addEventListener('mouseenter', stopAutoAdvance);
  slider.addEventListener('mouseleave', startAutoAdvance);

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Only listen for arrow keys when not typing in input
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    
    if (e.key === 'ArrowLeft') {
      stopAutoAdvance();
      previousSlide();
      startAutoAdvance();
    } else if (e.key === 'ArrowRight') {
      stopAutoAdvance();
      nextSlide();
      startAutoAdvance();
    }
  });
}

function showSlide(index) {
  // Remove active class from all slides
  slides.forEach((slide) => slide.classList.remove('active'));

  // Add active class to current slide
  slides[index].classList.add('active');

  // Update dots
  document.querySelectorAll('.slider-dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function goToSlide(index) {
  currentSlide = (index + slides.length) % slides.length;
  showSlide(currentSlide);
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

function previousSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
}

function startAutoAdvance() {
  autoAdvanceTimer = setInterval(() => {
    nextSlide();
  }, 3000);
}

function stopAutoAdvance() {
  clearInterval(autoAdvanceTimer);
}

// ===== NAVIGATION TOGGLE =====
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', !isExpanded);
  navMenu.setAttribute('aria-expanded', !isExpanded);
});

// Close menu when a nav link is clicked
document.querySelectorAll('.nav-menu a').forEach((link) => {
  link.addEventListener('click', () => {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.setAttribute('aria-expanded', 'false');
  });
});

// ===== CONTACT FORM =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Get form data
  const name = contactForm.querySelector('input[name="name"]').value;
  const email = contactForm.querySelector('input[name="email"]').value;
  const phone = contactForm.querySelector('input[name="phone"]').value;
  const message = contactForm.querySelector('textarea[name="message"]').value;

  // Simple validation
  if (!name || !email || !message) {
    alert('Please fill in all required fields.');
    return;
  }

  // Show success message
  alert('Thank you for your message! We will get back to you soon.');

  // Reset form
  contactForm.reset();
});

// ===== FOOTER YEAR =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== INITIALIZE ON DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  initSlider();
});