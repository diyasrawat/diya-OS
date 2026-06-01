"use client";

import { useState, useEffect, ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);

  useEffect(() => {
    setAuthed(localStorage.getItem("admin_auth") === "true");
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setChecking(true);
    setError("");
    try {
      const res = await fetch("/api/admin/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const { ok, error: msg } = await res.json();
      if (ok) {
        localStorage.setItem("admin_auth", "true");
        setAuthed(true);
      } else {
        setError(msg ?? "Wrong password.");
      }
    } catch {
      setError("Connection error — is the dev server running?");
    } finally {
      setChecking(false);
    }
  }

  // Still checking localStorage
  if (authed === null) return null;

  // Show password gate
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#131315] flex items-center justify-center px-4">
        <form
          onSubmit={handleSubmit}
          className="glass-panel rounded-3xl p-10 w-full max-w-sm space-y-6"
        >
          <div className="text-center space-y-1">
            <p className="font-display-lg text-[32px] font-bold text-on-surface tracking-tighter leading-none">
              Diya.OS
            </p>
            <p className="font-label-md text-label-md text-on-surface-variant">
              Admin Access
            </p>
          </div>

          <input
            type="password"
            placeholder="Password"
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:ring-1 focus:ring-primary text-on-surface placeholder:text-on-surface-variant/40 font-mono text-sm"
          />

          {error && (
            <p className="text-xs text-red-400 font-mono">{error}</p>
          )}

          <button
            type="submit"
            disabled={checking || !password.trim()}
            className="w-full bg-primary text-on-primary font-label-md text-label-md py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40"
          >
            {checking ? "Checking…" : "Enter Admin"}
          </button>
        </form>
      </div>
    );
  }

  return <>{children}</>;
}
