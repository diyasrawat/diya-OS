// Add ADMIN_PASSWORD=yourpassword to .env.local (no NEXT_PUBLIC_ prefix needed)
export async function POST(req: Request) {
  const { password } = (await req.json()) as { password: string };
  const correct = process.env.ADMIN_PASSWORD;

  if (!correct) {
    return Response.json(
      { ok: false, error: "ADMIN_PASSWORD is not set in .env.local" },
      { status: 500 }
    );
  }

  return Response.json({ ok: password === correct });
}
