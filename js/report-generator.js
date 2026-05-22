/* ==========================================================================
   SCENVIZ TECHNOLOGIES - Compliance Audit-Ready Mock Report Builder
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const selectStandard = document.getElementById('report-standard');
  const generateBtn = document.getElementById('generate-report-btn');
  const previewPanel = document.getElementById('report-preview');
  
  if (!selectStandard || !generateBtn || !previewPanel) return;
  
  // Data for each standard mapping
  const reportData = {
    'bsci': {
      title: 'Amfori BSCI Compliance Audit Log',
      subtitle: 'Mapping: Occupational Health & Safety (Chapter 7)',
      headers: ['Timestamp', 'Line ID', 'Metric Monitored', 'Auditor Reference', 'Verification Status'],
      rows: [
        ['12:44:10', 'RMG Line 04', 'Operator PPE Compliance', 'BSCI-OHS-7.1', 'PASSED'],
        ['12:44:15', 'RMG Line 08', 'Fire Escape Clearance', 'BSCI-OHS-7.3', 'PASSED'],
        ['12:44:18', 'Loading Dock B', 'Access Route Obstruction', 'BSCI-OHS-7.2', 'FLAGGED - Cleaned in 3m'],
        ['12:44:22', 'RMG Line 02', 'Operator PPE Compliance', 'BSCI-OHS-7.1', 'PASSED'],
        ['12:44:30', 'Pharma Area A', 'Air quality check', 'BSCI-OHS-7.4', 'PASSED']
      ]
    },
    'wrap': {
      title: 'WRAP Principle 5 Compliance Audit Log',
      subtitle: 'Mapping: Health and Safety Compliance',
      headers: ['Timestamp', 'Floor Zone', 'Safety Objective', 'WRAP Criteria', 'Inference Status'],
      rows: [
        ['12:44:02', 'Sewing Floor Zone A', 'Aisle Width Clearance', 'WRAP-P5-5.1', 'PASSED'],
        ['12:44:05', 'Packing Zone B', 'Emergency Exit Access', 'WRAP-P5-5.2', 'PASSED'],
        ['12:44:11', 'Sewing Floor Zone B', 'Mask / PPE Wearing', 'WRAP-P5-5.4', 'PASSED'],
        ['12:44:20', 'Raw Storage Dock', 'Hazardous Height Clearance', 'WRAP-P5-5.8', 'FLAGGED - Safe in 12s'],
        ['12:44:28', 'Packing Zone A', 'Ergonomic Line Clearance', 'WRAP-P5-5.3', 'PASSED']
      ]
    },
    'accord': {
      title: 'RSC / Accord Safety Standards Audit Log',
      subtitle: 'Mapping: Fire and Structural Building Safety',
      headers: ['Timestamp', 'RSC Section ID', 'Location Path', 'Camera Stream', 'Audit Verification'],
      rows: [
        ['12:44:03', 'RSC-FIRE-3.1', 'Primary Exit Stair A', 'CAM-ST-01', 'PASSED'],
        ['12:44:09', 'RSC-STRUC-4.2', 'Columns Support Area C', 'CAM-COL-08', 'PASSED'],
        ['12:44:12', 'RSC-FIRE-3.2', 'Emergency Exit Stair B', 'CAM-ST-02', 'PASSED'],
        ['12:44:19', 'RSC-ELEC-2.1', 'Electrical DB Room B', 'CAM-EL-04', 'FLAGGED - Route Clear'],
        ['12:44:26', 'RSC-FIRE-3.1', 'Primary Exit Stair A', 'CAM-ST-01', 'PASSED']
      ]
    }
  };
  
  // Set default view on load
  updateReportPreview('bsci');
  
  selectStandard.addEventListener('change', () => {
    updateReportPreview(selectStandard.value);
  });
  
  generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const standard = selectStandard.value;
    updateReportPreview(standard);
    
    // Simulate generation delay
    const originalText = generateBtn.innerHTML;
    generateBtn.disabled = true;
    generateBtn.innerHTML = `<span style="padding: 14px 28px; font-weight:700;">Generating B2B Audit Package...</span>`;
    
    setTimeout(() => {
      generateBtn.disabled = false;
      generateBtn.innerHTML = originalText;
      alert(`Verification Successful!\n\nMock PDF & CSV Compliance Package generated under reference #SC-${standard.toUpperCase()}-2026.\nThis package contains verified edge hashes and timestamped optical proof ready for international auditor download.`);
    }, 1500);
  });
  
  function updateReportPreview(std) {
    const data = reportData[std];
    if (!data) return;
    
    let tableHeadersHtml = '';
    data.headers.forEach(h => {
      tableHeadersHtml += `<th>${h}</th>`;
    });
    
    let tableRowsHtml = '';
    data.rows.forEach(r => {
      const isFlagged = r[4].includes('FLAGGED');
      const badgeClass = isFlagged ? 'status-flagged' : 'status-passed';
      
      tableRowsHtml += `
        <tr>
          <td style="color:var(--text-secondary);">${r[0]}</td>
          <td style="font-weight:600;">${r[1]}</td>
          <td>${r[2]}</td>
          <td><code style="background:var(--bg-tertiary); padding: 2px 6px; border-radius:4px; font-size:0.8rem; border:1px solid var(--border-color); color:var(--text-secondary);">${r[3]}</code></td>
          <td><span class="status-badge ${badgeClass}">${r[4]}</span></td>
        </tr>
      `;
    });
    
    const previewHtml = `
      <div class="report-preview-header">
        <h3 style="color: var(--accent-green); margin-bottom: 4px; font-size:1.35rem;">${data.title}</h3>
        <p style="font-size: 0.85rem; color: var(--text-secondary); font-weight:500;">${data.subtitle}</p>
      </div>
      <div style="font-size: 0.8rem; color: var(--text-muted); display:flex; justify-content:space-between; margin-bottom: 16px;">
        <span>Generated: 2026-05-22 | Floor Live Inference Active</span>
        <span>Local edge-AI hash: md5-x912a78</span>
      </div>
      <div style="overflow-x: auto;">
        <table class="report-preview-table" style="width:100%;">
          <thead>
            <tr>${tableHeadersHtml}</tr>
          </thead>
          <tbody>
            ${tableRowsHtml}
          </tbody>
        </table>
      </div>
      <div style="margin-top:auto; padding-top:20px; font-size: 0.78rem; color: var(--text-muted); border-top: 1px solid var(--border-color); display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:10px;">
        <span>Verification Type: Optical Bounding Box Validation</span>
        <span style="color: var(--accent-green); font-weight:600;">100% Auditor Ready (Accord/BSCI/WRAP compliant)</span>
      </div>
    `;
    
    previewPanel.innerHTML = previewHtml;
  }
});
