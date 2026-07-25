# Ester Globalindo - Project Rules & Context (AGENTS Memory)

## 🏢 Project Identity
- **Name:** Ester Globalindo
- **Business:** Konsultan pengurusan perizinan Persetujuan Bangunan Gedung (PBG) dan Sertifikat Laik Fungsi (SLF).
- **Target Area:** Surabaya & seluruh Jawa Timur.
- **Language:** Bilingual (Indonesian `id` as default, Mandarin `zh-cn`).

## 🛠️ Tech Stack & Architecture
- **Framework:** Astro (Static Site Generation).
- **Styling:** Tailwind CSS (v4/Vite).
- **Hosting/Deployment:** Vercel (Auto-deploy from `main` branch).
- **Interactivity:** Vanilla JavaScript inside Astro `<script>` tags (No React/Vue/Svelte needed unless explicitly requested).
- **Data/CMS:** Content is managed via JSON files in `src/data/` (e.g., `news.json`, `portfolio2.json`).

## 🌍 i18n (Bilingual) Rules
- **Routing:** Indonesian pages are in the root `src/pages/` (e.g., `jasa-pbg.astro`). Mandarin pages are duplicated under `src/pages/zh-cn/`.
- **Utils:** Use `getLangFromUrl` and `useTranslatedPath` from `src/i18n/utils.ts` for dynamic language switching.
- **Links:** ALL internal links in the Header/Footer must use `translatePath(href)` to maintain the user's selected language.

## 🔎 SEO Strict Guidelines
- **Canonical URLs:** Must NEVER have a trailing slash. Logic is handled centrally in `src/layouts/Layout.astro`.
- **Language Switcher:** Links in `src/components/LangSwitcher.astro` must also strip trailing slashes (`.replace(/\/$/, "")`).
- **Head Tags:** Every page inherits `<link rel="alternate" hreflang="...">` and dynamic `og:locale` from `Layout.astro`. DO NOT hardcode these in individual pages.
- **Structured Data:** LocalBusiness JSON-LD is embedded in `Layout.astro`.

## 🌳 Git & Workflow Conventions
- **Branches:** `main` is production (triggers Vercel). `dev` is the working branch.
- **Workflow:** Always work on `dev`, pull rebase from `main` to catch CMS updates, push to `dev`, and then push/merge to `main`.
- **Commits:** Use Conventional Commits (`feat:`, `fix:`, `chore:`, dll).

## 💻 Development Commands
- When starting the dev server, use background mode: `npx astro dev --background`
- Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.
- Full documentation: https://docs.astro.build
