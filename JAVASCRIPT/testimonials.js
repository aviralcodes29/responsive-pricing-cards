// Testimonials Slider
const testimonialCards = document.querySelectorAll('.testimonial-card');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicatorsContainer = document.getElementById('indicators');

let currentIndex = 0;
let autoSlideInterval;

// Create indicators
testimonialCards.forEach((_, index) => {
    const indicator = document.createElement('div');
    indicator.classList.add('indicator');
    if (index === 0) indicator.classList.add('active');
    indicator.addEventListener('click', () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
});

const indicators = document.querySelectorAll('.indicator');

function showSlide(index) {
    testimonialCards.forEach((card, i) => {
        card.classList.remove('active');
        indicators[i].classList.remove('active');
    });
    
    testimonialCards[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonialCards.length;
    showSlide(currentIndex);
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + testimonialCards.length) % testimonialCards.length;
    showSlide(currentIndex);
}

function goToSlide(index) {
    currentIndex = index;
    showSlide(currentIndex);
    resetAutoSlide();
}

function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Event Listeners
nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

// Start auto-slide
startAutoSlide();

// Pause auto-slide on hover
const sliderContainer = document.querySelector('.testimonials-slider');
sliderContainer.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
sliderContainer.addEventListener('mouseleave', startAutoSlide);