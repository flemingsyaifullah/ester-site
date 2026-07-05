export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async () => {
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      // Clear the cookie by setting Max-Age=0
      'Set-Cookie': 'admin_token=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0',
    },
  });
};
