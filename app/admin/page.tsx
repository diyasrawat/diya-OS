"use client";

import { useState } from "react";
import { focusItems as defaultFocus } from "@/lib/data/focus";
import { workExperience as defaultExperience } from "@/lib/data/experience";
import type { WorkEntry } from "@/lib/data/experience";
import { timeline as defaultTimeline } from "@/lib/data/timeline";
import { projects as defaultProjects } from "@/lib/data/projects";
import type { FocusItem, TimelineEvent, Project } from "@/lib/types";
import SafeInput from "@/components/ui/SafeInput";
import SafeButton from "@/components/ui/SafeButton";
import SafeTextarea from "@/components/ui/SafeTextarea";

// ── Types ─────────────────────────────────────────────────────────────────────

type Section = "focus" | "experience" | "timeline" | "projects" | "recruiter";

// ── Shared style tokens ───────────────────────────────────────────────────────

const IN = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:ring-1 focus:ring-primary";
const SEL = "w-full bg-surface-container-highest border border-white/10 rounded-xl px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary";

// ── Shared helpers ────────────────────────────────────────────────────────────

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
}

function save(key: string, data: unknown) {
  localStorage.setItem(key, JSON.stringify(data));
}

function uid() { return Date.now().toString(36); }

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] font-mono uppercase tracking-widest text-on-surface-variant mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function SaveBtn({ saved, onClick, disabled }: { saved: boolean; onClick: () => void; disabled?: boolean }) {
  return (
    <SafeButton
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-2.5 rounded-xl font-label-md text-label-md transition-all disabled:opacity-40 ${
        saved
          ? "bg-green-500/15 text-green-400 border border-green-400/20"
          : "bg-primary text-on-primary hover:opacity-90"
      }`}
    >
      {saved ? "✓ Saved" : "Save Changes"}
    </SafeButton>
  );
}

function DeleteConfirm({
  id, confirmId, onRequest, onConfirm, onCancel,
}: {
  id: string; confirmId: string | null;
  onRequest: (id: string) => void;
  onConfirm: (id: string) => void;
  onCancel: () => void;
}) {
  if (confirmId === id) {
    return (
      <span className="flex items-center gap-2 text-sm">
        <span className="text-on-surface-variant">Sure?</span>
        <SafeButton onClick={() => onConfirm(id)} className="text-red-400 hover:text-red-300 font-medium">Yes</SafeButton>
        <SafeButton onClick={onCancel} className="text-on-surface-variant hover:text-on-surface">No</SafeButton>
      </span>
    );
  }
  return (
    <SafeButton onClick={() => onRequest(id)} className="text-on-surface-variant hover:text-red-400 text-sm transition-colors px-2 py-1 rounded hover:bg-red-400/10">
      Delete
    </SafeButton>
  );
}

// ── Focus Editor ──────────────────────────────────────────────────────────────

function FocusEditor() {
  const [items, setItems] = useState<FocusItem[]>(() => load("focus_override", defaultFocus));
  const [saved, setSaved] = useState(false);

  function update(id: string, content: string) {
    setItems(prev => prev.map(i => i.id === id ? { ...i, content } : i));
  }

  function handleSave() {
    save("focus_override", items);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="flex items-center justify-between">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Currently Building</h2>
        <SaveBtn saved={saved} onClick={handleSave} />
      </div>
      {items.map(item => (
        <Row key={item.id} label={item.label}>
          <SafeTextarea
            rows={3}
            value={item.content}
            onChange={e => update(item.id, e.target.value)}
            className={`${IN} resize-none`}
          />
        </Row>
      ))}
      <SaveBtn saved={saved} onClick={handleSave} />
    </div>
  );
}

// ── Experience Editor ─────────────────────────────────────────────────────────

const EMPTY_EXP: WorkEntry = { id: "", company: "", role: "", type: "Internship", startDate: "", endDate: "", current: false, description: "", tags: [], color: "primary" };

function ExperienceEditor() {
  const [items, setItems] = useState<WorkEntry[]>(() => load("experience_override", defaultExperience));
  const [form, setForm] = useState<WorkEntry>(EMPTY_EXP);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const up = (k: keyof WorkEntry, v: unknown) => setForm(p => ({ ...p, [k]: v }));

  function openAdd() { setForm({ ...EMPTY_EXP, id: uid() }); setEditingId(null); setShowForm(true); }
  function openEdit(item: WorkEntry) { setForm(item); setEditingId(item.id); setShowForm(true); }
  function cancelForm() { setShowForm(false); setEditingId(null); }

  function handleSaveItem() {
    const updated = editingId
      ? items.map(i => i.id === editingId ? form : i)
      : [...items, form];
    setItems(updated);
    save("experience_override", updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    cancelForm();
  }

  function handleDelete(id: string) {
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    save("experience_override", updated);
    setConfirmId(null);
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Experience</h2>
        <SafeButton onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-on-surface-variant hover:text-on-surface hover:bg-white/10 transition-all">
          <span className="material-symbols-outlined text-sm">add</span> Add Entry
        </SafeButton>
      </div>

      {showForm && (
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <p className="font-label-md text-label-md text-primary uppercase tracking-widest">
            {editingId ? "Edit Entry" : "New Entry"}
          </p>
          <div className="grid grid-cols-2 gap-4">
            <Row label="Company"><SafeInput className={IN} value={form.company} onChange={e => up("company", e.target.value)} placeholder="Company name" /></Row>
            <Row label="Role Title"><SafeInput className={IN} value={form.role} onChange={e => up("role", e.target.value)} placeholder="Job title" /></Row>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Row label="Type">
              <select className={SEL} value={form.type} onChange={e => up("type", e.target.value)}>
                {["Full-time", "Internship", "Contract", "Part-time"].map(t => <option key={t}>{t}</option>)}
              </select>
            </Row>
            <Row label="Color">
              <select className={SEL} value={form.color} onChange={e => up("color", e.target.value)}>
                {["primary", "secondary", "tertiary"].map(c => <option key={c}>{c}</option>)}
              </select>
            </Row>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Row label="Start Date"><SafeInput className={IN} value={form.startDate} onChange={e => up("startDate", e.target.value)} placeholder="Jun 2023" /></Row>
            <Row label="End Date">
              <SafeInput className={IN} value={form.current ? "Present" : form.endDate} disabled={form.current} onChange={e => up("endDate", e.target.value)} placeholder="Aug 2023" />
            </Row>
          </div>
          <label className="flex items-center gap-2 text-sm text-on-surface-variant cursor-pointer">
            <SafeInput type="checkbox" checked={form.current} onChange={e => { up("current", e.target.checked); if (e.target.checked) up("endDate", "Present"); }} className="w-4 h-4 rounded border-white/20 accent-[#adc6ff]" />
            Current Role
          </label>
          <Row label="Description">
            <SafeTextarea rows={3} className={`${IN} resize-none`} value={form.description} onChange={e => up("description", e.target.value)} placeholder="What did you work on?" />
          </Row>
          <Row label="Tags (comma separated)">
            <SafeInput className={IN} value={form.tags.join(", ")} onChange={e => up("tags", e.target.value.split(",").map(t => t.trim()).filter(Boolean))} placeholder="Python, PyTorch, LangChain" />
          </Row>
          <div className="flex gap-3 pt-2">
            <SafeButton onClick={handleSaveItem} className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-label-md text-label-md hover:opacity-90 transition-opacity">Save</SafeButton>
            <SafeButton onClick={cancelForm} className="bg-white/5 border border-white/10 text-on-surface-variant px-6 py-2.5 rounded-xl font-label-md text-label-md hover:bg-white/10 transition-colors">Cancel</SafeButton>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="glass-panel rounded-xl px-5 py-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-label-md text-label-md text-on-surface truncate">{item.company}</p>
              <p className="text-sm text-on-surface-variant truncate">{item.role} · {item.startDate}–{item.endDate}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <SafeButton onClick={() => openEdit(item)} className="text-sm text-on-surface-variant hover:text-primary transition-colors px-2 py-1 rounded hover:bg-primary/10">Edit</SafeButton>
              <DeleteConfirm id={item.id} confirmId={confirmId} onRequest={setConfirmId} onConfirm={handleDelete} onCancel={() => setConfirmId(null)} />
            </div>
          </div>
        ))}
      </div>
      {saved && <p className="text-green-400 text-sm font-mono">✓ Saved to localStorage</p>}
    </div>
  );
}

// ── Timeline Editor ───────────────────────────────────────────────────────────

const EMPTY_TL: TimelineEvent = { id: "", date: "", title: "", description: "", category: "milestone", color: "primary" };

function TimelineEditor() {
  const [items, setItems] = useState<TimelineEvent[]>(() => load("timeline_override", defaultTimeline));
  const [form, setForm] = useState<TimelineEvent>(EMPTY_TL);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const up = (k: keyof TimelineEvent, v: unknown) => setForm(p => ({ ...p, [k]: v }));
  function openAdd() { setForm({ ...EMPTY_TL, id: uid() }); setEditingId(null); setShowForm(true); }
  function openEdit(item: TimelineEvent) { setForm(item); setEditingId(item.id); setShowForm(true); }
  function cancelForm() { setShowForm(false); setEditingId(null); }

  function handleSaveItem() {
    const updated = editingId ? items.map(i => i.id === editingId ? form : i) : [...items, form];
    setItems(updated);
    save("timeline_override", updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    cancelForm();
  }

  function handleDelete(id: string) {
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    save("timeline_override", updated);
    setConfirmId(null);
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Living CV</h2>
        <SafeButton onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-on-surface-variant hover:text-on-surface hover:bg-white/10 transition-all">
          <span className="material-symbols-outlined text-sm">add</span> Add Entry
        </SafeButton>
      </div>

      {showForm && (
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <p className="font-label-md text-label-md text-primary uppercase tracking-widest">{editingId ? "Edit Entry" : "New Entry"}</p>
          <div className="grid grid-cols-2 gap-4">
            <Row label="Date"><SafeInput className={IN} value={form.date} onChange={e => up("date", e.target.value)} placeholder="Mar 2024" /></Row>
            <Row label="Title"><SafeInput className={IN} value={form.title} onChange={e => up("title", e.target.value)} placeholder="Award / Hackathon / etc." /></Row>
          </div>
          <Row label="Description">
            <SafeTextarea rows={3} className={`${IN} resize-none`} value={form.description} onChange={e => up("description", e.target.value)} />
          </Row>
          <div className="grid grid-cols-3 gap-4">
            <Row label="Category">
              <select className={SEL} value={form.category} onChange={e => up("category", e.target.value)}>
                {["hackathon","certification","milestone","education","publication","award"].map(c => <option key={c}>{c}</option>)}
              </select>
            </Row>
            <Row label="Color">
              <select className={SEL} value={form.color} onChange={e => up("color", e.target.value)}>
                {["primary","secondary","tertiary"].map(c => <option key={c}>{c}</option>)}
              </select>
            </Row>
            <Row label="Link (optional)"><SafeInput className={IN} value={form.link ?? ""} onChange={e => up("link", e.target.value || undefined)} placeholder="https://…" /></Row>
          </div>
          <div className="flex gap-3 pt-2">
            <SafeButton onClick={handleSaveItem} className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-label-md text-label-md hover:opacity-90 transition-opacity">Save</SafeButton>
            <SafeButton onClick={cancelForm} className="bg-white/5 border border-white/10 text-on-surface-variant px-6 py-2.5 rounded-xl font-label-md text-label-md hover:bg-white/10">Cancel</SafeButton>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="glass-panel rounded-xl px-5 py-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-label-md text-label-md text-on-surface truncate">{item.title}</p>
              <p className="text-sm text-on-surface-variant truncate">{item.date} · {item.category}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <SafeButton onClick={() => openEdit(item)} className="text-sm text-on-surface-variant hover:text-primary transition-colors px-2 py-1 rounded hover:bg-primary/10">Edit</SafeButton>
              <DeleteConfirm id={item.id} confirmId={confirmId} onRequest={setConfirmId} onConfirm={handleDelete} onCancel={() => setConfirmId(null)} />
            </div>
          </div>
        ))}
      </div>
      {saved && <p className="text-green-400 text-sm font-mono">✓ Saved to localStorage</p>}
    </div>
  );
}

// ── Projects Editor ───────────────────────────────────────────────────────────

type EditableProject = Omit<Project, "liveUrl" | "status" | "year" | "featured"> & { featured: boolean };

const EMPTY_PROJ: EditableProject = {
  id: "", title: "", description: "", tags: [],
  imageGradient: "from-blue-950 via-indigo-900 to-slate-900",
  githubUrl: "", featured: true,
  summary: { problem: "", solution: "", tech: "", keyLearning: "" },
};

function ProjectsEditor() {
  const [items, setItems] = useState<Project[]>(() => load("projects_override", defaultProjects));
  const [form, setForm] = useState<EditableProject>(EMPTY_PROJ);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmId, setConfirmId] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const up = (k: keyof EditableProject, v: unknown) => setForm(p => ({ ...p, [k]: v }));
  const upS = (k: keyof Project["summary"], v: string) => setForm(p => ({ ...p, summary: { ...p.summary, [k]: v } }));

  function openAdd() { setForm({ ...EMPTY_PROJ, id: uid() }); setEditingId(null); setShowForm(true); }
  function openEdit(item: Project) { setForm(item); setEditingId(item.id); setShowForm(true); }
  function cancelForm() { setShowForm(false); setEditingId(null); }

  function handleSaveItem() {
    const full: Project = { ...(form as Project), status: "completed", year: new Date().getFullYear() };
    const updated = editingId ? items.map(i => i.id === editingId ? full : i) : [...items, full];
    setItems(updated);
    save("projects_override", updated);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    cancelForm();
  }

  function handleDelete(id: string) {
    const updated = items.filter(i => i.id !== id);
    setItems(updated);
    save("projects_override", updated);
    setConfirmId(null);
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Projects</h2>
        <SafeButton onClick={openAdd} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-on-surface-variant hover:text-on-surface hover:bg-white/10 transition-all">
          <span className="material-symbols-outlined text-sm">add</span> Add Project
        </SafeButton>
      </div>

      {showForm && (
        <div className="glass-panel rounded-2xl p-6 space-y-4">
          <p className="font-label-md text-label-md text-primary uppercase tracking-widest">{editingId ? "Edit Project" : "New Project"}</p>
          <Row label="Title"><SafeInput className={IN} value={form.title} onChange={e => up("title", e.target.value)} placeholder="Project name" /></Row>
          <Row label="Description">
            <SafeTextarea rows={3} className={`${IN} resize-none`} value={form.description} onChange={e => up("description", e.target.value)} placeholder="Short description for cards" />
          </Row>
          <div className="grid grid-cols-2 gap-4">
            <Row label="Tags (comma sep)">
              <SafeInput className={IN} value={form.tags.join(", ")} onChange={e => up("tags", e.target.value.split(",").map(t => t.trim()).filter(Boolean))} placeholder="Python, PyTorch" />
            </Row>
            <Row label="GitHub URL">
              <SafeInput className={IN} value={form.githubUrl ?? ""} onChange={e => up("githubUrl", e.target.value)} placeholder="https://github.com/…" />
            </Row>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Row label="Image Gradient (Tailwind)">
              <SafeInput className={IN} value={form.imageGradient} onChange={e => up("imageGradient", e.target.value)} placeholder="from-blue-950 via-indigo-900 to-slate-900" />
            </Row>
            <label className="flex items-center gap-2 text-sm text-on-surface-variant cursor-pointer self-end pb-3">
              <SafeInput type="checkbox" checked={form.featured} onChange={e => up("featured", e.target.checked)} className="w-4 h-4 rounded border-white/20 accent-[#adc6ff]" />
              Show in Featured Work
            </label>
          </div>
          <p className="text-xs font-mono text-on-surface-variant uppercase tracking-widest pt-2">Summary fields (for Diya AI)</p>
          <Row label="Problem"><SafeInput className={IN} value={form.summary.problem} onChange={e => upS("problem", e.target.value)} /></Row>
          <Row label="Solution"><SafeInput className={IN} value={form.summary.solution} onChange={e => upS("solution", e.target.value)} /></Row>
          <Row label="Tech"><SafeInput className={IN} value={form.summary.tech} onChange={e => upS("tech", e.target.value)} /></Row>
          <Row label="Key Learning"><SafeInput className={IN} value={form.summary.keyLearning} onChange={e => upS("keyLearning", e.target.value)} /></Row>
          <div className="flex gap-3 pt-2">
            <SafeButton onClick={handleSaveItem} className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-label-md text-label-md hover:opacity-90 transition-opacity">Save</SafeButton>
            <SafeButton onClick={cancelForm} className="bg-white/5 border border-white/10 text-on-surface-variant px-6 py-2.5 rounded-xl font-label-md text-label-md hover:bg-white/10">Cancel</SafeButton>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {items.map(item => (
          <div key={item.id} className="glass-panel rounded-xl px-5 py-4 flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="font-label-md text-label-md text-on-surface truncate">{item.title}</p>
              <p className="text-sm text-on-surface-variant truncate">{item.tags.slice(0,3).join(" · ")}</p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <SafeButton onClick={() => openEdit(item)} className="text-sm text-on-surface-variant hover:text-primary transition-colors px-2 py-1 rounded hover:bg-primary/10">Edit</SafeButton>
              <DeleteConfirm id={item.id} confirmId={confirmId} onRequest={setConfirmId} onConfirm={handleDelete} onCancel={() => setConfirmId(null)} />
            </div>
          </div>
        ))}
      </div>
      {saved && <p className="text-green-400 text-sm font-mono">✓ Saved to localStorage</p>}
    </div>
  );
}

// ── Recruiter Note ────────────────────────────────────────────────────────────

function RecruiterNote() {
  return (
    <div className="max-w-2xl">
      <h2 className="font-headline-lg text-headline-lg text-on-surface mb-4">Recruiter Config</h2>
      <div className="glass-panel rounded-2xl p-8 text-center space-y-3">
        <span className="material-symbols-outlined text-on-surface-variant text-4xl">schedule</span>
        <p className="font-body-md text-body-md text-on-surface-variant">Recruiter role editor coming in v0.8 alongside Supabase migration.</p>
        <p className="text-sm text-on-surface-variant/60 font-mono">Edit lib/data/recruiter-config.ts directly for now.</p>
      </div>
    </div>
  );
}

// ── Sidebar config ────────────────────────────────────────────────────────────

const SECTIONS: { id: Section; icon: string; label: string }[] = [
  { id: "focus",     icon: "terminal",    label: "Currently Building" },
  { id: "experience",icon: "work",        label: "Experience" },
  { id: "timeline",  icon: "timeline",    label: "Living CV" },
  { id: "projects",  icon: "folder_open", label: "Projects" },
  { id: "recruiter", icon: "person",      label: "Recruiter Config" },
];

// ── Admin Page ────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [active, setActive] = useState<Section>("focus");

  function handleLogout() {
    localStorage.removeItem("admin_auth");
    window.location.href = "/admin";
  }

  return (
    <div className="min-h-screen bg-[#131315] flex flex-col">
      {/* Top bar */}
      <header className="fixed top-0 inset-x-0 z-50 h-14 flex items-center justify-between px-6 bg-surface-container-low/80 backdrop-blur-xl border-b border-white/10">
        <p className="font-headline-lg text-[20px] font-bold text-on-surface tracking-tighter">
          Admin <span className="text-on-surface-variant font-normal">— Diya.OS</span>
        </p>
        <SafeButton
          onClick={handleLogout}
          className="text-sm text-on-surface-variant hover:text-on-surface px-4 py-1.5 rounded-lg hover:bg-white/5 transition-colors font-mono"
        >
          Log Out
        </SafeButton>
      </header>

      <div className="flex flex-1 pt-14">
        {/* Desktop sidebar */}
        <aside className="hidden md:flex flex-col fixed top-14 left-0 w-56 h-[calc(100vh-3.5rem)] bg-surface-container-low/50 backdrop-blur-xl border-r border-white/10 py-6 z-40">
          {SECTIONS.map(s => (
            <SafeButton
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`flex items-center gap-3 px-5 py-3 text-left w-full transition-all ${
                active === s.id
                  ? "bg-primary/10 text-primary border-r-4 border-primary"
                  : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]" style={active === s.id ? { fontVariationSettings: "'FILL' 1" } : undefined}>
                {s.icon}
              </span>
              <span className="font-label-md text-label-md">{s.label}</span>
            </SafeButton>
          ))}
        </aside>

        {/* Mobile tabs */}
        <nav className="md:hidden fixed top-14 inset-x-0 z-40 flex overflow-x-auto border-b border-white/10 bg-surface-container-low/80 backdrop-blur-xl">
          {SECTIONS.map(s => (
            <SafeButton
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`shrink-0 flex flex-col items-center gap-1 px-4 py-2.5 text-xs transition-colors ${
                active === s.id ? "text-primary border-b-2 border-primary" : "text-on-surface-variant"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">{s.icon}</span>
              <span>{s.label.split(" ")[0]}</span>
            </SafeButton>
          ))}
        </nav>

        {/* Main content */}
        <main className="flex-1 md:ml-56 mt-10 md:mt-0 p-6 md:p-10 overflow-y-auto">
          {active === "focus"      && <FocusEditor />}
          {active === "experience" && <ExperienceEditor />}
          {active === "timeline"   && <TimelineEditor />}
          {active === "projects"   && <ProjectsEditor />}
          {active === "recruiter"  && <RecruiterNote />}
        </main>
      </div>
    </div>
  );
}
