export const prerender = false;

import type { APIRoute } from 'astro';
import { verifyToken } from '../../lib/auth';
import { ghUploadImage, ghGetSha } from '../../lib/github';

const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_SIZE_MB = 5;

export const POST: APIRoute = async ({ request, cookies }) => {
  // Auth check
  const token = cookies.get('admin_token')?.value;
  if (!token || !(await verifyToken(token))) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return new Response(JSON.stringify({ error: 'Expected multipart/form-data' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const file = formData.get('image') as File | null;
  if (!file) {
    return new Response(JSON.stringify({ error: 'Field "image" tidak ditemukan' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!ALLOWED_TYPES.includes(file.type)) {
    return new Response(JSON.stringify({ error: 'Format file harus JPG, PNG, atau WebP' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (file.size > MAX_SIZE_MB * 1024 * 1024) {
    return new Response(JSON.stringify({ error: `Ukuran file maksimal ${MAX_SIZE_MB}MB` }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const ext = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
    const filename = `portfolio-${Date.now()}.${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString('base64');

    // Check if file already exists (needed if overwriting)
    const existingSha = await ghGetSha(`public/images/${filename}`);

    const publicPath = await ghUploadImage(filename, base64, existingSha);

    return new Response(JSON.stringify({ ok: true, path: publicPath }), {
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
