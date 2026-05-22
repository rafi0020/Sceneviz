/**
 * Single source of truth for deployment carousel slides.
 * Update here — index + deployments pages stay in sync.
 */
const IMG_BASE = `${import.meta.env.BASE_URL}images/`;

export const DEPLOYMENT_SLIDES = [
  {
    tag: 'Access & Attendance',
    title: 'Facial Attendance & Access Control Suite',
    image: `${IMG_BASE}surveillance_dashboard.png`,
    alt: 'Centralized facial recognition, attendance tracking, and unauthorized access alerts',
  },
  {
    tag: 'Flow Analytics',
    title: 'Footfall & Crowd Density Heatmapping',
    image: `${IMG_BASE}crowd_depth.png`,
    alt: 'Real-time footfall counting and regional density heatmaps',
  },
  {
    tag: 'Safety & Anomalies',
    title: 'Perimeter Intrusion & Behavioral Alerts',
    image: `${IMG_BASE}safety_skeleton.png`,
    alt: 'Edge-AI perimeter intrusion, threat objects, and anomaly detection dashboard',
  },
  {
    tag: 'Vehicle & Traffic',
    title: 'Vehicle Analytics & ANPR Systems',
    image: `${IMG_BASE}container_ocr.png`,
    alt: 'Automatic number plate recognition, vehicle tracking, and overspeed HUD',
  },
  {
    tag: 'Floor Compliance',
    title: 'PPE Compliance Monitoring',
    image: `${IMG_BASE}multi_hazard_safety.png`,
    alt: 'Industrial PPE compliance monitoring with zero false alarms',
  },
  {
    tag: 'Quality & Agriculture',
    title: 'Visual Counterfeit & Agricultural Quality Control',
    image: `${IMG_BASE}compliance_mockup.png`,
    alt: 'Visual counterfeit checks and tobacco leaf bale moisture/layer inspection',
  },
  {
    tag: 'Motorcycle Intelligence',
    title: 'Honda & Rider Model Detection',
    image: `${IMG_BASE}honda_detection.png`,
    alt: 'Edge AI motorcycle detection and rider model verification at factory gates',
  },
  {
    tag: 'Staircase Safety',
    title: 'Staircase Compliance & Railing Usage Tracking',
    image: `${IMG_BASE}stairs_safety.png`,
    alt: 'Staircase safety monitoring with handrail holding and phone usage alerts',
  },
];
