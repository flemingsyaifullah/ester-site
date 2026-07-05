/**
 * GitHub API helpers — used by admin API routes to read/write
 * JSON data files and upload images directly to the GitHub repo.
 * Vercel detects the commit and triggers an automatic redeploy.
 */

interface GhConfig {
  token: string;
  repo: string;
  branch: string;
}

function cfg(): GhConfig {
  return {
    token: import.meta.env.GITHUB_TOKEN as string,
    repo: import.meta.env.GITHUB_REPO as string,
    branch: (import.meta.env.GITHUB_BRANCH as string) || 'main',
  };
}

function apiUrl(path: string): string {
  return `https://api.github.com/repos/${cfg().repo}/contents/${path}`;
}

function ghHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${cfg().token}`,
    Accept: 'application/vnd.github+json',
    'Content-Type': 'application/json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

/**
 * Read a JSON file from the GitHub repo.
 * Returns the parsed data and the file's SHA (required for updates).
 */
export async function ghReadJson(path: string): Promise<{ data: unknown; sha: string }> {
  const res = await fetch(`${apiUrl(path)}?ref=${cfg().branch}`, {
    headers: ghHeaders(),
  });
  if (!res.ok) {
    throw new Error(`GitHub read failed [${res.status}]: ${await res.text()}`);
  }
  const json = (await res.json()) as { content: string; sha: string };
  // GitHub returns base64-encoded content
  const text = Buffer.from(json.content, 'base64').toString('utf-8');
  return { data: JSON.parse(text), sha: json.sha };
}

/**
 * Write (update) a JSON file in the GitHub repo.
 * SHA of the current file is required by the GitHub API.
 */
export async function ghWriteJson(
  path: string,
  data: unknown,
  sha: string,
  message?: string,
): Promise<void> {
  const content = Buffer.from(JSON.stringify(data, null, 2)).toString('base64');
  const res = await fetch(apiUrl(path), {
    method: 'PUT',
    headers: ghHeaders(),
    body: JSON.stringify({
      message: message ?? `[admin] update ${path}`,
      content,
      sha,
      branch: cfg().branch,
    }),
  });
  if (!res.ok) {
    throw new Error(`GitHub write failed [${res.status}]: ${await res.text()}`);
  }
}

/**
 * Upload a binary file (image) to the GitHub repo.
 * Pass existingSha if the file already exists (for overwrite).
 * Returns the public URL path for use in <img src>.
 */
export async function ghUploadImage(
  filename: string,
  base64Content: string,
  existingSha?: string,
): Promise<string> {
  const repoPath = `public/images/${filename}`;
  const body: Record<string, string> = {
    message: `[admin] upload image ${filename}`,
    content: base64Content,
    branch: cfg().branch,
  };
  if (existingSha) body.sha = existingSha;

  const res = await fetch(apiUrl(repoPath), {
    method: 'PUT',
    headers: ghHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`GitHub upload failed [${res.status}]: ${await res.text()}`);
  }
  // Return the public path Astro will serve after redeploy
  return `/images/${filename}`;
}

/**
 * Try to get the SHA of an existing file (returns undefined if not found).
 */
export async function ghGetSha(path: string): Promise<string | undefined> {
  const res = await fetch(`${apiUrl(path)}?ref=${cfg().branch}`, {
    headers: ghHeaders(),
  });
  if (res.status === 404) return undefined;
  if (!res.ok) return undefined;
  const json = (await res.json()) as { sha: string };
  return json.sha;
}
