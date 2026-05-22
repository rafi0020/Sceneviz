/* ==========================================================================
   SCENVIZ TECHNOLOGIES - Dynamic Floor Operations Dashboard Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initFloorDashboard();
});

function initFloorDashboard() {
  const bars = document.querySelectorAll('.dashboard-bar');
  const btnInspect = document.getElementById('dash-inspect');
  const btnCompliance = document.getElementById('dash-compliance');
  const statVal1 = document.getElementById('dash-val-1');
  const statVal2 = document.getElementById('dash-val-2');
  const statVal3 = document.getElementById('dash-val-3');
  
  if (!bars.length) return;
  
  // Random bar heights to simulate real-time operations cycle monitoring
  const generateRandomHeights = () => {
    bars.forEach(bar => {
      const heightPercent = Math.floor(Math.random() * 55) + 35; // 35% to 90%
      bar.style.height = `${heightPercent}%`;
      // Convert to visual cycle time (e.g. 4.2s to 10.8s)
      const simulatedTime = (heightPercent * 0.12).toFixed(1);
      bar.setAttribute('data-value', `${simulatedTime}s`);
    });
  };
  
  // Auto-animate every 3.5 seconds
  let dashTimer = setInterval(generateRandomHeights, 3500);
  generateRandomHeights();
  
  // Controls click handlers to shift operational modes
  if (btnInspect && btnCompliance) {
    btnInspect.addEventListener('click', () => {
      btnInspect.className = 'btn btn-primary';
      btnCompliance.className = 'btn btn-secondary';
      
      // Update stats and dynamic metrics
      if (statVal1) statVal1.innerText = '99.85%';
      if (statVal2) statVal2.innerText = '0.05s';
      if (statVal3) statVal3.innerText = '85% Savings';
      
      generateRandomHeights();
    });
    
    btnCompliance.addEventListener('click', () => {
      btnCompliance.className = 'btn btn-primary';
      btnInspect.className = 'btn btn-secondary';
      
      // Update stats for audit tracking
      if (statVal1) statVal1.innerText = '100.0%';
      if (statVal2) statVal2.innerText = 'RSC Audit Pass';
      if (statVal3) statVal3.innerText = '5.4x ROI';
      
      generateRandomHeights();
    });
  }
}
