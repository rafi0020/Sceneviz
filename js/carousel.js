/* ==========================================================================
   SCENVIZ TECHNOLOGIES - Hero Deployment Carousel Controller
   Auto-scrolling image carousel that transitions slides right-to-left
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeroCarousel();
});

function initHeroCarousel() {
  const track = document.getElementById('hero-carousel-track');
  const dotsContainer = document.getElementById('hero-carousel-indicators');
  const counterEl = document.getElementById('hero-carousel-current');

  if (!track || !dotsContainer || !counterEl) return;

  const slides = track.querySelectorAll('.hero-carousel-slide');
  const dots = dotsContainer.querySelectorAll('.hero-carousel-dot');
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoplayTimer = null;
  const INTERVAL_MS = 3500; // 3.5 seconds per slide

  function goToSlide(index) {
    currentIndex = index;

    // Slide the track
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update dots
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    // Update counter
    counterEl.textContent = String(currentIndex + 1).padStart(2, '0');
  }

  function nextSlide() {
    const next = (currentIndex + 1) % totalSlides;
    goToSlide(next);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, INTERVAL_MS);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  // Dot click handlers — jump to that slide and restart timer
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      goToSlide(idx);
      startAutoplay(); // restart timer so it doesn't jump immediately
    });
  });

  // Pause on hover, resume on leave
  const wrapper = track.closest('.hero-carousel-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAutoplay);
    wrapper.addEventListener('mouseleave', startAutoplay);
  }

  // Start
  goToSlide(0);
  startAutoplay();
}
