// Add GITHUB_USERNAME=<your-username> to .env.local
// This route caches for 1 hour; no auth token needed for public data.
export const revalidate = 3600;

const USERNAME = process.env.GITHUB_USERNAME ?? "diyarawat";
const GH_HEADERS = { Accept: "application/vnd.github.v3+json" };

function relativeTime(iso: string): string {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

interface GHRepo {
  name: string;
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
  html_url: string;
  fork: boolean;
}

export async function GET() {
  try {
    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${USERNAME}`, { headers: GH_HEADERS }),
      fetch(
        `https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=100`,
        { headers: GH_HEADERS }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      const msg = `GitHub API ${!userRes.ok ? userRes.status : reposRes.status}`;
      return Response.json({ error: msg }, { status: 502 });
    }

    const user = await userRes.json();
    const repos: GHRepo[] = await reposRes.json();

    // Stars across all non-fork repos
    const totalStars = repos.reduce(
      (sum, r) => sum + (r.fork ? 0 : r.stargazers_count),
      0
    );

    // Language distribution by repo count (primary language per repo)
    const langCounts: Record<string, number> = {};
    for (const r of repos) {
      if (r.language) langCounts[r.language] = (langCounts[r.language] ?? 0) + 1;
    }
    const total = Object.values(langCounts).reduce((a, b) => a + b, 0);
    const topLanguages = Object.entries(langCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({
        name,
        percent: Math.round((count / total) * 100),
      }));

    // Most starred non-fork repo
    const mostStarred = repos
      .filter((r) => !r.fork)
      .reduce<GHRepo | null>(
        (best, r) =>
          r.stargazers_count > (best?.stargazers_count ?? -1) ? r : best,
        null
      );

    // Last push (repos are already sorted by pushed_at desc)
    const lastActive = repos[0]?.pushed_at ? relativeTime(repos[0].pushed_at) : "unknown";

    return Response.json({
      username: user.login as string,
      followers: user.followers as number,
      publicRepos: user.public_repos as number,
      totalStars,
      topLanguages,
      mostStarredRepo: mostStarred
        ? { name: mostStarred.name, stars: mostStarred.stargazers_count, url: mostStarred.html_url }
        : null,
      lastActive,
    });
  } catch (err) {
    console.error("[/api/github]", err);
    return Response.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}
