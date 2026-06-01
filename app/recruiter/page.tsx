"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { RecruiterModeProvider, useRecruiterMode, RecruiterRoleId } from "@/hooks/useRecruiterMode";
import { recruiterRoles } from "@/lib/data/recruiter-config";
import { projects } from "@/lib/data/projects";
import Header from "@/components/layout/Header";

const roleIcons: Record<string, string> = {
  "ai-engineer": "psychology",
  "data-scientist": "database",
  "ml-researcher": "science",
};

const colorVarMap: Record<string, string> = {
  primary: "#adc6ff",
  secondary: "#d1bdf4",
  tertiary: "#c9c6c5",
};

function RecruiterDashboard() {
  const { activeRole, setActiveRole } = useRecruiterMode();
  const role = recruiterRoles.find((r) => r.id === activeRole)!;
  const matchedProjects = projects.filter((p) =>
    role.matchedProjectIds.includes(p.id)
  );

  return (
    <div className="flex min-h-screen bg-[#131315] pt-14">
      {/* Sidebar */}
      <aside className="fixed left-0 top-14 h-[calc(100vh-3.5rem)] w-64 bg-surface-container-low/50 backdrop-blur-2xl border-r border-white/10 flex flex-col z-40 hidden md:flex">
        <div className="px-4 py-6 shrink-0">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                account_circle
              </span>
            </div>
            <div>
              <div className="font-label-md text-label-md text-primary font-bold">
                Diya Rawat
              </div>
              <div className="text-[10px] text-on-surface-variant uppercase tracking-widest">
                Recruiter Dashboard
              </div>
            </div>
          </div>
          <div className="h-px w-full bg-white/5 my-4" />
          <div className="text-[11px] font-bold text-on-surface-variant uppercase tracking-widest px-2 mb-2">
            Candidate Roles
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {recruiterRoles.map((r) => (
            <button
              key={r.id}
              onClick={() => setActiveRole(r.id as RecruiterRoleId)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left ${
                activeRole === r.id
                  ? "bg-primary/10 text-primary border-r-4 border-primary"
                  : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
              }`}
            >
              <span
                className="material-symbols-outlined"
                style={
                  activeRole === r.id
                    ? { fontVariationSettings: "'FILL' 1" }
                    : undefined
                }
              >
                {roleIcons[r.id]}
              </span>
              <span className="font-label-md text-label-md">{r.title}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pb-8 px-4 space-y-1 shrink-0">
          <Link
            href="/#experience"
            className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-white/5 transition-all rounded-lg"
          >
            <span className="material-symbols-outlined">lan</span>
            <span className="font-label-md text-label-md">System Status</span>
          </Link>
          <Link
            href="mailto:diya@rawat.dev"
            className="mt-4 w-full bg-primary text-on-primary font-label-md text-label-md py-3 rounded-xl ai-pulse transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">mail</span>
            Contact Diya
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <main className="md:ml-64 flex-1 px-6 md:px-margin-desktop py-12 max-w-5xl">
        {/* Role header */}
        <motion.section
          key={activeRole}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-label-md text-label-md text-primary tracking-widest uppercase">
              System Profile: Active
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl md:text-display-lg text-on-surface mb-6">
            Candidate Persona:
            <br />
            <span className="text-primary">{role.title}</span>
          </h1>
          <p className="max-w-3xl font-body-lg text-body-lg text-on-surface-variant">
            {role.description}
          </p>
        </motion.section>

        {/* Bento grid */}
        <div className="grid grid-cols-12 gap-gutter mb-12">
          {/* Core competencies */}
          <motion.div
            key={`skills-${activeRole}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="col-span-12 lg:col-span-7 glass-panel-hover rounded-3xl p-8"
          >
            <div className="flex justify-between items-center mb-8">
              <h3 className="font-headline-lg text-headline-lg text-on-surface">
                Core Competencies
              </h3>
              <span className="material-symbols-outlined text-primary">analytics</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {role.coreSkills.map((skill) => (
                <div key={skill.name} className="flex flex-col gap-2">
                  <span className="text-[10px] uppercase tracking-tighter text-on-surface-variant">
                    {skill.category}
                  </span>
                  <span className="font-label-md text-label-md">{skill.name}</span>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.percent}%` }}
                      transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
                      className="h-full rounded-full bg-primary"
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap gap-3">
              {role.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-surface-container-highest rounded-full text-[12px] font-medium border border-white/5 text-on-surface-variant"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div
            key={`insights-${activeRole}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="col-span-12 lg:col-span-5 glass-panel-hover rounded-3xl p-8 flex flex-col"
          >
            <div className="flex items-center gap-2 mb-6">
              <span
                className="material-symbols-outlined text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                auto_awesome
              </span>
              <h3 className="font-headline-lg text-headline-lg text-on-surface">
                AI Insights
              </h3>
            </div>
            <div className="flex-1 space-y-6 overflow-y-auto">
              {role.insightQA.map((qa, i) => (
                <div key={i} className="flex flex-col gap-3">
                  <div className="self-end bg-surface-container-high px-4 py-3 rounded-2xl rounded-tr-none font-label-md text-label-md max-w-[85%] border border-white/5">
                    {qa.question}
                  </div>
                  <div className="self-start bg-primary/10 border border-primary/20 px-4 py-3 rounded-2xl rounded-tl-none font-label-md text-label-md max-w-[90%] text-primary">
                    &ldquo;{qa.answer}&rdquo;
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-white/5 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[12px] text-on-surface-variant font-medium">
                  Digital Twin Live
                </span>
              </div>
              <Link
                href="mailto:diya@rawat.dev"
                className="text-primary font-label-md text-label-md flex items-center gap-2 hover:underline"
              >
                Contact
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Link>
            </div>
          </motion.div>

          {/* Matched projects */}
          <div className="col-span-12 grid grid-cols-1 md:grid-cols-2 gap-gutter mt-4">
            {matchedProjects.map((project, i) => (
              <motion.div
                key={`${activeRole}-${project.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="glass-panel-hover rounded-3xl overflow-hidden group"
              >
                <div
                  className={`h-48 bg-gradient-to-br ${project.imageGradient} group-hover:scale-105 transition-transform duration-700 overflow-hidden`}
                />
                <div className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-headline-lg text-headline-lg">
                      {project.title}
                    </h4>
                    <a
                      href={project.githubUrl}
                      className="material-symbols-outlined text-primary-container hover:text-primary transition-colors"
                    >
                      open_in_new
                    </a>
                  </div>
                  <p className="text-on-surface-variant mb-6 font-body-md text-body-md">
                    {project.description}
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold px-3 py-1 bg-white/5 rounded border border-white/10 text-on-surface-variant uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center opacity-60 gap-4">
          <p className="font-label-md text-label-md text-on-surface-variant">
            © 2024 Diya Rawat. Powered by Diya.OS
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "System Logs"].map((l) => (
              <a
                key={l}
                href="#"
                className="text-on-surface-variant hover:text-primary transition-colors font-label-md text-label-md"
              >
                {l}
              </a>
            ))}
          </div>
        </footer>
      </main>
    </div>
  );
}

export default function RecruiterPage() {
  return (
    <RecruiterModeProvider>
      <Header variant="recruiter" />
      <RecruiterDashboard />
    </RecruiterModeProvider>
  );
}
