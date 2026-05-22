/**
 * Single source of truth for deployment carousel slides.
 * Update here — index + deployments pages stay in sync.
 */
const IMG_BASE = `${import.meta.env.BASE_URL}images/`;

export const DEPLOYMENT_SLIDES = [
  {
    tag: 'Safety & Compliance',
    title: '344-Camera Fleet Surveillance',
    image: `${IMG_BASE}surveillance_dashboard.png`,
    alt: 'Multi-branch AI surveillance dashboard',
  },
  {
    tag: 'Audit Automation',
    title: '21-Assertion Compliance Audit',
    image: `${IMG_BASE}compliance_mockup.png`,
    alt: 'Manufacturing SOP compliance dashboard',
  },
  {
    tag: 'Logistics & OCR',
    title: 'Container Code Recognition',
    image: `${IMG_BASE}container_ocr.png`,
    alt: 'Chittagong port container OCR',
  },
  {
    tag: 'Packaging QA',
    title: 'Label & Barcode Verification',
    image: `${IMG_BASE}packaging_inspection.png`,
    alt: 'Barcode and label verification',
  },
  {
    tag: 'Worker Safety',
    title: 'Pose-Based Fall Risk Detection',
    image: `${IMG_BASE}safety_skeleton.png`,
    alt: 'Pose compliance safety tracking',
  },
  {
    tag: 'Brand Protection',
    title: 'Counterfeit Signature Checker',
    image: `${IMG_BASE}counterfeit_detection.png`,
    alt: 'Counterfeit packaging detection',
  },
  {
    tag: 'Crowd Analytics',
    title: 'Spatial 3D Density Heatmap',
    image: `${IMG_BASE}crowd_depth.png`,
    alt: '3D crowd density tracking',
  },
  {
    tag: 'Multi-Hazard',
    title: 'PPE & Overspeed Monitor',
    image: `${IMG_BASE}multi_hazard_safety.png`,
    alt: 'Multi-hazard warehouse safety HUD',
  },
  {
    tag: 'Surface Inspection',
    title: '800m/min Web Defect Scanner',
    image: `${IMG_BASE}hero_visual.png`,
    alt: 'Line scan surface inspection',
  },
  {
    tag: 'Tamper Detection',
    title: 'Visual Integrity Audit Proof',
    image: `${IMG_BASE}tamper_detection.png`,
    alt: 'Surveillance vault tamper detection',
  },
];
