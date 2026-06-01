// Placeholder admin page — add auth (e.g. NextAuth or Clerk) before going live
export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
      <p className="mt-2 text-muted-foreground text-sm">
        Dashboard for managing projects, skills, and site content.
        Authentication is not yet wired up.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {["Projects", "Skills", "Timeline"].map((item) => (
          <div
            key={item}
            className="rounded-xl border bg-card p-5 opacity-50"
          >
            <p className="font-medium">{item}</p>
            <p className="mt-1 text-xs text-muted-foreground">Coming soon</p>
          </div>
        ))}
      </div>
    </div>
  );
}
