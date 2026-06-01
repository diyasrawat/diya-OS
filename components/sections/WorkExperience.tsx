"use client";

import { motion } from "framer-motion";
import { workExperience, WorkEntry } from "@/lib/data/experience";

// ── Duration helper ───────────────────────────────────────────────────────────

const MONTHS = [
  "Jan","Feb","Mar","Apr","May","Jun",
  "Jul","Aug","Sep","Oct","Nov","Dec",
];

function parseMY(s: string): { m: number; y: number } {
  const [mon, yr] = s.split(" ");
  return { m: MONTHS.indexOf(mon), y: parseInt(yr, 10) };
}

function calcDuration(start: string, end: string, current: boolean): string {
  const s = parseMY(start);
  const now = new Date();
  const e = current
    ? { m: now.getMonth(), y: now.getFullYear() }
    : parseMY(end);
  const total = (e.y - s.y) * 12 + (e.m - s.m);
  if (total <= 0) return "< 1 month";
  if (total < 12)
    return `${total} month${total !== 1 ? "s" : ""}`;
  const yrs = Math.floor(total / 12);
  const mos = total % 12;
  const yLabel = `${yrs} year${yrs !== 1 ? "s" : ""}`;
  if (mos === 0) return yLabel;
  return `${yLabel} ${mos} month${mos !== 1 ? "s" : ""}`;
}

// ── Color map ─────────────────────────────────────────────────────────────────

const colorMap: Record<
  WorkEntry["color"],
  { dot: string; badge: string }
> = {
  primary: {
    dot: "bg-primary",
    badge: "bg-primary/10 text-primary border-primary/20",
  },
  secondary: {
    dot: "bg-secondary",
    badge: "bg-secondary/10 text-secondary border-secondary/20",
  },
  tertiary: {
    dot: "bg-[#c9c6c5]",
    badge: "bg-white/10 text-[#c9c6c5] border-white/10",
  },
};

// ── Entry ─────────────────────────────────────────────────────────────────────

function Entry({ entry, index }: { entry: WorkEntry; index: number }) {
  const c = colorMap[entry.color];
  const duration = calcDuration(entry.startDate, entry.endDate, entry.current);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="relative pl-10"
    >
      {/* Colored dot */}
      <div
        className={`absolute left-0 top-[14px] w-3 h-3 rounded-full ${c.dot} border-2 border-[#131315] z-10`}
      />
      {/* Pulse ring for current role */}
      {entry.current && (
        <div
          className={`absolute left-0 top-[14px] w-3 h-3 rounded-full ${c.dot} animate-ping opacity-25 z-10`}
        />
      )}

      {/* Card */}
      <div className="glass-panel rounded-2xl p-6 glow-hover transition-all">
        {/* Row 1: company + type badge */}
        <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
          <h3 className="font-headline-lg text-headline-lg text-on-surface leading-tight">
            {entry.company}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-[11px] font-mono border shrink-0 ${c.badge}`}
          >
            {entry.type}
          </span>
        </div>

        {/* Row 2: role title */}
        <p className="font-body-md text-body-md text-on-surface mb-1">
          {entry.role}
        </p>

        {/* Row 3: dates + duration */}
        <p className="text-[12px] text-on-surface-variant/60 font-mono mb-4">
          {entry.startDate} – {entry.endDate}&nbsp;&nbsp;·&nbsp;&nbsp;{duration}
        </p>

        {/* Description */}
        <p className="font-body-md text-body-md text-on-surface-variant mb-4">
          {entry.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-[11px] font-mono bg-white/5 border border-white/10 rounded-md text-on-surface-variant uppercase"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// ── Section ───────────────────────────────────────────────────────────────────

interface WorkExperienceProps {
  heading?: string;
}

export default function WorkExperience({ heading = "Work Experience" }: WorkExperienceProps) {
  return (
    <section className="mb-16 px-6 md:px-margin-desktop">
      <h2 className="font-headline-xl text-headline-xl text-on-surface mb-12">
        {heading}
      </h2>

      {/* Timeline container */}
      <div className="relative space-y-6">
        {/* Vertical line */}
        <div className="absolute left-[5px] top-5 bottom-5 w-px bg-white/10" />

        {workExperience.map((entry, i) => (
          <Entry key={entry.id} entry={entry} index={i} />
        ))}
      </div>
    </section>
  );
}
