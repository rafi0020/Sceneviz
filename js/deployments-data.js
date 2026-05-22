/**
 * Single source of truth for deployment carousel slides.
 * Update here — index + deployments pages stay in sync.
 */
const IMG_BASE = `${import.meta.env.BASE_URL}images/`;

export const DEPLOYMENT_SLIDES = [
  {
    tag: 'Safety & Compliance',
    title: 'Facial Attendance (Entry/Exit)',
    image: `${IMG_BASE}facial_attendance.png`,
    alt: 'High-throughput B2B biometric entry terminal camera feed',
  },
  {
    tag: 'Zone Security',
    title: 'Facial Recognition (Inner Movement)',
    image: `${IMG_BASE}facial_recognition_movement.png`,
    alt: 'Internal cleanroom employee zone movement tracking HUD',
  },
  {
    tag: 'Access Control',
    title: 'Facial Recognition (Access Alerts)',
    image: `${IMG_BASE}facial_recognition_access.png`,
    alt: 'High-security server room unauthorized access interlock alerts',
  },
  {
    tag: 'Operations & Retail',
    title: 'Footfall & People Counting',
    image: `${IMG_BASE}footfall_counting.png`,
    alt: 'Overhead bidirectional entry and exit tripwire crossing counters',
  },
  {
    tag: 'Crowd Analytics',
    title: 'Crowd Density Heatmapping',
    image: `${IMG_BASE}crowd_depth.png`,
    alt: 'Assembly floor 3D depth-calibrated crowd density heatmaps',
  },
  {
    tag: 'Perimeter Defense',
    title: 'Perimeter Intrusion Detection',
    image: `${IMG_BASE}perimeter_intrusion.png`,
    alt: 'Thermal infrared camera fence intrusion detection line-cross alert',
  },
  {
    tag: 'Worker Safety',
    title: 'Behavioral Anomaly (Lying on Floor)',
    image: `${IMG_BASE}behavioral_anomaly.png`,
    alt: 'Warehouse worker down skeleton joint tracking warning system',
  },
  {
    tag: 'Action Recognition',
    title: 'Violence & Action Recognition',
    image: `${IMG_BASE}violence_recognition.png`,
    alt: 'SOP deviation thrown object trajectory vector analysis',
  },
  {
    tag: 'Threat Intelligence',
    title: 'Threat Object Detection',
    image: `${IMG_BASE}threat_object_detection.png`,
    alt: 'Security gate stick, helmet, and mask scanning classification',
  },
  {
    tag: 'Logistics Safety',
    title: 'Overspeed Detection Radar',
    image: `${IMG_BASE}overspeed_detection.png`,
    alt: 'Internal forklift homography speed radar calibration HUD',
  },
  {
    tag: 'Collision Avoidance',
    title: 'Vehicle-Human Collision Alert',
    image: `${IMG_BASE}vehicle_human_collision.png`,
    alt: 'Forklift proximity hazard warning interlock interface',
  },
  {
    tag: 'Site Security',
    title: 'Illegal Activities (Vandalism Alert)',
    image: `${IMG_BASE}illegal_activities.png`,
    alt: 'Restricted machinery vandalism unauthorized tool detection feed',
  },
  {
    tag: 'Yard Logistics',
    title: 'Multi-Class Vehicle Detection',
    image: `${IMG_BASE}vehicle_detection.png`,
    alt: 'Logistics dumper loader, truck, and van type classification',
  },
  {
    tag: 'Traffic Entry',
    title: 'Number Plate Localization',
    image: `${IMG_BASE}dashboard_mockup.png`,
    alt: 'Moving car license plate coordinate localization HUD',
  },
  {
    tag: 'Depot Logistics',
    title: 'ANPR Recognition System',
    image: `${IMG_BASE}container_ocr.png`,
    alt: 'Bangladeshi vehicle license plate character string OCR extraction',
  },
  {
    tag: 'Safety & Compliance',
    title: 'PPE Compliance Monitoring',
    image: `${IMG_BASE}multi_hazard_safety.png`,
    alt: 'Safety helmet, vest, and boots inspection verification overlay',
  },
  {
    tag: 'Brand Protection',
    title: 'Visual Counterfeit Detection',
    image: `${IMG_BASE}counterfeit_detection.png`,
    alt: 'Pharmaceutical carton microtext and security seal authenticator',
  },
  {
    tag: 'Raw Quality Control',
    title: 'Leaf Bale Moisture & Layer Check',
    image: `${IMG_BASE}leaf_bale_detection.png`,
    alt: 'NIR leaf bale moisture distribution penetrative analysis',
  },
  {
    tag: 'Traffic Logistics',
    title: 'Honda Motorcycle Detection',
    image: `${IMG_BASE}honda_detection.png`,
    alt: 'Rider helmet check and two-wheeler traffic count HUD',
  },
  {
    tag: 'Traffic Operations',
    title: 'Honda Model Identification',
    image: `${IMG_BASE}compliance_mockup.png`,
    alt: 'Courier motorcycle model and brand classification logs',
  },
  {
    tag: 'Stairs Safety',
    title: 'Stairs Compliance Detection',
    image: `${IMG_BASE}stairs_safety.png`,
    alt: 'Industrial stairway occupancy and pace tracking monitor',
  },
  {
    tag: 'Stairs Safety',
    title: 'Stairs Not Holding Rail Audit',
    image: `${IMG_BASE}safety_skeleton.png`,
    alt: 'Stair handrail skeletal distance vector compliance monitor',
  },
  {
    tag: 'Stairs Safety',
    title: 'Stairs Phone Used Detection',
    image: `${IMG_BASE}packaging_inspection.png`,
    alt: 'Distracted walking mobile screen facial connection monitoring',
  },
];
