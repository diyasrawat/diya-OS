import { TimelineEvent } from "@/lib/types";

export const timeline: TimelineEvent[] = [
  {
    id: "btech",
    date: "Aug 2022",
    title: "B.Tech — AI & Data Science",
    description:
      "Enrolled in undergraduate program with specialisation in machine learning, deep learning, and intelligent systems design.",
    category: "education",
    color: "primary",
  },
  {
    id: "cloudy-ml",
    date: "Aug 2023",
    title: "Cloudy ML Hackathon",
    description:
      "Competed in a cloud-focused ML hackathon, delivering an end-to-end model pipeline from ingestion to inference under 48 hours.",
    category: "hackathon",
    color: "secondary",
  },
  {
    id: "iit-hackathon",
    date: "Nov 2023",
    title: "IIT Kharagpur Hackathon — Finalist",
    description:
      "Reached the final round of the inter-college AI/ML hackathon hosted at IIT Kharagpur.",
    category: "hackathon",
    color: "tertiary",
  },
  {
    id: "heart-failure",
    date: "Dec 2023",
    title: "90.5% CV Score — Heart Failure Prediction",
    description:
      "Best-in-class ensemble model (XGBoost + LGBM) performance on clinical tabular data; top result in departmental ML competition.",
    category: "award",
    color: "primary",
  },
  {
    id: "aws-cert",
    date: "Jan 2024",
    title: "AWS Machine Learning Specialty",
    description:
      "Completed the AWS ML Specialty professional certification, covering SageMaker, data engineering, and ML workload deployment.",
    category: "certification",
    color: "secondary",
    link: "https://aws.amazon.com/certification/certified-machine-learning-specialty/",
  },
  {
    id: "hackindia",
    date: "Mar 2024",
    title: "HackIndia — 1st Place",
    description:
      "Won first place with an AI-driven agricultural predictive model that forecast crop yield variance using satellite and soil data.",
    category: "hackathon",
    color: "primary",
  },
  {
    id: "vein-showcase",
    date: "May 2024",
    title: "Vein Detection Research Showcase",
    description:
      "NIR-based vein detection CV pipeline selected for departmental research showcase; presented to faculty and industry panel.",
    category: "milestone",
    color: "tertiary",
  },
];
