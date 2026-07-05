import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/pages/api/admin-login.ts
var admin_login_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request }) => {
	if ((request.headers.get("content-type") ?? "").includes("application/json")) {
		const body = await request.json();
		body.username;
		body.password;
	} else {
		const data = await request.formData();
		data.get("username")?.toString();
		data.get("password")?.toString();
	}
	return new Response(JSON.stringify({ error: "Server belum dikonfigurasi (env vars missing)." }), {
		status: 500,
		headers: { "Content-Type": "application/json" }
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin-login@_@ts
var page = () => admin_login_exports;
//#endregion
export { page };
