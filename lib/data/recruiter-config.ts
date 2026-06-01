import { RecruiterRole } from "@/lib/types";

export const recruiterRoles: RecruiterRole[] = [
  {
    id: "ai-engineer",
    label: "AI Engineer",
    icon: "psychology",
    headline: "Agentic workflows · LLM fine-tuning · Enterprise AI",
    description:
      "Specialized in architecting multi-agent systems and fine-tuning large language models. Bridges raw compute and autonomous decision-making using LangGraph, Groq, and Semantic Kernel.",
    projectIds: ["identity-verification", "semantic-kernel"],
    skillIds: ["python", "pytorch", "langchain", "vectordbs"],
    primaryColor: "primary",
    tags: ["LANGGRAPH", "GROQ", "LORA", "QLORA", "AZURE AI", "HUGGING FACE"],
    insightQA: [
      {
        question: "How do you handle state management in multi-agent systems?",
        answer:
          "I use LangGraph's persistent state mechanism — it lets agents pause, reflect, and resume with full context, keeping long-running workflows robust under partial failures.",
      },
      {
        question: "Your approach to fine-tuning for specific domains?",
        answer:
          "LoRA/QLoRA for efficiency. I focus on high-quality synthetic data generation and evaluate strictly with RAGas and task-specific benchmarks before deployment.",
      },
    ],
  },
  {
    id: "data-scientist",
    label: "Data Scientist",
    icon: "database",
    headline: "Predictive modeling · Feature engineering · Data pipelines",
    description:
      "Transforms high-dimensional noise into actionable signals. Specializes in predictive modeling, time-series forecasting, and idempotent data pipelines for autonomous decision systems.",
    projectIds: ["heart-failure", "vein-detection"],
    skillIds: ["pandas", "numpy", "sklearn", "sql"],
    primaryColor: "secondary",
    tags: ["FASTAPI", "SPARK", "DVC", "TABLEAU", "DOCKER", "POSTGRESQL"],
    insightQA: [
      {
        question: "How do you approach data quality issues in production?",
        answer:
          "I build idempotent pipelines with Isolation Forest outlier detection. Null imputation strategy is chosen based on missingness mechanism — MCAR, MAR, or MNAR.",
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
    label: "ML Researcher",
    icon: "science",
    headline: "Computer vision · Efficient fine-tuning · Research-to-production",
    description:
      "Focuses on practical applications at the intersection of CV and NLP. Interested in bridging research-to-production gaps through efficient training methods like LoRA and U-Net architectures.",
    projectIds: ["vein-detection", "semantic-kernel"],
    skillIds: ["pytorch-vision", "opencv", "transformers", "cuda"],
    primaryColor: "tertiary",
    tags: ["LORA", "RLHF", "U-NET", "DIFFUSION MODELS", "CLIP", "ATTENTION"],
    insightQA: [
      {
        question: "How do you stay current with ML research?",
        answer:
          "I track Arxiv daily, prioritizing papers with reproducible code. I immediately test promising methods on current projects to validate real-world applicability.",
      },
      {
        question: "How do you approach computer vision pipeline design?",
        answer:
          "NIR imaging + U-Net segmentation for medical applications. Domain-specific preprocessing consistently outperforms generic augmentation in low-data regimes.",
      },
    ],
  },
];
