import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "vein-detection",
    title: "Vein Detection System",
    description:
      "Deep learning pipeline for non-invasive vein detection using near-infrared imaging and image segmentation.",
    tags: ["Python", "OpenCV", "TensorFlow", "Medical AI"],
    githubUrl: "#",
    featured: true,
    status: "completed",
    year: 2024,
  },
  {
    id: "cloudy-ml",
    title: "Cloudy ML Hackathon",
    description:
      "End-to-end ML solution built during a cloud-focused hackathon, covering data ingestion, model training, and serving.",
    tags: ["Python", "Scikit-learn", "Cloud", "MLOps"],
    githubUrl: "#",
    featured: true,
    status: "completed",
    year: 2024,
  },
  {
    id: "heart-failure-prediction",
    title: "Heart Failure Prediction",
    description:
      "Ensemble model achieving 90.5% CV score for heart failure risk prediction with clinical tabular data.",
    tags: ["Python", "XGBoost", "EDA", "Healthcare"],
    githubUrl: "#",
    featured: true,
    status: "completed",
    year: 2024,
  },
  {
    id: "multiclass-classification",
    title: "Multiclass Classification Study",
    description:
      "Comparative study of multiclass classification algorithms on benchmark datasets with performance analysis.",
    tags: ["Python", "Scikit-learn", "Jupyter", "ML"],
    githubUrl: "#",
    featured: false,
    status: "completed",
    year: 2024,
  },
];
