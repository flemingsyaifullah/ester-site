import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dashboardPath = path.join(__dirname, 'src/pages/admin-tz-7360/dashboard.astro');
let content = fs.readFileSync(dashboardPath, 'utf8');

// 1. Update Types and Data loading at the top
content = content.replace(
  `type Proyek  = { id: string; nama: string; nama_zh?: string; klien: string; klien_zh?: string; lokasi: string; lokasi_zh?: string; foto: string; fotoAlt: string; deskripsi: string; deskripsi_zh?: string; capaian: Capaian[] };`,
  `type Proyek  = { id: string; nama: string; nama_zh?: string; klien: string; klien_zh?: string; lokasi: string; lokasi_zh?: string; foto: string; fotoAlt: string; deskripsi: string; deskripsi_zh?: string; suspended?: boolean; capaian: Capaian[] };`
);

content = content.replace(
  `let proyek: Proyek | null = null;`,
  `let proyekList: Proyek[] = [];`
);

content = content.replace(
  `proyek = pd.proyek?.[0] ?? null;`,
  `proyekList = pd.proyek ?? [];`
);

// 2. Replace the HTML panel
const oldHtmlStart = `    <!-- ===== PANEL: PORTOFOLIO ===== -->`;
const oldHtmlEnd = `    <!-- ===== PANEL: HOMEPAGE STATS ===== -->`;

const newHtml = `    <!-- ===== PANEL: PORTOFOLIO ===== -->
    <section id="panel-portofolio" class="tab-panel">
      <div class="rounded-sm border-2 border-line bg-paper p-8">
        <div class="mb-6 flex items-center justify-between">
          <div>
            <p class="font-mono text-xs uppercase tracking-widest text-stamp">Proyek</p>
            <h2 class="mt-1 font-display text-xl font-bold text-ink">Manajemen Portofolio</h2>
          </div>
          <a href="/portofolio" target="_blank" class="font-mono text-xs text-slate underline underline-offset-2 hover:text-ink">
            Lihat halaman &rarr;
          </a>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 mb-6">
          <select id="portfolioSelect" class="flex-1 rounded-sm border-2 border-line bg-paper-dim px-4 py-2.5 font-body text-sm outline-none focus:border-blueprint text-ink">
            <option value="">-- Pilih Proyek untuk Diedit --</option>
            {proyekList.map(p => (
              <option value={p.id}>{p.nama}</option>
            ))}
          </select>
          <button id="newPortfolioBtn" type="button" class="rounded-sm border-2 border-ink bg-paper px-6 py-2.5 font-mono text-xs uppercase font-medium tracking-wider text-ink transition-colors hover:bg-ink hover:text-paper whitespace-nowrap">
            + Proyek Baru
          </button>
        </div>

        <form id="portfolioForm" class="hidden" novalidate>
          <input type="hidden" id="portfolioId" name="id" />
          <input type="hidden" id="portfolioIsNew" value="0" />

          <div class="mb-6">
            <label class="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" id="portfolioSuspended" name="suspended" class="w-5 h-5 rounded-sm border-line text-stamp focus:ring-stamp" />
              <span class="font-mono text-sm font-bold text-stamp">Sembunyikan Proyek (Suspend)</span>
            </label>
            <p class="mt-1 text-xs text-slate ml-8">Jika dicentang, proyek ini tidak akan ditampilkan di website.</p>
          </div>

          <div class="grid gap-5 sm:grid-cols-2">
            <div class="sm:col-span-2">
              <label class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate">Nama Proyek (ID)</label>
              <input id="portfolioNama" name="nama" type="text" class="mb-3 w-full rounded-sm border-2 border-line bg-paper-dim px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-blueprint" required />
              <label class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate">Nama Proyek (ZH)</label>
              <input id="portfolioNamaZh" name="nama_zh" type="text" class="w-full rounded-sm border-2 border-line bg-paper-dim px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-blueprint" />
            </div>

            <div>
              <label class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate">Klien (ID)</label>
              <input id="portfolioKlien" name="klien" type="text" class="mb-3 w-full rounded-sm border-2 border-line bg-paper-dim px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-blueprint" />
              <label class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate">Klien (ZH)</label>
              <input id="portfolioKlienZh" name="klien_zh" type="text" class="w-full rounded-sm border-2 border-line bg-paper-dim px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-blueprint" />
            </div>

            <div>
              <label class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate">Lokasi (ID)</label>
              <input id="portfolioLokasi" name="lokasi" type="text" class="mb-3 w-full rounded-sm border-2 border-line bg-paper-dim px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-blueprint" />
              <label class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate">Lokasi (ZH)</label>
              <input id="portfolioLokasiZh" name="lokasi_zh" type="text" class="w-full rounded-sm border-2 border-line bg-paper-dim px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-blueprint" />
            </div>

            <div class="sm:col-span-2">
              <label class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate">Deskripsi Proyek (ID)</label>
              <textarea id="portfolioDeskripsi" name="deskripsi" rows="4" class="mb-3 w-full rounded-sm border-2 border-line bg-paper-dim px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-blueprint resize-none"></textarea>
              <label class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate">Deskripsi Proyek (ZH)</label>
              <textarea id="portfolioDeskripsiZh" name="deskripsi_zh" rows="4" class="w-full rounded-sm border-2 border-line bg-paper-dim px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-blueprint resize-none"></textarea>
            </div>

            <!-- PBG -->
            <div class="sm:col-span-2 border-t border-line pt-5">
              <p class="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate">
                <span class="rounded-sm bg-blueprint px-2 py-0.5 text-paper">PBG</span>
                Capaian Persetujuan Bangunan Gedung
              </p>
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate">Label (ID)</label>
                  <input id="portfolioPbgLabel" name="pbg_label" type="text" class="mb-3 w-full rounded-sm border-2 border-line bg-paper-dim px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-blueprint" />
                  <label class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate">Label (ZH)</label>
                  <input id="portfolioPbgLabelZh" name="pbg_label_zh" type="text" class="w-full rounded-sm border-2 border-line bg-paper-dim px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-blueprint" />
                </div>
                <div class="sm:row-span-2">
                  <label class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate">Deskripsi Capaian (ID)</label>
                  <textarea id="portfolioPbgDesc" name="pbg_desc" rows="4" class="mb-3 w-full rounded-sm border-2 border-line bg-paper-dim px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-blueprint resize-none"></textarea>
                  <label class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate">Deskripsi Capaian (ZH)</label>
                  <textarea id="portfolioPbgDescZh" name="pbg_desc_zh" rows="4" class="w-full rounded-sm border-2 border-line bg-paper-dim px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-blueprint resize-none"></textarea>
                </div>
              </div>
            </div>

            <!-- SLF -->
            <div class="sm:col-span-2 border-t border-line pt-5">
              <p class="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-slate">
                <span class="rounded-sm bg-blueprint px-2 py-0.5 text-paper">SLF</span>
                Capaian Sertifikat Laik Fungsi
              </p>
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate">Label (ID)</label>
                  <input id="portfolioSlfLabel" name="slf_label" type="text" class="mb-3 w-full rounded-sm border-2 border-line bg-paper-dim px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-blueprint" />
                  <label class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate">Label (ZH)</label>
                  <input id="portfolioSlfLabelZh" name="slf_label_zh" type="text" class="w-full rounded-sm border-2 border-line bg-paper-dim px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-blueprint" />
                </div>
                <div class="sm:row-span-2">
                  <label class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate">Deskripsi Capaian (ID)</label>
                  <textarea id="portfolioSlfDesc" name="slf_desc" rows="4" class="mb-3 w-full rounded-sm border-2 border-line bg-paper-dim px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-blueprint resize-none"></textarea>
                  <label class="mb-1.5 block font-mono text-xs uppercase tracking-wider text-slate">Deskripsi Capaian (ZH)</label>
                  <textarea id="portfolioSlfDescZh" name="slf_desc_zh" rows="4" class="w-full rounded-sm border-2 border-line bg-paper-dim px-4 py-2.5 font-body text-sm text-ink outline-none transition-colors focus:border-blueprint resize-none"></textarea>
                </div>
              </div>
            </div>

            <!-- IMAGE UPLOAD -->
            <div class="sm:col-span-2 border-t border-line pt-5">
              <p class="mb-4 font-mono text-xs uppercase tracking-widest text-slate">Foto Proyek</p>
              <div class="flex flex-col gap-4 sm:flex-row sm:items-start">
                <div class="relative h-40 w-full overflow-hidden rounded-sm border-2 border-line sm:w-56 flex-shrink-0">
                  <img id="imgPreview" src="/images/prodia.jpg" alt="Preview foto proyek" class="h-full w-full object-cover" />
                </div>
                <div class="flex flex-col justify-center gap-3">
                  <input type="hidden" id="fotoPath" name="foto" value="/images/prodia.jpg" />
                  <label for="imageInput" class="cursor-pointer rounded-sm border-2 border-ink px-5 py-2.5 text-center font-mono text-xs font-medium uppercase tracking-wider text-ink transition-colors hover:bg-ink hover:text-paper">
                    Pilih Foto Baru
                  </label>
                  <input id="imageInput" type="file" accept="image/jpeg,image/png,image/webp" class="hidden" />
                  <p id="uploadStatus" class="font-mono text-xs text-slate">JPG / PNG / WebP, maks 5MB. <b>Auto-save</b> saat diupload.</p>
                </div>
              </div>
            </div>

          </div><!-- end grid -->

          <!-- Save status + button -->
          <div class="mt-8 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p id="portfolioStatus" class="font-mono text-xs text-slate"></p>
            <div class="flex flex-col sm:flex-row gap-3">
              <button type="button" id="deletePortfolioBtn" class="hidden rounded-sm border border-stamp px-6 py-3 font-mono text-sm font-medium uppercase tracking-wider text-stamp transition-opacity hover:bg-stamp hover:text-paper">
                Hapus
              </button>
              <button type="submit" id="savePortfolioBtn" class="rounded-sm bg-stamp px-8 py-3 font-mono text-sm font-medium uppercase tracking-wider text-paper transition-opacity hover:opacity-90 disabled:opacity-50">
                Simpan Proyek
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>

`;

const part1 = content.split(oldHtmlStart)[0];
const part2 = content.split(oldHtmlEnd)[1];
content = part1 + newHtml + oldHtmlEnd + part2;


// 3. Inject portfolioDataScript
content = content.replace(
  `<script id="blogDataScript" type="application/json" set:html={JSON.stringify(blogs)}></script>`,
  `<script id="portfolioDataScript" type="application/json" set:html={JSON.stringify(proyekList)}></script>\n<script id="blogDataScript" type="application/json" set:html={JSON.stringify(blogs)}></script>`
);

// 4. Update the Javascript for Portfolio
const oldJsStart = `/* ---- Save portfolio (extracted as function so bisa dipanggil dari mana saja) ---- */`;
const oldJsEnd = `/* ---- Save stats ---- */`;

const newJs = `/* ---- Portfolio JS ---- */
  let portfolioData = [];
  try {
    portfolioData = JSON.parse(document.getElementById('portfolioDataScript')?.textContent || '[]');
  } catch(e) {}

  const portfolioSelect = document.getElementById('portfolioSelect') as HTMLSelectElement;
  const newPortfolioBtn = document.getElementById('newPortfolioBtn') as HTMLButtonElement;
  const portfolioForm = document.getElementById('portfolioForm') as HTMLFormElement;
  const deletePortfolioBtn = document.getElementById('deletePortfolioBtn') as HTMLButtonElement;
  const savePortfolioBtn = document.getElementById('savePortfolioBtn') as HTMLButtonElement;
  const portfolioStatus = document.getElementById('portfolioStatus') as HTMLParagraphElement;

  function slugifyPort(text: string) {
    return text.toString().toLowerCase().replace(/\\s+/g, '-').replace(/[^\\w\\-]+/g, '').replace(/\\-\\-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
  }

  function renderPortfolioForm(proyek: any, isNew: boolean) {
    portfolioForm.classList.remove('hidden');
    (document.getElementById('portfolioIsNew') as HTMLInputElement).value = isNew ? '1' : '0';
    
    if (isNew) {
      deletePortfolioBtn.classList.add('hidden');
      (document.getElementById('portfolioId') as HTMLInputElement).value = '';
      (document.getElementById('portfolioSuspended') as HTMLInputElement).checked = false;
      
      ['Nama','NamaZh','Klien','KlienZh','Lokasi','LokasiZh','Deskripsi','DeskripsiZh','PbgLabel','PbgLabelZh','PbgDesc','PbgDescZh','SlfLabel','SlfLabelZh','SlfDesc','SlfDescZh'].forEach(field => {
        (document.getElementById('portfolio' + field) as HTMLInputElement).value = '';
      });
      (document.getElementById('portfolioPbgLabel') as HTMLInputElement).value = 'Persetujuan Bangunan Gedung';
      (document.getElementById('portfolioSlfLabel') as HTMLInputElement).value = 'Sertifikat Laik Fungsi';
      
      (document.getElementById('fotoPath') as HTMLInputElement).value = '/images/prodia.jpg';
      (document.getElementById('imgPreview') as HTMLImageElement).src = '/images/prodia.jpg';
    } else {
      deletePortfolioBtn.classList.remove('hidden');
      (document.getElementById('portfolioId') as HTMLInputElement).value = proyek?.id || '';
      (document.getElementById('portfolioSuspended') as HTMLInputElement).checked = !!proyek?.suspended;
      
      (document.getElementById('portfolioNama') as HTMLInputElement).value = proyek?.nama || '';
      (document.getElementById('portfolioNamaZh') as HTMLInputElement).value = proyek?.nama_zh || '';
      (document.getElementById('portfolioKlien') as HTMLInputElement).value = proyek?.klien || '';
      (document.getElementById('portfolioKlienZh') as HTMLInputElement).value = proyek?.klien_zh || '';
      (document.getElementById('portfolioLokasi') as HTMLInputElement).value = proyek?.lokasi || '';
      (document.getElementById('portfolioLokasiZh') as HTMLInputElement).value = proyek?.lokasi_zh || '';
      (document.getElementById('portfolioDeskripsi') as HTMLInputElement).value = proyek?.deskripsi || '';
      (document.getElementById('portfolioDeskripsiZh') as HTMLInputElement).value = proyek?.deskripsi_zh || '';
      
      const pbg = proyek?.capaian?.[0] || {};
      const slf = proyek?.capaian?.[1] || {};
      
      (document.getElementById('portfolioPbgLabel') as HTMLInputElement).value = pbg.label || 'Persetujuan Bangunan Gedung';
      (document.getElementById('portfolioPbgLabelZh') as HTMLInputElement).value = pbg.label_zh || '';
      (document.getElementById('portfolioPbgDesc') as HTMLInputElement).value = pbg.desc || '';
      (document.getElementById('portfolioPbgDescZh') as HTMLInputElement).value = pbg.desc_zh || '';
      
      (document.getElementById('portfolioSlfLabel') as HTMLInputElement).value = slf.label || 'Sertifikat Laik Fungsi';
      (document.getElementById('portfolioSlfLabelZh') as HTMLInputElement).value = slf.label_zh || '';
      (document.getElementById('portfolioSlfDesc') as HTMLInputElement).value = slf.desc || '';
      (document.getElementById('portfolioSlfDescZh') as HTMLInputElement).value = slf.desc_zh || '';

      (document.getElementById('fotoPath') as HTMLInputElement).value = proyek?.foto || '/images/prodia.jpg';
      (document.getElementById('imgPreview') as HTMLImageElement).src = proyek?.foto || '/images/prodia.jpg';
    }
    portfolioStatus.textContent = '';
  }

  portfolioSelect?.addEventListener('change', (e) => {
    const id = (e.target as HTMLSelectElement).value;
    if (!id) {
      portfolioForm.classList.add('hidden');
      return;
    }
    const proyek = portfolioData.find((p: any) => p.id === id);
    if (proyek) renderPortfolioForm(proyek, false);
  });

  newPortfolioBtn?.addEventListener('click', () => {
    portfolioSelect.value = '';
    renderPortfolioForm(null, true);
  });

  async function savePortfolio() {
    savePortfolioBtn.disabled = true;
    savePortfolioBtn.textContent = 'Menyimpan...';
    portfolioStatus.textContent = '';

    const fd = new FormData(portfolioForm);
    const isNew = fd.get('portfolioIsNew') === '1';
    let id = fd.get('id')?.toString() || '';
    if (isNew) id = slugifyPort(fd.get('nama')?.toString() || 'proyek-' + Date.now());

    const newProyek = {
      id: id,
      suspended: !!document.getElementById('portfolioSuspended')?.matches(':checked'),
      nama: fd.get('nama')?.toString() ?? '',
      nama_zh: fd.get('nama_zh')?.toString() ?? '',
      klien: fd.get('klien')?.toString() ?? '',
      klien_zh: fd.get('klien_zh')?.toString() ?? '',
      lokasi: fd.get('lokasi')?.toString() ?? '',
      lokasi_zh: fd.get('lokasi_zh')?.toString() ?? '',
      foto: fd.get('foto')?.toString() ?? '/images/prodia.jpg',
      fotoAlt: fd.get('nama')?.toString() ?? 'Foto proyek',
      deskripsi: fd.get('deskripsi')?.toString() ?? '',
      deskripsi_zh: fd.get('deskripsi_zh')?.toString() ?? '',
      capaian: [
        {
          kode: 'PBG',
          label: fd.get('pbg_label')?.toString() ?? 'Persetujuan Bangunan Gedung',
          label_zh: fd.get('pbg_label_zh')?.toString() ?? '',
          desc: fd.get('pbg_desc')?.toString() ?? '',
          desc_zh: fd.get('pbg_desc_zh')?.toString() ?? '',
        },
        {
          kode: 'SLF',
          label: fd.get('slf_label')?.toString() ?? 'Sertifikat Laik Fungsi',
          label_zh: fd.get('slf_label_zh')?.toString() ?? '',
          desc: fd.get('slf_desc')?.toString() ?? '',
          desc_zh: fd.get('slf_desc_zh')?.toString() ?? '',
        },
      ],
    };

    if (isNew) {
      portfolioData.push(newProyek);
    } else {
      const idx = portfolioData.findIndex((p: any) => p.id === id);
      if (idx !== -1) portfolioData[idx] = newProyek;
    }

    try {
      const res = await fetch('/api/save-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proyek: portfolioData }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        portfolioStatus.textContent = '✓ Tersimpan! Website akan diperbarui dalam ~1–2 menit.';
        if (isNew) {
          const opt = document.createElement('option');
          opt.value = id;
          opt.textContent = newProyek.nama;
          portfolioSelect.appendChild(opt);
          portfolioSelect.value = id;
          (document.getElementById('portfolioIsNew') as HTMLInputElement).value = '0';
          deletePortfolioBtn.classList.remove('hidden');
        }
      } else {
        portfolioStatus.textContent = \`✗ Gagal: \${data.error}\`;
      }
    } catch (err) {
      portfolioStatus.textContent = \`✗ Gagal: \${err}\`;
    } finally {
      savePortfolioBtn.disabled = false;
      savePortfolioBtn.textContent = 'Simpan Proyek';
    }
  }

  portfolioForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    savePortfolio();
  });

  deletePortfolioBtn?.addEventListener('click', async () => {
    if (!confirm('Yakin ingin menghapus secara PERMANEN proyek ini? Jika hanya ingin menyembunyikannya, centang opsi Suspend saja.')) return;
    const id = (document.getElementById('portfolioId') as HTMLInputElement).value;
    portfolioData = portfolioData.filter((p: any) => p.id !== id);
    
    deletePortfolioBtn.disabled = true;
    deletePortfolioBtn.textContent = 'Menghapus...';
    try {
      const res = await fetch('/api/save-portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ proyek: portfolioData }),
      });
      if (res.ok) {
        alert('Proyek berhasil dihapus.');
        window.location.reload();
      }
    } catch(e) {}
  });

  /* Upload foto: upload dulu, lalu set hidden input fotoPath, lalu kita tidak perlu auto-save, user yg save sendiri karena mungkin ada field lain yang mau diubah */
  const imageInput  = document.getElementById('imageInput') as HTMLInputElement;
  const imgPreview  = document.getElementById('imgPreview') as HTMLImageElement;
  const fotoPath    = document.getElementById('fotoPath') as HTMLInputElement;
  const uploadStatus = document.getElementById('uploadStatus') as HTMLParagraphElement;

  imageInput?.addEventListener('change', async () => {
    const file = imageInput.files?.[0];
    if (!file) return;

    imgPreview.src = URL.createObjectURL(file);
    uploadStatus.textContent = 'Mengupload foto...';

    const fd = new FormData();
    fd.append('image', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: fd
      });
      const data = await res.json();
      if (res.ok && data.url) {
        uploadStatus.textContent = '✓ Foto terupload! Jangan lupa Simpan Proyek.';
        fotoPath.value = data.url;
      } else {
        uploadStatus.textContent = \`✗ Gagal upload: \${data.error}\`;
      }
    } catch (e) {
      uploadStatus.textContent = '✗ Terjadi kesalahan sistem.';
    }
  });

  `;

const jsPart1 = content.split(oldJsStart)[0];
const jsPart2 = content.split(oldJsEnd)[1];
content = jsPart1 + newJs + oldJsEnd + jsPart2;


fs.writeFileSync(dashboardPath, content);
console.log('Portfolio CRUD Dashboard updated successfully!');
