export const prerender = false;

import type { APIRoute } from 'astro';
import { verifyToken } from '../../lib/auth';
import { ghReadJson, ghWriteJson } from '../../lib/github';

export const POST: APIRoute = async ({ request, cookies }) => {
  // Auth check
  const token = cookies.get('admin_token')?.value;
  if (!token || !(await verifyToken(token))) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { sha } = await ghReadJson('src/data/news.json');
    await ghWriteJson('src/data/news.json', body, sha, 'Update news.json via CMS');

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
