import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const CATEGORY_LIST = [
  "Semua",
  "PUPUK NPK",
  "PUPUK TUNGGAL",
  "PEMBENAH TANAH",
  "PUPUK MIKRO",
  "BIOLOGIS",
  "LAINNYA"
];

const otherProducts = [
  {
    title: "NPK Jati Wangi 13/6/27/4/0,65B",
    desc: "Kandungan: 13% Nitrogen, 6% Fosfor (P2O5), 27% Kalium (K2O), 4% Sulfur, 0,65% Boron. Pupuk majemuk dengan kandungan kalium tinggi, cocok untuk fase generatif tanaman (pembungaan dan pembuahan)",
    application: "Tanaman buah, sayuran saat berbuah, tanaman hias berbunga",
    image: "/images/products/Pupuk NPK Jati Wangi 13-6-27-4 Mg+0,65B.jpg",
    slug: "npk-jati-wangi-13-6-27-4-065b",
    category: "PUPUK NPK"
  },
  {
    title: "NPK Jati Wangi 12/12/17/2",
    desc: "Kandungan: 12% Nitrogen, 12% Fosfor, 17% Kalium, 2% Sulfur. Pupuk seimbang untuk pertumbuhan vegetatif dan generatif",
    application: "Pupuk dasar atau pemeliharaan rutin tanaman",
    image: "/images/products/Pupuk NPK JATIWANGI 12-12-17+2Mg0.jpeg",
    slug: "npk-jati-wangi-12-12-17-2",
    category: "PUPUK NPK"
  },
  {
    title: "NPK Jati Wangi 15/15/6/4",
    desc: "Kandungan: 15% Nitrogen, 15% Fosfor, 6% Kalium, 4% Sulfur. Tinggi N dan P, cocok untuk fase awal pertumbuhan dan pembentukan akar",
    application: "Bibit, tanaman muda, fase vegetatif awal",
    image: null,
    slug: "npk-jati-wangi-15-15-6-4",
    category: "PUPUK NPK"
  },
  {
    title: "NPK Mahkota 13/6/27/4/0,65B",
    desc: "Kandungan: 13% Nitrogen, 6% Fosfor (P2O5), 27% Kalium (K2O), 4% Sulfur, 0,65% Boron. Pupuk majemuk kalium tinggi, cocok untuk fase generatif",
    application: "Tanaman buah, sayuran saat berbuah, tanaman hias berbunga",
    image: "/images/products/NPK mahkota 13-6-27-4 + 0.65 B.webp",
    slug: "npk-mahkota-13-6-27-4-065b",
    category: "PUPUK NPK"
  },
  {
    title: "NPK Mesti Biru Laouying 16/16/16+TE",
    desc: "Kandungan: 16% N, 16% P, 16% K + Trace Elements (unsur mikro). Pupuk seimbang lengkap dengan unsur mikro",
    application: "Pupuk serbaguna untuk semua fase pertumbuhan",
    image: null,
    slug: "npk-mesti-biru-laouying-16-16-16te",
    category: "PUPUK NPK"
  },
  {
    title: "NITREA GRANUL (UREA)",
    desc: "Kandungan: 46% Nitrogen. Sumber nitrogen untuk pertumbuhan vegetatif (daun, batang)",
    application: "Fase vegetatif, tanaman hijau, rumput",
    image: "/images/products/NITREA GRANUL (UREA).png",
    slug: "nitrea-granul-urea",
    category: "PUPUK TUNGGAL"
  },
  {
    title: "KCL Belarus",
    desc: "Kandungan: 60% Kalium Chlorida. Sumber kalium untuk kualitas buah, ketahanan penyakit",
    application: "Tanaman buah, sayuran, fase generatif",
    image: "/images/products/KCL Belarus.jpeg",
    slug: "kcl-belarus",
    category: "PUPUK TUNGGAL"
  },
  {
    title: "Rock Phosphate Egypt",
    desc: "Kandungan: Fosfor alami (slow release). Sumber fosfor jangka panjang untuk akar dan bunga",
    application: "Pupuk dasar, tanah masam",
    image: "/images/products/ROCK PHOSPHATE EGYPT.jpg",
    slug: "rock-phosphate-egypt",
    category: "PUPUK TUNGGAL"
  },
  {
    title: "CaMg Jatibumi",
    desc: "Kandungan: Kalsium dan Magnesium. Memperbaiki pH tanah, struktur tanah, mencegah defisiensi Ca-Mg",
    application: "Tanah masam, tanaman yang butuh kalsium tinggi",
    image: null,
    slug: "camg-jatibumi",
    category: "PEMBENAH TANAH"
  },
  {
    title: "Magfora Dolomite Mesh 100",
    desc: "Kandungan: Kalsium Karbonat + Magnesium Karbonat. Menaikkan pH tanah masam, sumber Ca dan Mg",
    application: "Pengapuran tanah masam, mesh 100 = tekstur halus",
    image: null,
    slug: "magfora-dolomite-mesh-100",
    category: "PEMBENAH TANAH"
  },
  {
    title: "Borate (Boron)",
    desc: "Kandungan: Unsur Boron. Pembentukan dinding sel, pembuahan, transport gula",
    application: "Tanaman buah, sayuran berbuah, saat berbunga",
    image: null,
    slug: "borate-boron",
    category: "PUPUK MIKRO"
  },
  {
    title: "Pupuk Mikro Safa 24 (Cu 8% Zn 8% B 8%)",
    desc: "Kandungan: Tembaga, Seng, Boron masing-masing 8%. Mengatasi defisiensi unsur mikro, meningkatkan metabolisme",
    application: "Semprot daun, tanaman yang menunjukkan gejala defisiensi",
    image: null,
    slug: "pupuk-mikro-safa-24-cu8-zn8-b8",
    category: "PUPUK MIKRO"
  },
  {
    title: "Pupuk Mikro Majemuk Primatan (Cu Zn Fe B)",
    desc: "Kandungan: Tembaga, Seng, Besi, Boron. Lengkap untuk kebutuhan unsur mikro",
    application: "Pemeliharaan rutin, tanaman intensif",
    image: null,
    slug: "pupuk-mikro-majemuk-primatan-cu-zn-fe-b",
    category: "PUPUK MIKRO"
  },
  {
    title: "Mikoriza Mycopir (Ganoderma)",
    desc: "Kandungan: Jamur mikoriza dengan Ganoderma. Meningkatkan penyerapan hara, ketahanan tanaman",
    application: "Saat tanam, tanaman keras, perkebunan",
    image: null,
    slug: "mikoriza-mycopir-ganoderma",
    category: "BIOLOGIS"
  },
  {
    title: "Fungisida Ganoderma Hyphos 45",
    desc: "Kandungan: Bahan aktif antijamur untuk Ganoderma. Mengendalikan penyakit jamur Ganoderma",
    application: "Tanaman yang terserang atau pencegahan",
    image: null,
    slug: "fungisida-ganoderma-hyphos-45",
    category: "BIOLOGIS"
  },

];



const OtherProducts = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);

  const filteredProducts = activeCategory === "Semua"
    ? otherProducts
    : otherProducts.filter(p => p.category === activeCategory);

  return (
    <section className="py-20 md:py-28 bg-gray-50 min-h-[80vh] flex flex-col justify-center" data-aos="fade-up" data-aos-delay="0">
      <div className="max-w-7xl mx-auto px-4">
        <h2 data-aos="fade-up" data-aos-delay="0" className="text-3xl md:text-4xl font-bold text-center mb-4 text-black">Produk Lainnya</h2>
        <p className="text-gray-500 text-center mb-10" data-aos="fade-up" data-aos-delay="100">Lihat berbagai bahan untuk kebutuhan pertanian Anda</p>
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {CATEGORY_LIST.map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full border text-sm font-semibold transition-all duration-200 ${activeCategory === cat ? 'bg-[#10B981] text-white border-[#10B981]' : 'bg-white text-[#10B981] border-[#10B981] hover:bg-[#10B981] hover:text-white'}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProducts.map((p, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl shadow p-6 flex flex-col h-full transition hover:shadow-xl"
              data-aos="fade-up"
              data-aos-delay={200 + idx * 100}
              data-aos-duration="1000"
              data-aos-easing="ease-out-cubic"
            >
              {p.image && (
                <img src={p.image} alt={p.title} className="w-full max-h-48 object-contain rounded-xl shadow-sm mb-6 bg-white border border-gray-100 p-2" />
              )}
              <div className="font-semibold text-[20px] text-[#1F2937] mb-2">
                <Link to={`/produk/${p.slug}`} className="hover:underline">
                  {p.title}
                </Link>
              </div>
              <div className="text-[16px] text-[#6B7280] mb-2">{p.desc}</div>
              {p.application && (
                <div className="text-[15px] text-[#374151] italic mb-5">{p.application}</div>
              )}
              <a href="#kontak" className="bg-[#10B981] hover:bg-green-700 text-white rounded-xl shadow px-6 py-2 font-medium mt-auto self-start transition">Hubungi Kami</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OtherProducts;
