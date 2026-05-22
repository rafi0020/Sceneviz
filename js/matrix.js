/* ==========================================================================
   SCENVIZ TECHNOLOGIES - Before/After Split Defect Inspection Slider
   ========================================================================== */

function initMatrixSlider() {
  const container = document.querySelector('.matrix-container');
  const overlay = document.querySelector('.matrix-overlay');
  const handle = document.querySelector('.matrix-handle');
  const afterImg = overlay?.querySelector('.matrix-img');

  if (!container || !overlay || !handle) return;

  let active = false;
  let latestClientX = null;
  let ticking = false;
  let currentPercent = 50;

  const syncAfterImageWidth = () => {
    if (!afterImg) return;
    const width = container.offsetWidth;
    container.style.setProperty('--matrix-width', `${width}px`);
    afterImg.style.width = `${width}px`;
  };

  const setPosition = (percent) => {
    currentPercent = Math.min(100, Math.max(0, percent));
    overlay.style.width = `${currentPercent}%`;
    handle.style.left = `${currentPercent}%`;
    handle.style.transform = 'translateX(-50%)';
  };

  const updateSliderPosition = () => {
    if (latestClientX === null) {
      ticking = false;
      return;
    }

    const rect = container.getBoundingClientRect();
    const position = ((latestClientX - rect.left) / rect.width) * 100;
    setPosition(position);
    ticking = false;
  };

  const requestUpdate = (clientX) => {
    latestClientX = clientX;
    if (!ticking) {
      requestAnimationFrame(updateSliderPosition);
      ticking = true;
    }
  };

  const positionFromEvent = (event) => {
    const clientX = 'touches' in event && event.touches.length > 0
      ? event.touches[0].clientX
      : event.clientX;
    requestUpdate(clientX);
  };

  const startDrag = (event) => {
    active = true;
    event.preventDefault();
  };

  const endDrag = () => {
    active = false;
  };

  handle.addEventListener('mousedown', startDrag);
  window.addEventListener('mouseup', endDrag);
  window.addEventListener('mousemove', (e) => {
    if (!active) return;
    requestUpdate(e.clientX);
  });

  handle.addEventListener('touchstart', startDrag, { passive: false });
  window.addEventListener('touchend', endDrag);
  window.addEventListener('touchmove', (e) => {
    if (!active) return;
    if (e.touches.length > 0) {
      requestUpdate(e.touches[0].clientX);
    }
  }, { passive: true });

  container.addEventListener('click', (e) => {
    if (e.target.closest('.matrix-handle')) return;
    requestUpdate(e.clientX);
  });

  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition(currentPercent - 5);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition(currentPercent + 5);
    }
  });

  window.addEventListener('resize', syncAfterImageWidth, { passive: true });

  if (typeof ResizeObserver !== 'undefined') {
    const ro = new ResizeObserver(syncAfterImageWidth);
    ro.observe(container);
  }

  syncAfterImageWidth();
  setPosition(50);
}

function bootMatrixSlider() {
  initMatrixSlider();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootMatrixSlider);
} else {
  bootMatrixSlider();
}
