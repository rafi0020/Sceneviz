/* ==========================================================================
   SCENVIZ TECHNOLOGIES - Core Shared Script (Global Layout Injection & Logic)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  injectSharedLayouts();
  setupMobileNav();
  setupScrollEffects();
  setupWhatsAppTracking();
  setupFaqAccordions();
});

/**
 * 1. Dynamically Inject Header, Footer, WhatsApp FAB, and Mobile Sticky Bar
 */
function injectSharedLayouts() {
  const currentPath = window.location.pathname;
  
  // Resolve correct paths depending on directory depth
  const isCapabilityPage = currentPath.includes('/capabilities/');
  const rootPrefix = isCapabilityPage ? '../' : './';
  
  // A. INJECT HEADER (prepend to body)
  const headerHtml = `
    <header class="header" id="header">
      <div class="nav-container">
        <a href="${rootPrefix}index.html" class="logo-link">
          <div class="logo-icon">S</div>
          <div class="logo-text">SCENVIZ<span>.</span></div>
        </a>
        <nav>
          <ul class="nav-menu" id="nav-menu">
            <li class="nav-item">
              <a href="#" class="nav-link" id="nav-capabilities">Capabilities ▾</a>
              <div class="nav-dropdown">
                <a href="${rootPrefix}capabilities/visual-inspection.html" class="dropdown-link">
                  <span class="dropdown-link-title">Automated Visual Inspection</span>
                  <span class="dropdown-link-desc">Detect stitch, cosmetic & structural defect logs.</span>
                </a>
                <a href="${rootPrefix}capabilities/compliance-evidence.html" class="dropdown-link">
                  <span class="dropdown-link-title">Compliance Evidence Generation</span>
                  <span class="dropdown-link-desc">Automated BSCI/WRAP audit-ready report logs.</span>
                </a>
                <a href="${rootPrefix}capabilities/floor-intelligence.html" class="dropdown-link">
                  <span class="dropdown-link-title">Production Floor Intelligence</span>
                  <span class="dropdown-link-desc">Real-time cycle time & balance dashboard feeds.</span>
                </a>
              </div>
            </li>
            <li class="nav-item"><a href="${rootPrefix}deployments.html" class="nav-link" id="nav-deployments">Proven Deployments</a></li>
            <li class="nav-item"><a href="${rootPrefix}support-sla.html" class="nav-link" id="nav-support">Local Support & SLAs</a></li>
            <li class="nav-item"><a href="${rootPrefix}library.html" class="nav-link" id="nav-library">Technical Library</a></li>
            <li class="nav-item"><a href="${rootPrefix}commercials.html" class="nav-link" id="nav-commercials">Capex & Commercials</a></li>
          </ul>
        </nav>
        <a href="${rootPrefix}commercials.html#camera-wizard" class="btn btn-secondary" style="padding: 10px 20px; font-size: 0.85rem; border-color: var(--accent-green); color: var(--accent-green);">
          Check Camera Compatibility
          <span class="btn-subtext">Free Instant Wizard</span>
        </a>
        <button class="mobile-nav-toggle" id="mobile-toggle" aria-label="Toggle Menu" aria-expanded="false" aria-controls="nav-menu">
          <span style="font-size: 24px;">☰</span>
        </button>
      </div>
    </header>
  `;
  document.body.insertAdjacentHTML('afterbegin', headerHtml);

  // Highlight active link
  highlightActiveLink(currentPath);

  // B. INJECT FOOTER (append to body)
  const footerHtml = `
    <footer class="site-footer">
      <div class="container" style="padding: 0; display: grid; grid-template-columns: 1.5fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 60px;">
        <div style="display: flex; flex-direction: column; gap: 20px;">
          <a href="${rootPrefix}index.html" class="logo-link">
            <div class="logo-icon">S</div>
            <div class="logo-text">SCENVIZ<span>.</span></div>
          </a>
          <p style="color: var(--text-secondary); font-size: 0.9rem; max-width: 280px;">
            Bangladesh's premier industrial computer vision & floor automation intelligence provider. Edge-AI deployed.
          </p>
          <p style="font-size: 0.8rem; color: var(--accent-green); font-weight: 600;">
            <i class="dot" style="display:inline-block; width:8px; height:8px; background:var(--accent-green); border-radius:50%; margin-right:6px; box-shadow: 0 0 8px var(--accent-green)"></i>
            Dhaka & Chittagong Engineering Depots Active
          </p>
        </div>
        <div>
          <h4 style="font-size: 1.05rem; margin-bottom: 20px;">Capabilities</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 0.9rem; color: var(--text-secondary);">
            <li><a href="${rootPrefix}capabilities/visual-inspection.html" style="hover:color:var(--accent-green)">Visual Defect Inspection</a></li>
            <li><a href="${rootPrefix}capabilities/compliance-evidence.html" style="hover:color:var(--accent-green)">Compliance Evidence Logs</a></li>
            <li><a href="${rootPrefix}capabilities/floor-intelligence.html" style="hover:color:var(--accent-green)">Floor Analytics</a></li>
          </ul>
        </div>
        <div>
          <h4 style="font-size: 1.05rem; margin-bottom: 20px;">Local Trust</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 0.9rem; color: var(--text-secondary);">
            <li><a href="${rootPrefix}support-sla.html" style="hover:color:var(--accent-green)">Zone SLAs & Support Map</a></li>
            <li><a href="${rootPrefix}commercials.html" style="hover:color:var(--accent-green)">Capex & AMC Models</a></li>
            <li><a href="${rootPrefix}library.html" style="hover:color:var(--accent-green)">Technical Whitepapers</a></li>
          </ul>
        </div>
        <div>
          <h4 style="font-size: 1.05rem; margin-bottom: 20px;">Contact Support</h4>
          <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px; font-size: 0.9rem; color: var(--text-secondary);">
            <li>Dhaka Office: Gulshan-2, Dhaka</li>
            <li>Gazipur Depot: Board Bazar, Gazipur</li>
            <li>Chittagong Depot: CEPZ, Chittagong</li>
            <li>Phone: +880 1712-345678</li>
          </ul>
        </div>
      </div>
      <div class="container" style="padding: 30px 0 0 0; border-top: 1px solid var(--border-color); display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; color: var(--text-muted);">
        <p>&copy; ${new Date().getFullYear()} Scenviz Technologies. All Rights Reserved. Made in Bangladesh.</p>
        <div style="display: flex; gap: 24px;">
          <a href="${rootPrefix}privacy-data-custody.html">Local Data Custody Policy</a>
          <a href="${rootPrefix}support-sla.html#guarantee">30-Day Guarantee Terms</a>
        </div>
      </div>
    </footer>
  `;
  document.body.insertAdjacentHTML('beforeend', footerHtml);

  // C. INJECT WHATSAPP FLOATING BUTTON (FAB)
  const whatsappFabHtml = `
    <a href="https://wa.me/8801712345678?text=Hello%20Scenviz%20Technologies" class="whatsapp-fab" id="whatsapp-fab" target="_blank" rel="noopener noreferrer">
      <span style="font-family: inherit; font-size: 24px;">💬</span>
      <span class="whatsapp-fab-tooltip">Connect with Systems Engineer</span>
    </a>
  `;
  document.body.insertAdjacentHTML('beforeend', whatsappFabHtml);

  // D. INJECT MOBILE STICKY BAR
  const mobileStickyHtml = `
    <div class="mobile-sticky-bar">
      <div class="mobile-sticky-grid">
        <a href="tel:+8801712345678" class="mobile-sticky-btn mobile-sticky-call">
          <span style="font-size: 16px; margin-bottom: 2px;">📞</span>
          <span>Call 24/7 SLA Line</span>
        </a>
        <a href="https://wa.me/8801712345678?text=Hello%20Scenviz%20Technologies" class="mobile-sticky-btn mobile-sticky-whatsapp" id="whatsapp-sticky" target="_blank" rel="noopener noreferrer">
          <span style="font-size: 16px; margin-bottom: 2px;">💬</span>
          <span>WhatsApp Assessment</span>
        </a>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', mobileStickyHtml);
}

/**
 * 2. Highlight active navigation items
 */
function highlightActiveLink(path) {
  const supportLink = document.getElementById('nav-support');
  const libraryLink = document.getElementById('nav-library');
  const commercialsLink = document.getElementById('nav-commercials');
  const capabilitiesLink = document.getElementById('nav-capabilities');
  const deploymentsLink = document.getElementById('nav-deployments');

  if (path.includes('support-sla')) {
    supportLink?.classList.add('active');
  } else if (path.includes('library')) {
    libraryLink?.classList.add('active');
  } else if (path.includes('commercials')) {
    commercialsLink?.classList.add('active');
  } else if (path.includes('deployments')) {
    deploymentsLink?.classList.add('active');
  } else if (path.includes('/capabilities/')) {
    capabilitiesLink?.classList.add('active');
  }
}

/**
 * 3. Mobile Navigation Menu Toggle Setup
 */
function setupMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  
  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      if (isVisible) {
        navMenu.style.display = 'none';
        toggleBtn.innerHTML = '☰';
        toggleBtn.setAttribute('aria-expanded', 'false');
      } else {
        navMenu.style.display = 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = 'var(--bg-secondary)';
        navMenu.style.padding = '20px';
        navMenu.style.borderBottom = '1px solid var(--border-color)';
        toggleBtn.innerHTML = '✕';
        toggleBtn.setAttribute('aria-expanded', 'true');
      }
    });
  }
}

/**
 * 4. Header scroll styling effects
 */
function setupScrollEffects() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header?.classList.add('header-scrolled');
    } else {
      header?.classList.remove('header-scrolled');
    }
  }, { passive: true });
}

/**
 * 5. Dynamic WhatsApp Message Pre-Population
 */
function setupWhatsAppTracking() {
  const fab = document.getElementById('whatsapp-fab');
  const sticky = document.getElementById('whatsapp-sticky');
  
  const currentPath = window.location.pathname;
  let customMessage = "Hello Scenviz Technologies, I would like to schedule a technical readiness assessment for our factory floor.";

  if (currentPath.includes('compliance-evidence')) {
    customMessage = "Hello Scenviz, I am looking to automate our BSCI/Accord compliance evidence reporting and would like to schedule a feasibility walkthrough.";
  } else if (currentPath.includes('visual-inspection')) {
    customMessage = "Hello Scenviz, I want to verify if our existing security cameras are compatible with your automated visual defect detection software.";
  } else if (currentPath.includes('floor-intelligence')) {
    customMessage = "Hello Scenviz, I am interested in cycle-time tracking and legacy MES/SCADA integration for our manufacturing facility in Bangladesh.";
  } else if (currentPath.includes('support-sla')) {
    customMessage = "Hello Scenviz, I am reading about your 30-Day Accuracy Guarantee and 24/7 on-site engineering SLA. I'd like to get in touch with an engineer.";
  } else if (currentPath.includes('commercials')) {
    customMessage = "Hello Scenviz, I would like to receive details about your localized Capex + AMC commercial models for visual inspection integration.";
  }

  const encodedMsg = encodeURIComponent(customMessage);
  const waUrl = `https://wa.me/8801712345678?text=${encodedMsg}`;

  if (fab) fab.href = waUrl;
  if (sticky) sticky.href = waUrl;
}

/**
 * 6. Setup FAQ Accordion Toggles
 */
function setupFaqAccordions() {
  const questions = document.querySelectorAll('.faq-question');
  
  questions.forEach(question => {
    question.addEventListener('click', () => {
      const item = question.parentElement;
      const answer = question.nextElementSibling;
      
      // Close other open items
      document.querySelectorAll('.faq-item').forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-answer').style.maxHeight = null;
        }
      });
      
      // Toggle current item
      const isActive = item.classList.contains('active');
      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = null;
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}
