/* ==========================================================================
   SCENVIZ TECHNOLOGIES - Hero Focal-Depth Carousel Controller
   Scale-on-focus carousel: active slide is sharp and full-size,
   neighbors are scaled down and blurred for a depth-of-field effect.
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initHeroCarousel();
});

function initHeroCarousel() {
  const track = document.getElementById('hero-carousel-track');
  const dotsContainer = document.getElementById('hero-carousel-indicators');
  const counterEl = document.getElementById('hero-carousel-current');

  if (!track || !dotsContainer || !counterEl) return;

  const slides = Array.from(track.querySelectorAll('.hero-carousel-slide'));
  const dots = Array.from(dotsContainer.querySelectorAll('.hero-carousel-dot'));
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoplayTimer = null;
  const INTERVAL_MS = 3500;

  /**
   * Apply focal-depth classes to slides based on current index.
   * - is-active:  scale(1), no blur, full opacity — center stage
   * - is-prev:    scale(0.78), blur(4px), dim — peeking from the left
   * - is-next:    scale(0.78), blur(4px), dim — peeking from the right
   * - (default):  hidden off to the right side
   */
  function goToSlide(index) {
    currentIndex = index;

    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    const nextIndex = (currentIndex + 1) % totalSlides;

    slides.forEach((slide, i) => {
      // Clear all state classes
      slide.classList.remove('is-active', 'is-prev', 'is-next');

      if (i === currentIndex) {
        slide.classList.add('is-active');
      } else if (i === prevIndex) {
        slide.classList.add('is-prev');
      } else if (i === nextIndex) {
        slide.classList.add('is-next');
      }
      // All others remain in default state (hidden, scaled down, off-screen)
    });

    // Update dot indicators
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    // Update counter display
    counterEl.textContent = String(currentIndex + 1).padStart(2, '0');
  }

  function nextSlide() {
    goToSlide((currentIndex + 1) % totalSlides);
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

  // Dot click — jump to slide
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      goToSlide(idx);
      startAutoplay();
    });
  });

  // Pause on hover, resume on leave
  const wrapper = track.closest('.hero-carousel-wrapper');
  if (wrapper) {
    wrapper.addEventListener('mouseenter', stopAutoplay);
    wrapper.addEventListener('mouseleave', startAutoplay);
  }

  // Initialize
  goToSlide(0);
  startAutoplay();
}
