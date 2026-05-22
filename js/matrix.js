/* ==========================================================================
   SCENVIZ TECHNOLOGIES - Before/After Split Defect Inspection Slider Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initMatrixSlider();
});

function initMatrixSlider() {
  const container = document.querySelector('.matrix-container');
  const overlay = document.querySelector('.matrix-overlay');
  const handle = document.querySelector('.matrix-handle');
  
  if (!container || !overlay || !handle) return;
  
  let active = false;
  let latestClientX = null;
  let ticking = false;
  
  const updateSliderPosition = () => {
    if (latestClientX === null) {
      ticking = false;
      return;
    }
    
    // getBoundingClientRect forces layout recalculation. 
    // By running this inside requestAnimationFrame, we ensure the read/write
    // cycles are batched and executed optimally by the browser engine.
    const rect = container.getBoundingClientRect();
    let position = ((latestClientX - rect.left) / rect.width) * 100;
    
    // Bounds checking
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    
    overlay.style.width = `${position}%`;
    handle.style.left = `${position}%`;
    
    ticking = false;
  };
  
  const requestUpdate = (clientX) => {
    latestClientX = clientX;
    if (!ticking) {
      requestAnimationFrame(updateSliderPosition);
      ticking = true;
    }
  };
  
  // Mouse Events
  handle.addEventListener('mousedown', (e) => {
    active = true;
    e.preventDefault(); // Prevents text selection while dragging
  });
  
  window.addEventListener('mouseup', () => {
    active = false;
  });
  
  window.addEventListener('mousemove', (e) => {
    if (!active) return;
    requestUpdate(e.clientX);
  });
  
  // Touch Events for Mobile (with touch gesture isolation check)
  handle.addEventListener('touchstart', (e) => {
    active = true;
  }, { passive: true });
  
  window.addEventListener('touchend', () => {
    active = false;
  });
  
  window.addEventListener('touchmove', (e) => {
    if (!active) return;
    if (e.touches.length > 0) {
      requestUpdate(e.touches[0].clientX);
    }
  }, { passive: true });
  
  // Initial default slider position at 50%
  overlay.style.width = '50%';
  handle.style.left = '50%';
}
