import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as verifyToken } from "./auth_DdaVijL3.mjs";
import { r as ghUploadImage, t as ghGetSha } from "./github_BbNtzGhW.mjs";
//#region src/pages/api/upload-image.ts
var upload_image_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var ALLOWED_TYPES = [
	"image/jpeg",
	"image/png",
	"image/webp"
];
var MAX_SIZE_MB = 5;
var POST = async ({ request, cookies }) => {
	const token = cookies.get("admin_token")?.value;
	if (!token || !await verifyToken(token)) return new Response(JSON.stringify({ error: "Unauthorized" }), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	let formData;
	try {
		formData = await request.formData();
	} catch {
		return new Response(JSON.stringify({ error: "Expected multipart/form-data" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}
	const file = formData.get("image");
	if (!file) return new Response(JSON.stringify({ error: "Field \"image\" tidak ditemukan" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	if (!ALLOWED_TYPES.includes(file.type)) return new Response(JSON.stringify({ error: "Format file harus JPG, PNG, atau WebP" }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	if (file.size > MAX_SIZE_MB * 1024 * 1024) return new Response(JSON.stringify({ error: `Ukuran file maksimal ${MAX_SIZE_MB}MB` }), {
		status: 400,
		headers: { "Content-Type": "application/json" }
	});
	try {
		const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
		const filename = `portfolio-${Date.now()}.${ext}`;
		const arrayBuffer = await file.arrayBuffer();
		const publicPath = await ghUploadImage(filename, Buffer.from(arrayBuffer).toString("base64"), await ghGetSha(`public/images/${filename}`));
		return new Response(JSON.stringify({
			ok: true,
			path: publicPath
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (err) {
		return new Response(JSON.stringify({ error: String(err) }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/upload-image@_@ts
var page = () => upload_image_exports;
//#endregion
export { page };
