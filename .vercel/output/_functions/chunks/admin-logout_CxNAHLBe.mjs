import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
//#region src/pages/api/admin-logout.ts
var admin_logout_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async () => {
	return new Response(JSON.stringify({ ok: true }), {
		status: 200,
		headers: {
			"Content-Type": "application/json",
			"Set-Cookie": "admin_token=; HttpOnly; Path=/; SameSite=Strict; Max-Age=0"
		}
	});
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/admin-logout@_@ts
var page = () => admin_logout_exports;
//#endregion
export { page };
