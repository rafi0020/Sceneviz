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
  
  const moveSlider = (clientX) => {
    const rect = container.getBoundingClientRect();
    let position = ((clientX - rect.left) / rect.width) * 100;
    
    // Bounds checking
    if (position < 0) position = 0;
    if (position > 100) position = 100;
    
    overlay.style.width = `${position}%`;
    handle.style.left = `${position}%`;
  };
  
  // Mouse Events
  handle.addEventListener('mousedown', (e) => {
    active = true;
    e.preventDefault();
  });
  
  window.addEventListener('mouseup', () => {
    active = false;
  });
  
  window.addEventListener('mousemove', (e) => {
    if (!active) return;
    moveSlider(e.clientX);
  });
  
  // Touch Events for Mobile
  handle.addEventListener('touchstart', (e) => {
    active = true;
  }, { passive: true });
  
  window.addEventListener('touchend', () => {
    active = false;
  });
  
  window.addEventListener('touchmove', (e) => {
    if (!active) return;
    if (e.touches.length > 0) {
      moveSlider(e.touches[0].clientX);
    }
  }, { passive: true });
  
  // Initial default slider position at 50%
  overlay.style.width = '50%';
  handle.style.left = '50%';
}
