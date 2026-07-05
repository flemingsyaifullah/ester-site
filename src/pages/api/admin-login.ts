export const prerender = false;

import type { APIRoute } from 'astro';
import { signToken } from '../../lib/auth';

export const POST: APIRoute = async ({ request }) => {
  let username: string | undefined;
  let password: string | undefined;

  const contentType = request.headers.get('content-type') ?? '';
  if (contentType.includes('application/json')) {
    const body = await request.json();
    username = body.username;
    password = body.password;
  } else {
    const data = await request.formData();
    username = data.get('username')?.toString();
    password = data.get('password')?.toString();
  }

  const validUser = import.meta.env.ADMIN_USER;
  const validPass = import.meta.env.ADMIN_PASS;

  if (!validUser || !validPass) {
    return new Response(JSON.stringify({ error: 'Server belum dikonfigurasi (env vars missing).' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (username !== validUser || password !== validPass) {
    return new Response(JSON.stringify({ error: 'Username atau password salah.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const token = await signToken({ user: username });
  const maxAge = 8 * 3600; // 8 hours

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': `admin_token=${token}; HttpOnly; Path=/; SameSite=Strict; Max-Age=${maxAge}`,
    },
  });
};
