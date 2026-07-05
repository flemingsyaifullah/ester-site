import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { t as verifyToken } from "./auth_DdaVijL3.mjs";
import { i as ghWriteJson, n as ghReadJson } from "./github_BbNtzGhW.mjs";
//#region src/pages/api/save-portfolio.ts
var save_portfolio_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var POST = async ({ request, cookies }) => {
	const token = cookies.get("admin_token")?.value;
	if (!token || !await verifyToken(token)) return new Response(JSON.stringify({ error: "Unauthorized" }), {
		status: 401,
		headers: { "Content-Type": "application/json" }
	});
	let body;
	try {
		body = await request.json();
	} catch {
		return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
	}
	try {
		const { sha } = await ghReadJson("src/data/portfolio.json");
		await ghWriteJson("src/data/portfolio.json", body, sha);
		return new Response(JSON.stringify({ ok: true }), {
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
//#region \0virtual:astro:page:src/pages/api/save-portfolio@_@ts
var page = () => save_portfolio_exports;
//#endregion
export { page };
