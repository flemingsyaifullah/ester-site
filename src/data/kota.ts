export type Kota = {
  slug: string;
  nama: string;
  dinas: string;
  catatan: string;
  catatan_zh: string;
  utama?: boolean;
};

export const daftarKota: Kota[] = [
  {
    slug: "surabaya",
    nama: "Surabaya",
    dinas: "Dinas Cipta Karya dan Tata Ruang Kota Surabaya",
    catatan:
      "Kepadatan bangunan komersial dan ruko di Surabaya membuat pemeriksaan KDB/KLB dan jalur evakuasi jadi perhatian utama pemeriksa teknis. Surabaya adalah basis utama tim kami, sehingga koordinasi dokumen dengan dinas teknis di sini yang paling cepat kami tangani.",
    catatan_zh:
      "泗水的商业建筑和店屋密集，使得建筑容积率（KDB/KLB）及疏散通道检查成为技术审查员关注的重点。泗水是我们团队的主要基地，因此我们能以最快的速度协调与当地技术部门的审批文件。",
    utama: true,
  },
  {
    slug: "sidoarjo",
    nama: "Sidoarjo",
    dinas: "Dinas PUPR Kabupaten Sidoarjo",
    catatan:
      "Untuk kawasan industri dan pergudangan di Sidoarjo, rekomendasi peil banjir dan drainase biasanya jadi titik yang paling sering direvisi TPA/TPT.",
    catatan_zh:
      "对于诗都阿佐的工业和仓储区，防洪标高和排水建议通常是专家委员会（TPA/TPT）最常要求修改的地方。",
  },
  {
    slug: "gresik",
    nama: "Gresik",
    dinas: "Dinas PUPR Kabupaten Gresik",
    catatan:
      "Wilayah industri besar di Gresik membuat data teknis MEP, terutama proteksi kebakaran dan pengolahan limbah, mendapat sorotan lebih detail.",
    catatan_zh:
      "锦石的大型工业区使得机电（MEP）技术数据，尤其是消防系统和污水处理，受到更详细的审查。",
  },
  {
    slug: "pasuruan",
    nama: "Pasuruan",
    dinas: "Dinas PUPR Kabupaten/Kota Pasuruan",
    catatan:
      "Banyak kawasan industri dan pergudangan baru di Pasuruan, sehingga kesesuaian PKKPR dan KRK dengan rencana tata ruang setempat perlu dicek sejak awal.",
    catatan_zh:
      "巴苏鲁安有许多新的工业和仓储区，因此需要从一开始就检查空间规划一致性（PKKPR）和城市规划信息（KRK）是否符合当地的空间规划要求。",
  },
  {
    slug: "mojokerto",
    nama: "Mojokerto",
    dinas: "Dinas PUPR Kabupaten/Kota Mojokerto",
    catatan:
      "Pertumbuhan area hunian dan usaha kecil-menengah di Mojokerto membuat kelengkapan dokumen legalitas tanah jadi titik yang paling sering diminta lengkap ulang.",
    catatan_zh:
      "莫佐克托的住宅区和中小企业发展迅速，导致土地合法性文件成为最常被要求重新补充的地方。",
  },
  {
    slug: "malang",
    nama: "Malang",
    dinas: "Dinas Perumahan, Kawasan Permukiman, dan Cipta Karya Kota Malang",
    catatan:
      "Banyak proyek hunian dan properti pendidikan di Malang, sehingga kesesuaian fungsi bangunan dengan RTRW jadi pemeriksaan yang ketat.",
    catatan_zh:
      "玛琅有大量的住宅和教育物业项目，因此建筑功能与区域空间规划（RTRW）的一致性审查非常严格。",
  },
];
