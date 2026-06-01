"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────

interface GitHubData {
  username: string;
  followers: number;
  publicRepos: number;
  totalStars: number;
  topLanguages: { name: string; percent: number }[];
  mostStarredRepo: { name: string; stars: number; url: string } | null;
  lastActive: string;
}

// ── Decorative contribution grid (always static) ──────────────────────────────

const GRID_COLS = 26;
const GRID_ROWS = 7;

function seededIntensity(idx: number): number {
  const h = ((idx * 1664525 + 1013904223) & 0xffffffff) >>> 0;
  return [0.04, 0.08, 0.15, 0.25, 0.4, 0.6, 0.8, 0.9][h % 8];
}

// ── Bar colors (cycle through the three accent values) ────────────────────────

const BAR_COLORS = ["#adc6ff", "#d1bdf4", "#c9c6c5", "#adc6ff", "#d1bdf4"];

// ── Skeleton helpers ──────────────────────────────────────────────────────────

function Skel({ className }: { className: string }) {
  return <div className={`bg-white/5 animate-pulse rounded ${className}`} />;
}

// ── Stat pill ─────────────────────────────────────────────────────────────────

function StatPill({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: number;
}) {
  return (
    <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-on-surface-variant">
      <span className="material-symbols-outlined text-primary" style={{ fontSize: "14px" }}>
        {icon}
      </span>
      <span className="text-on-surface font-medium">{value.toLocaleString()}</span>
      <span>{label}</span>
    </span>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function GitHubIntelligence() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/github")
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((d: GitHubData) => setData(d))
      .catch(() => {/* show skeletons-only fallback */})
      .finally(() => setLoading(false));
  }, []);

  const cells = useMemo(
    () =>
      Array.from({ length: GRID_COLS * GRID_ROWS }, (_, i) =>
        seededIntensity(i)
      ),
    []
  );

  const langs = data?.topLanguages ?? [];

  return (
    <section className="mb-40 px-6 md:px-margin-desktop overflow-hidden">
      <h2 className="font-headline-xl text-headline-xl text-on-surface mb-12">
        GitHub Intelligence
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* ── Left: activity + decorative grid ──────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="md:col-span-8 glass-panel rounded-2xl p-8 relative overflow-hidden"
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-primary font-label-md text-label-md mb-3">
                GITHUB ACTIVITY
              </p>

              {/* Stat pills row */}
              <AnimatePresence mode="wait">
                {loading ? (
                  <motion.div
                    key="skel"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex gap-2"
                  >
                    <Skel className="h-7 w-24 rounded-full" />
                    <Skel className="h-7 w-24 rounded-full" />
                    <Skel className="h-7 w-24 rounded-full" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="pills"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-wrap gap-2"
                  >
                    <StatPill icon="group" label="Followers" value={data?.followers ?? 0} />
                    <StatPill icon="folder" label="Repos" value={data?.publicRepos ?? 0} />
                    <StatPill icon="star" label="Stars" value={data?.totalStars ?? 0} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex gap-2 shrink-0">
              {loading ? (
                <>
                  <Skel className="h-6 w-12 rounded" />
                  <Skel className="h-6 w-20 rounded" />
                </>
              ) : (
                <>
                  <span className="px-2 py-1 rounded bg-white/5 text-xs text-on-surface-variant">
                    2024
                  </span>
                  {data?.lastActive && (
                    <span className="px-2 py-1 rounded bg-white/5 text-xs text-on-surface-variant">
                      Active {data.lastActive}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Decorative contribution grid — always shown */}
          <div
            className="grid gap-1 opacity-80"
            style={{ gridTemplateColumns: `repeat(${GRID_COLS}, 1fr)` }}
          >
            {cells.map((opacity, i) => (
              <div
                key={i}
                style={{
                  backgroundColor: `rgba(173, 198, 255, ${opacity})`,
                  borderRadius: "2px",
                  aspectRatio: "1",
                }}
              />
            ))}
          </div>

          {/* Most starred repo badge */}
          {!loading && data?.mostStarredRepo && (
            <motion.a
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              href={data.mostStarredRepo.url}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-xs text-on-surface-variant hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-primary" style={{ fontSize: "14px" }}>
                star
              </span>
              Top repo: {data.mostStarredRepo.name} ({data.mostStarredRepo.stars} ★)
            </motion.a>
          )}
        </motion.div>

        {/* ── Right: language distribution ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="md:col-span-4 glass-panel rounded-2xl p-8 flex flex-col justify-center"
        >
          <p className="text-secondary font-label-md text-label-md mb-6 uppercase tracking-widest">
            {loading ? "Top Languages" : "Stack Distribution"}
          </p>

          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div
                key="lang-skel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {[80, 55, 30].map((w, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <Skel className={`h-4 w-${w === 80 ? 16 : w === 55 ? 12 : 10}`} />
                      <Skel className="h-4 w-8" />
                    </div>
                    <Skel className="h-2 w-full rounded-full" />
                  </div>
                ))}
              </motion.div>
            ) : langs.length === 0 ? (
              <motion.p
                key="no-langs"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-on-surface-variant font-body-md text-body-md"
              >
                No public repos found.
              </motion.p>
            ) : (
              <motion.div
                key="lang-bars"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                {langs.map((lang, i) => (
                  <div key={lang.name}>
                    <div className="flex justify-between mb-2">
                      <span className="font-body-md text-body-md">{lang.name}</span>
                      <span className="font-body-md text-body-md text-on-surface-variant">
                        {lang.percent}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${lang.percent}%` }}
                        transition={{
                          duration: 1.2,
                          ease: "easeOut",
                          delay: 0.1 + i * 0.08,
                        }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: BAR_COLORS[i] }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
