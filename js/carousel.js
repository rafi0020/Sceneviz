/* ==========================================================================
   SCENVIZ TECHNOLOGIES - Hero Focal-Depth Carousel Controller
   ========================================================================== */

import { DEPLOYMENT_SLIDES } from './deployments-data.js';

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderSlide(slide, index) {
  return `
    <div class="hero-carousel-slide" data-slide-index="${index}">
      <div class="hero-carousel-media">
        <img src="${escapeHtml(slide.image)}" alt="${escapeHtml(slide.alt)}" loading="${index < 2 ? 'eager' : 'lazy'}" decoding="async">
      </div>
    </div>`;
}

function updateCaption(captionEl, index) {
  if (!captionEl) return;
  const slide = DEPLOYMENT_SLIDES[index];
  if (!slide) return;

  captionEl.innerHTML = `
    <span class="hero-carousel-tag">${escapeHtml(slide.tag)}</span>
    <span class="hero-carousel-title">${escapeHtml(slide.title)}</span>`;
}

function populateCarouselMarkup(wrapper) {
  const track = wrapper.querySelector('.hero-carousel-track');
  const dotsContainer = wrapper.querySelector('.hero-carousel-indicators');
  const totalEl = wrapper.querySelector('.hero-carousel-total');
  const captionEl = wrapper.querySelector('.hero-carousel-caption');

  if (!track || !dotsContainer) return false;

  const total = DEPLOYMENT_SLIDES.length;
  const totalLabel = String(total).padStart(2, '0');

  track.innerHTML = DEPLOYMENT_SLIDES.map(renderSlide).join('');
  dotsContainer.innerHTML = DEPLOYMENT_SLIDES.map(
    (_, i) =>
      `<button type="button" class="hero-carousel-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Deployment ${i + 1} of ${total}"></button>`
  ).join('');

  if (totalEl) totalEl.textContent = totalLabel;
  updateCaption(captionEl, 0);

  return true;
}

function initHeroCarousel(wrapper) {
  if (!populateCarouselMarkup(wrapper)) return;

  const track = wrapper.querySelector('.hero-carousel-track');
  const dotsContainer = wrapper.querySelector('.hero-carousel-indicators');
  const counterEl = wrapper.querySelector('.hero-carousel-current');
  const captionEl = wrapper.querySelector('.hero-carousel-caption');
  const prevBtn = wrapper.querySelector('.hero-carousel-nav--prev');
  const nextBtn = wrapper.querySelector('.hero-carousel-nav--next');

  const slides = Array.from(track.querySelectorAll('.hero-carousel-slide'));
  const dots = Array.from(dotsContainer.querySelectorAll('.hero-carousel-dot'));
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoplayTimer = null;
  let isPausedByUser = false;
  const INTERVAL_MS = 4000;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function goToSlide(index) {
    currentIndex = ((index % totalSlides) + totalSlides) % totalSlides;

    const prevIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    const nextIndex = (currentIndex + 1) % totalSlides;

    slides.forEach((slide, i) => {
      slide.classList.remove('is-active', 'is-prev', 'is-next');

      if (i === currentIndex) {
        slide.classList.add('is-active');
      } else if (i === prevIndex) {
        slide.classList.add('is-prev');
      } else if (i === nextIndex) {
        slide.classList.add('is-next');
      }
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });

    if (counterEl) {
      counterEl.textContent = String(currentIndex + 1).padStart(2, '0');
    }

    updateCaption(captionEl, currentIndex);
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
  }

  function startAutoplay() {
    if (prefersReducedMotion || totalSlides < 2) return;
    stopAutoplay();
    autoplayTimer = window.setInterval(nextSlide, INTERVAL_MS);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      window.clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function pauseAutoplayBriefly() {
    isPausedByUser = true;
    stopAutoplay();
    window.setTimeout(() => {
      isPausedByUser = false;
      if (!document.hidden) startAutoplay();
    }, INTERVAL_MS * 1.5);
  }

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      goToSlide(idx);
      pauseAutoplayBriefly();
    });
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    pauseAutoplayBriefly();
  });

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    pauseAutoplayBriefly();
  });

  wrapper.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
      pauseAutoplayBriefly();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
      pauseAutoplayBriefly();
    }
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoplay();
    } else if (!isPausedByUser) {
      startAutoplay();
    }
  });

  goToSlide(0);
  startAutoplay();
}

function bootCarousels() {
  document.querySelectorAll('[data-hero-carousel]').forEach(initHeroCarousel);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootCarousels);
} else {
  bootCarousels();
}
