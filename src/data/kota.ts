export type Kota = {
  slug: string;
  nama: string;
  dinas: string;
  catatan: string;
  utama?: boolean;
};

export const daftarKota: Kota[] = [
  {
    slug: "surabaya",
    nama: "Surabaya",
    dinas: "Dinas Cipta Karya dan Tata Ruang Kota Surabaya",
    catatan:
      "Kepadatan bangunan komersial dan ruko di Surabaya membuat pemeriksaan KDB/KLB dan jalur evakuasi jadi perhatian utama pemeriksa teknis. Surabaya adalah basis utama tim kami, sehingga koordinasi dokumen dengan dinas teknis di sini yang paling cepat kami tangani.",
    utama: true,
  },
  {
    slug: "sidoarjo",
    nama: "Sidoarjo",
    dinas: "Dinas PUPR Kabupaten Sidoarjo",
    catatan:
      "Untuk kawasan industri dan pergudangan di Sidoarjo, rekomendasi peil banjir dan drainase biasanya jadi titik yang paling sering direvisi TPA/TPT.",
  },
  {
    slug: "gresik",
    nama: "Gresik",
    dinas: "Dinas PUPR Kabupaten Gresik",
    catatan:
      "Wilayah industri besar di Gresik membuat data teknis MEP, terutama proteksi kebakaran dan pengolahan limbah, mendapat sorotan lebih detail.",
  },
  {
    slug: "pasuruan",
    nama: "Pasuruan",
    dinas: "Dinas PUPR Kabupaten/Kota Pasuruan",
    catatan:
      "Banyak kawasan industri dan pergudangan baru di Pasuruan, sehingga kesesuaian PKKPR dan KRK dengan rencana tata ruang setempat perlu dicek sejak awal.",
  },
  {
    slug: "mojokerto",
    nama: "Mojokerto",
    dinas: "Dinas PUPR Kabupaten/Kota Mojokerto",
    catatan:
      "Pertumbuhan area hunian dan usaha kecil-menengah di Mojokerto membuat kelengkapan dokumen legalitas tanah jadi titik yang paling sering diminta lengkap ulang.",
  },
  {
    slug: "malang",
    nama: "Malang",
    dinas: "Dinas Perumahan, Kawasan Permukiman, dan Cipta Karya Kota Malang",
    catatan:
      "Banyak proyek hunian dan properti pendidikan di Malang, sehingga kesesuaian fungsi bangunan dengan RTRW jadi pemeriksaan yang ketat.",
  },
];
