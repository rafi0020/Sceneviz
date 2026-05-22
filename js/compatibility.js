/* ==========================================================================
   SCENVIZ TECHNOLOGIES - Camera Compatibility Wizard Controller
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCompatibilityWizard();
});

function initCompatibilityWizard() {
  const panes = document.querySelectorAll('.wizard-pane');
  const steps = document.querySelectorAll('.wizard-step');
  const btnPrev = document.getElementById('wizard-prev');
  const btnNext = document.getElementById('wizard-next');
  const resultDiv = document.getElementById('wizard-result');
  
  if (!panes.length || !btnNext) return;
  
  let currentStep = 0;
  
  // Selection data
  let selections = {
    resolution: null,
    protocol: null,
    fps: null
  };
  
  // Setup option click handlers
  document.querySelectorAll('.wizard-option').forEach(option => {
    option.addEventListener('click', () => {
      const type = option.getAttribute('data-type');
      const val = option.getAttribute('data-value');
      
      // Clear sibling selections
      option.parentElement.querySelectorAll('.wizard-option').forEach(sib => {
        sib.classList.remove('selected');
      });
      
      option.classList.add('selected');
      selections[type] = val;
      
      // Enable next button once selection is made
      btnNext.disabled = false;
    });
  });
  
  btnNext.addEventListener('click', () => {
    if (currentStep < panes.length - 1) {
      currentStep++;
      updateWizardUI();
    } else {
      // Calculate and display B2B diagnosis
      showDiagnosis();
    }
  });
  
  btnPrev.addEventListener('click', () => {
    if (currentStep > 0) {
      currentStep--;
      updateWizardUI();
    }
  });
  
  function updateWizardUI() {
    // Update step highlights
    steps.forEach((step, idx) => {
      step.classList.remove('active', 'completed');
      if (idx === currentStep) {
        step.classList.add('active');
      } else if (idx < currentStep) {
        step.classList.add('completed');
      }
    });
    
    // Update pane visibility
    panes.forEach((pane, idx) => {
      pane.classList.remove('active');
      if (idx === currentStep) {
        pane.classList.add('active');
      }
    });
    
    // Enable/disable navigation buttons
    btnPrev.disabled = currentStep === 0;
    
    // Determine active pane validation
    const activePane = panes[currentStep];
    const currentKey = activePane.id.replace('pane-', '');
    
    if (selections[currentKey]) {
      btnNext.disabled = false;
    } else {
      btnNext.disabled = true;
    }
    
    if (currentStep === panes.length - 1) {
      btnNext.innerHTML = `<span style="padding: 14px 28px; font-weight:700;">Run Compatibility Audit</span>`;
    } else {
      btnNext.innerHTML = `<span style="padding: 14px 28px; font-weight:700;">Continue Setup</span>`;
    }
    
    // Hide results if we nav back
    resultDiv.style.display = 'none';
  }
  
  function showDiagnosis() {
    resultDiv.style.display = 'block';
    resultDiv.scrollIntoView({ behavior: 'smooth' });
    
    let headingHtml = '';
    let bodyHtml = '';
    let actionHtml = '';
    
    const isStandardIp = selections.protocol === 'rtsp' || selections.protocol === 'onvif';
    const isHighRes = selections.resolution === '1080p' || selections.resolution === '2k' || selections.resolution === '4k';
    const isGoodFps = selections.fps === '30fps' || selections.fps === '15fps';
    
    if (selections.protocol === 'coaxial') {
      headingHtml = `<h3 style="color: hsl(35, 92%, 50%); margin-bottom:10px;">⚠️ Compatible with Scenviz Edge-Encoder Bridge</h3>`;
      bodyHtml = `
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px;">
          Your analog coaxial setup is compatible via our localized <strong>Scenviz Edge-Encoder Bridge</strong>.
          We convert raw BNC connections on-site into RTSP streams locally with zero latency, retrofitting your legacy setup without needing to replace cabling.
        </p>
      `;
      actionHtml = `
        <a href="https://wa.me/8801712345678?text=Hello%20Scenviz%2C%20our%20factory%20runs%20an%20analog%20coaxial%20camera%20setup.%20I'd%20like%20to%20quote%20an%20Edge-Encoder%20Bridge%20integration." 
           class="btn btn-primary" target="_blank" rel="noopener noreferrer">
          Request Edge-Bridge Retrofit Quote
          <span class="btn-subtext">Direct Systems Consultation via WhatsApp</span>
        </a>
      `;
    } else if (isStandardIp && isHighRes && isGoodFps) {
      headingHtml = `<h3 style="color: var(--accent-green); margin-bottom:10px;">✓ 100% Fully Compatible (Plug-and-Play)</h3>`;
      bodyHtml = `
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px;">
          Great news! Your existing network cameras meet or exceed our enterprise requirements.
          We can connect directly to your RTSP/ONVIF streams on-site with <strong>zero hardware replacement</strong>.
          Your deployment will be 100% software-based, avoiding extra capital expenditure.
        </p>
      `;
      actionHtml = `
        <a href="https://wa.me/8801712345678?text=Hello%20Scenviz%2C%20our%20camera%20system%20is%20verified%20as%20fully%20compatible.%20I'd%20like%20to%20schedule%20our%2090-minute%20plant%20readiness%20walkthrough." 
           class="btn btn-primary" target="_blank" rel="noopener noreferrer">
          Schedule On-Site Verification Walkthrough
          <span class="btn-subtext">Zero Production Downtime Required</span>
        </a>
      `;
    } else {
      headingHtml = `<h3 style="color: hsl(35, 92%, 50%); margin-bottom:10px;">⚠️ Compatible with Calibration Adjustments</h3>`;
      bodyHtml = `
        <p style="color: var(--text-secondary); font-size: 0.95rem; margin-bottom: 20px;">
          Your camera streams are compatible but will require focal adjustments, network prioritization, or frame-rate locks during our 30-day proof-of-concept phase.
          Our Gazipur/Dhaka engineering teams will handle calibration to ensure accurate tracking.
        </p>
      `;
      actionHtml = `
        <a href="https://wa.me/8801712345678?text=Hello%20Scenviz%2C%20our%20cameras%20are%20partially%20compatible%20and%20will%20need%20calibration.%20Let's%20discuss%20our%20walkthrough." 
           class="btn btn-primary" target="_blank" rel="noopener noreferrer">
          Discuss Calibration with our Lead Engineer
          <span class="btn-subtext">Schedule Gazipur / Savar Support Visit</span>
        </a>
      `;
    }
    
    resultDiv.innerHTML = `
      <div style="background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 30px; border-left: 4px solid var(--accent-green);">
        ${headingHtml}
        ${bodyHtml}
        ${actionHtml}
      </div>
    `;
  }
}
