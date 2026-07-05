import { C as createComponent, S as createAstro, c as renderSlot, d as renderTemplate, g as renderHead } from "./server_eIjUU75i.mjs";
import "./compiler_Ca1DtYCd.mjs";
//#region src/layouts/AdminLayout.astro
createAstro("https://globalindoperizinan.id");
var $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
	const Astro = $$result.createAstro($$props, $$slots);
	Astro.self = $$AdminLayout;
	const { title = "Admin Panel" } = Astro.props;
	return renderTemplate`<html lang="id"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><title>${title} — Ester Admin</title><meta name="robots" content="noindex, nofollow"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet">${renderHead($$result)}</head><body class="min-h-screen bg-paper-dim font-body antialiased">${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "C:/D/ester/ester-site/src/layouts/AdminLayout.astro", void 0);
//#endregion
export { $$AdminLayout as t };
