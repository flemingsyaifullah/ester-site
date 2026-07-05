import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { C as createComponent, S as createAstro } from "./server_eIjUU75i.mjs";
import "./compiler_Ca1DtYCd.mjs";
import { t as verifyToken } from "./auth_DdaVijL3.mjs";
//#region src/pages/admin/index.astro
var admin_exports = /* @__PURE__ */ __exportAll({
	default: () => $$Index,
	file: () => $$file,
	prerender: () => false,
	url: () => $$url
});
createAstro("https://globalindoperizinan.id");
var $$Index = createComponent(async ($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$Index;
	const token = Astro.cookies.get("admin_token")?.value;
	const valid = token ? await verifyToken(token) : false;
	return Astro.redirect(valid ? "/admin/dashboard" : "/admin/login");
}, "C:/D/ester/ester-site/src/pages/admin/index.astro", void 0);
var $$file = "C:/D/ester/ester-site/src/pages/admin/index.astro";
var $$url = "/admin";
//#endregion
//#region \0virtual:astro:page:src/pages/admin/index@_@astro
var page = () => admin_exports;
//#endregion
export { page };
