import { Project } from "@/lib/types";

export const projects: Project[] = [
  {
    id: "identity-verification",
    title: "Identity Verification Agent",
    description:
      "An autonomous AI agent that orchestrates multi-step identity vetting protocols using zero-knowledge proofs.",
    tags: ["LangGraph", "OAuth 2.0", "Python", "Azure AI"],
    imageGradient: "from-blue-950 via-indigo-900 to-slate-900",
    githubUrl: "#",
    featured: true,
    status: "completed",
    year: 2024,
    summary: {
      problem: "Multi-step identity vetting was fragmented, slow, and error-prone in fintech.",
      solution: "Built an autonomous multi-agent system with LangGraph for stateful orchestration and risk scoring.",
      tech: "LangGraph, OAuth 2.0, Azure AI, Python",
      keyLearning: "State persistence in long-running agentic workflows requires careful checkpointing strategies.",
    },
  },
  {
    id: "semantic-kernel",
    title: "Semantic Kernel Fine-Tuner",
    description:
      "Tooling for efficient parameter fine-tuning of small language models for domain-specific edge computing.",
    tags: ["PyTorch", "LoRA", "Semantic Kernel", "QLoRA"],
    imageGradient: "from-purple-950 via-violet-900 to-indigo-950",
    githubUrl: "#",
    featured: true,
    status: "completed",
    year: 2024,
    summary: {
      problem: "General LLMs are too large and expensive for low-latency edge deployment.",
      solution: "Built LoRA/QLoRA fine-tuning tooling integrated with Microsoft Semantic Kernel.",
      tech: "PyTorch, LoRA, QLoRA, Semantic Kernel",
      keyLearning: "QLoRA achieves ~95% of full fine-tuning quality at 25% compute cost.",
    },
  },
  {
    id: "vein-detection",
    title: "Vein Detection System",
    description:
      "Deep learning pipeline for non-invasive vein detection using near-infrared imaging and segmentation.",
    tags: ["Python", "OpenCV", "TensorFlow", "Medical AI"],
    imageGradient: "from-teal-950 via-cyan-900 to-slate-900",
    githubUrl: "#",
    featured: false,
    status: "completed",
    year: 2024,
    summary: {
      problem: "IV insertions fail ~40% of the time due to poor vein visibility under the skin.",
      solution: "Built a CV pipeline using NIR imaging and U-Net segmentation for real-time vein mapping.",
      tech: "OpenCV, TensorFlow, NIR imaging, U-Net",
      keyLearning: "Domain-specific preprocessing dramatically outperforms generic data augmentation.",
    },
  },
  {
    id: "heart-failure",
    title: "Heart Failure Prediction",
    description:
      "Ensemble model achieving 90.5% CV score for heart failure risk prediction with clinical tabular data.",
    tags: ["Python", "XGBoost", "LGBM", "Healthcare"],
    imageGradient: "from-rose-950 via-red-900 to-slate-900",
    githubUrl: "#",
    featured: false,
    status: "completed",
    year: 2024,
    summary: {
      problem: "Early heart failure detection requires combining multiple weak clinical signals.",
      solution: "Trained a stacked ensemble (XGBoost + LGBM) with advanced feature engineering.",
      tech: "XGBoost, LGBM, Scikit-learn, Pandas",
      keyLearning: "Feature engineering contributed more to performance gains than model selection.",
    },
  },
];
