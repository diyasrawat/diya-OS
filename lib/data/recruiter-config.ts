import { RecruiterRole } from "@/lib/types";

export const recruiterRoles: RecruiterRole[] = [
  {
    id: "ai-engineer",
    title: "AI Engineer",
    icon: "psychology",
    description:
      "Specialized in architecting agentic workflows and fine-tuning large language models. Expertise bridges the gap between raw compute and autonomous decision-making systems, leveraging LangGraph and Semantic Kernel for robust enterprise-grade AI solutions.",
    coreSkills: [
      { category: "Language", name: "Python", percent: 95 },
      { category: "Framework", name: "PyTorch", percent: 88 },
      { category: "Orchestration", name: "LangChain", percent: 92 },
      { category: "Storage", name: "VectorDBs", percent: 85 },
    ],
    tags: ["LLMs", "Fine-Tuning", "RLHF", "Hugging Face", "Azure OpenAI", "Quantization"],
    matchedProjectIds: ["identity-verification", "semantic-kernel"],
    insightQA: [
      {
        question: "How do you handle state management in multi-agent systems?",
        answer:
          "I utilize LangGraph's persistent state mechanism. It allows agents to pause, reflect, and resume with full context, ensuring long-running workflows remain robust.",
      },
      {
        question: "Your approach to fine-tuning for specific domains?",
        answer:
          "I prefer LoRA/QLoRA for efficiency. The focus is always on high-quality synthetic data generation and strict evaluation benchmarks using RAGas.",
      },
    ],
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    icon: "database",
    description:
      "Expertise in transforming high-dimensional noise into actionable signals. Specializing in predictive modeling, complex time-series forecasting, and architecting data pipelines for autonomous decision-making systems.",
    coreSkills: [
      { category: "Library", name: "Pandas", percent: 95 },
      { category: "Numerical", name: "NumPy", percent: 88 },
      { category: "ML", name: "Scikit-learn", percent: 92 },
      { category: "Database", name: "SQL", percent: 85 },
    ],
    tags: ["PyTorch", "Tableau", "DVC", "Spark", "FastAPI", "PostgreSQL", "Docker"],
    matchedProjectIds: ["heart-failure", "vein-detection"],
    insightQA: [
      {
        question: "How do you approach data quality issues in production?",
        answer:
          "I build idempotent pipelines with Isolation Forest outlier detection. Null imputation strategy is always chosen based on missingness mechanism — MCAR, MAR, or MNAR.",
      },
      {
        question: "Preferred approach to feature engineering?",
        answer:
          "Domain-Driven Design to derive high-signal features — Target Encoding, polynomial generation, and PCA for dimensionality reduction in high-cardinality datasets.",
      },
    ],
  },
  {
    id: "ml-researcher",
    title: "ML Researcher",
    icon: "science",
    description:
      "Focused on advancing practical applications at the intersection of computer vision and natural language processing. Interested in efficient training methods and bridging research-to-production gaps.",
    coreSkills: [
      { category: "Framework", name: "PyTorch", percent: 90 },
      { category: "Vision", name: "OpenCV", percent: 85 },
      { category: "NLP", name: "Transformers", percent: 88 },
      { category: "Training", name: "CUDA", percent: 72 },
    ],
    tags: ["LoRA", "RLHF", "U-Net", "Diffusion Models", "CLIP", "Attention Mechanisms"],
    matchedProjectIds: ["vein-detection", "semantic-kernel"],
    insightQA: [
      {
        question: "How do you stay current with ML research?",
        answer:
          "I track Arxiv daily, focusing on practical methods with reproducible code. I immediately test promising techniques on my current projects to validate real-world applicability.",
      },
    ],
  },
];
