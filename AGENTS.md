# Ester Globalindo - Project Rules & Context (AGENTS Memory)

## 🏢 Project Identity
- **Name:** Ester Globalindo
- **Business:** Konsultan pengurusan perizinan Persetujuan Bangunan Gedung (PBG) dan Sertifikat Laik Fungsi (SLF).
- **Target Area:** Surabaya & seluruh Jawa Timur.
- **Language:** Bilingual — Indonesian (`id`) as default, Mandarin (`zh-cn`).

---

## 🛠️ Tech Stack
- **Framework:** Astro (Static Site Generation, `output: static`)
- **Styling:** Tailwind CSS v4 (Vite plugin)
- **Hosting:** Vercel — auto-deploy from `main` branch
- **Interactivity:** Vanilla JS inside Astro `<script>` tags only (NO React/Vue/Svelte unless explicitly asked)
- **CMS / Data:** JSON files in `src/data/` (e.g., `news.json`, `portfolio2.json`) — edited via Admin panel

---

## 🗺️ Critical File Map
```
src/
├── pages/                  ← Indonesian (ID) pages
│   ├── index.astro         ← Homepage ID
│   ├── jasa-pbg.astro      ← Service page PBG
│   ├── jasa-slf.astro      ← Service page SLF
│   ├── blog/               ← Blog ID
│   ├── berita/             ← Berita ID
│   ├── area-layanan/       ← Area pages ID
│   ├── portofolio-2.astro
│   ├── brosur.astro
│   └── tentang-kami.astro
│   └── zh-cn/              ← Mandarin (ZH) pages — MIRROR of above
│       ├── index.astro
│       ├── jasa-pbg.astro
│       ├── jasa-slf.astro
│       ├── blog/
│       ├── berita/
│       ├── area-layanan/
│       └── ... (same structure)
├── layouts/
│   └── Layout.astro        ← MASTER layout: canonical, og:locale, hreflang, JSON-LD
├── components/
│   └── LangSwitcher.astro  ← Language switcher (strips trailing slash)
├── i18n/
│   └── utils.ts            ← getLangFromUrl, useTranslatedPath
└── data/
    ├── news.json           ← Berita content (edited via CMS)
    └── portfolio2.json     ← Portfolio content (edited via CMS)
```

---

## ⚠️ CRITICAL RULES — Must Never Forget

### 1. BILINGUAL TWIN RULE
> **EVERY page, component, or content change MUST be applied to BOTH:**
> - `src/pages/[page].astro` (Indonesian)
> - `src/pages/zh-cn/[page].astro` (Mandarin)
>
> If you create a NEW page, you MUST create both. No exceptions.
> Mandarin translations for UI text must be accurate Chinese, not placeholders.

### 2. SEO — Canonical & Trailing Slash
> - Canonical URLs MUST NEVER have a trailing slash.
> - This is handled automatically in `src/layouts/Layout.astro` via `Astro.url.pathname`.
> - DO NOT add `path` prop or hardcode canonical URLs in individual pages.
> - `LangSwitcher.astro` strips trailing slash: `.replace(/\/$/, "")`.

### 3. SEO — og:locale & hreflang
> - `og:locale` is DYNAMIC in `Layout.astro`: `lang === 'zh-cn' ? 'zh_CN' : 'id_ID'`
> - `hreflang` tags (id, zh-cn, x-default) are ALL in `Layout.astro`. DO NOT add to individual pages.

### 4. Internal Links MUST Use translatePath
> All internal `<a href>` links in Header/Footer/Nav must use `translatePath(href)` from `i18n/utils.ts` to preserve the user's active language.

---

## 🔁 Content Pattern: Array-Based Page Content
Service pages (`jasa-pbg.astro`, `jasa-slf.astro`) use arrays in the frontmatter for checklist items:
```astro
---
const syarat = [
  "Item 1",
  "Item 2",
  // add new items here
];
const dataTeknis = [
  { kategori: "Arsitektur", items: ["...", "..."] },
  { kategori: "Struktur",   items: ["...", "..."] },
  { kategori: "MEP",        items: ["...", "..."] },
];
---
```
When adding/editing checklist items, edit the arrays — never hardcode in the HTML template below.

---

## 🌳 Git Workflow — Step-by-Step (Follow This Order Exactly)

### For every change request:
```bash
# 1. Make your code changes on local `dev` branch
# 2. Commit changes
git commit -am "feat|fix|chore: description"

# 3. Fetch latest from main (catches CMS updates from Admin panel)
git fetch origin main

# 4. Rebase on top of latest main (avoids merge conflicts)
git rebase origin/main

# 5. Push to remote dev
git push origin dev

# 6. Push to remote main (triggers Vercel deploy)
git push origin dev:main
```

> ⚠️ NEVER push directly without fetching/rebasing first. Admin CMS updates `news.json` / `portfolio2.json` on `main` regularly. Always rebase to include those updates before pushing.

---

## 💻 Development Commands
```bash
# Start dev server (background mode)
npx astro dev

# Run locally
npm run dev
```
Full docs: https://docs.astro.build

---

## ✅ Change Request Checklist (Run Through This Every Time)
Before pushing, verify:
- [ ] Change applied to **ID page** (`src/pages/`)
- [ ] Change applied to **ZH page** (`src/pages/zh-cn/`) with accurate Mandarin translation
- [ ] No hardcoded canonical/og:locale/hreflang added to individual pages
- [ ] Internal links use `translatePath(href)`
- [ ] `git fetch origin main` + `git rebase origin/main` done before push
- [ ] Pushed to both `origin dev` and `origin dev:main` (Vercel)
