/* ==========================================================================
   SCENVIZ TECHNOLOGIES - Hero Focal-Depth Carousel Controller
   Scale-on-focus: active slide sharp/full-size; neighbors scaled + blurred.
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
        <img src="${escapeHtml(slide.image)}" alt="${escapeHtml(slide.alt)}" loading="${index < 2 ? 'eager' : 'lazy'}">
      </div>
      <div class="hero-carousel-caption">
        <span class="hero-carousel-tag">${escapeHtml(slide.tag)}</span>
        <span class="hero-carousel-title">${escapeHtml(slide.title)}</span>
      </div>
    </div>`;
}

function populateCarouselMarkup(wrapper) {
  const track = wrapper.querySelector('.hero-carousel-track');
  const dotsContainer = wrapper.querySelector('.hero-carousel-indicators');
  const totalEl = wrapper.querySelector('.hero-carousel-total');

  if (!track || !dotsContainer) return false;

  const total = DEPLOYMENT_SLIDES.length;
  const totalLabel = String(total).padStart(2, '0');

  track.innerHTML = DEPLOYMENT_SLIDES.map(renderSlide).join('');
  dotsContainer.innerHTML = DEPLOYMENT_SLIDES.map(
    (_, i) =>
      `<button type="button" class="hero-carousel-dot${i === 0 ? ' active' : ''}" data-index="${i}" aria-label="Deployment ${i + 1} of ${total}"></button>`
  ).join('');

  if (totalEl) totalEl.textContent = totalLabel;

  return true;
}

function initHeroCarousel(wrapper) {
  if (!populateCarouselMarkup(wrapper)) return;

  const track = wrapper.querySelector('.hero-carousel-track');
  const dotsContainer = wrapper.querySelector('.hero-carousel-indicators');
  const counterEl = wrapper.querySelector('.hero-carousel-current');
  const prevBtn = wrapper.querySelector('.hero-carousel-nav--prev');
  const nextBtn = wrapper.querySelector('.hero-carousel-nav--next');

  const slides = Array.from(track.querySelectorAll('.hero-carousel-slide'));
  const dots = Array.from(dotsContainer.querySelectorAll('.hero-carousel-dot'));
  const totalSlides = slides.length;
  let currentIndex = 0;
  let autoplayTimer = null;
  const INTERVAL_MS = 3500;

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
  }

  function nextSlide() {
    goToSlide(currentIndex + 1);
  }

  function prevSlide() {
    goToSlide(currentIndex - 1);
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

  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-index'), 10);
      goToSlide(idx);
      startAutoplay();
    });
  });

  prevBtn?.addEventListener('click', () => {
    prevSlide();
    startAutoplay();
  });

  nextBtn?.addEventListener('click', () => {
    nextSlide();
    startAutoplay();
  });

  wrapper.addEventListener('mouseenter', stopAutoplay);
  wrapper.addEventListener('mouseleave', startAutoplay);

  wrapper.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prevSlide();
      startAutoplay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      nextSlide();
      startAutoplay();
    }
  });

  goToSlide(0);
  startAutoplay();
}

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-hero-carousel]').forEach(initHeroCarousel);
});
