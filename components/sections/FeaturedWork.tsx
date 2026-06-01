"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data/projects";
import { useDiyaAI } from "@/hooks/useDiyaAI";
import { Project } from "@/lib/types";

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const { selectProject } = useDiyaAI();

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ delay: index * 0.12, duration: 0.5 }}
      onClick={() => selectProject(project)}
      className="group cursor-pointer"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-2xl glass-panel mb-6 aspect-video">
        <div
          className={`w-full h-full bg-gradient-to-br ${project.imageGradient} opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#131315]/80 to-transparent" />
        <div className="absolute bottom-6 left-6 flex gap-3 flex-wrap">
          {project.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-4 py-1 rounded-full bg-surface-container-highest/60 backdrop-blur-md text-xs font-mono uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* Diya AI hint */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-xs font-mono">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              smart_toy
            </span>
            Ask Diya AI
          </span>
        </div>
      </div>

      <h3 className="font-headline-lg text-headline-lg text-on-surface group-hover:text-primary transition-colors">
        {project.title}
      </h3>
      <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-md">
        {project.description}
      </p>
    </motion.div>
  );
}

export default function FeaturedWork() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className="mb-40 px-6 md:px-margin-desktop" id="projects">
      <h2 className="font-headline-xl text-headline-xl text-on-surface mb-2">
        Featured Work
      </h2>
      <p className="text-primary font-label-md text-label-md flex items-center gap-2 mb-12">
        Click any project to ask Diya AI
        <span className="material-symbols-outlined text-sm">arrow_forward</span>
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {featured.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
