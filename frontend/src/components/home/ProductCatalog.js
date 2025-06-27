import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const products = [
  {
    title: "NPK Jati Wangi 13/6/27/4/0,65B",
    desc: "Kandungan: 13% Nitrogen, 6% Fosfor (P2O5), 27% Kalium (K2O), 4% Sulfur, 0,65% Boron. Pupuk majemuk dengan kandungan kalium tinggi, cocok untuk fase generatif tanaman (pembungaan dan pembuahan)",
    application: "Tanaman buah, sayuran saat berbuah, tanaman hias berbunga",
    image: "/images/products/Pupuk NPK Jati Wangi 13-6-27-4 Mg+0,65B.jpg"
  },
  {
    title: "NPK Jati Wangi 12/12/17/2",
    desc: "Kandungan: 12% Nitrogen, 12% Fosfor, 17% Kalium, 2% Sulfur. Pupuk seimbang untuk pertumbuhan vegetatif dan generatif",
    application: "Pupuk dasar atau pemeliharaan rutin tanaman",
    image: "/images/products/Pupuk NPK JATIWANGI 12-12-17+2Mg0.jpeg"
  },
  {
    title: "NPK Jati Wangi 15/15/6/4",
    desc: "Kandungan: 15% Nitrogen, 15% Fosfor, 6% Kalium, 4% Sulfur. Tinggi N dan P, cocok untuk fase awal pertumbuhan dan pembentukan akar",
    application: "Bibit, tanaman muda, fase vegetatif awal",
    image: null 
  },
  {
    title: "NPK Mahkota 13/6/27/4/0,65B",
    desc: "Kandungan: 13% Nitrogen, 6% Fosfor (P2O5), 27% Kalium (K2O), 4% Sulfur, 0,65% Boron. Pupuk majemuk kalium tinggi, cocok untuk fase generatif",
    application: "Tanaman buah, sayuran saat berbuah, tanaman hias berbunga",
    image: "/images/products/NPK mahkota 13-6-27-4 + 0.65 B.webp"
  },
  {
    title: "NPK Mesti Biru Laouying 16/16/16+TE",
    desc: "Kandungan: 16% N, 16% P, 16% K + Trace Elements (unsur mikro). Pupuk seimbang lengkap dengan unsur mikro",
    application: "Pupuk serbaguna untuk semua fase pertumbuhan",
    image: null 
  },
  {
    title: "NITREA GRANUL (UREA)",
    desc: "Kandungan: 46% Nitrogen. Sumber nitrogen untuk pertumbuhan vegetatif (daun, batang)",
    application: "Fase vegetatif, tanaman hijau, rumput",
    image: "/images/products/NITREA GRANUL (UREA).png"
  },
  {
    title: "KCL Belarus",
    desc: "Kandungan: 60% Kalium Chlorida. Sumber kalium untuk kualitas buah, ketahanan penyakit",
    application: "Tanaman buah, sayuran, fase generatif",
    image: "/images/products/KCL Belarus.jpeg"
  },
  {
    title: "Rock Phosphate Egypt",
    desc: "Kandungan: Fosfor alami (slow release). Sumber fosfor jangka panjang untuk akar dan bunga",
    application: "Pupuk dasar, tanah masam",
    image: "/images/products/ROCK PHOSPHATE EGYPT.jpg"
  },
  {
    title: "CaMg Jatibumi",
    desc: "Kandungan: Kalsium dan Magnesium. Memperbaiki pH tanah, struktur tanah, mencegah defisiensi Ca-Mg",
    application: "Tanah masam, tanaman yang butuh kalsium tinggi",
    image: null 
  },
  {
    title: "Magfora Dolomite Mesh 100",
    desc: "Kandungan: Kalsium Karbonat + Magnesium Karbonat. Menaikkan pH tanah masam, sumber Ca dan Mg",
    application: "Pengapuran tanah masam, mesh 100 = tekstur halus",
    image: null 
  },
  {
    title: "Borate (Boron)",
    desc: "Kandungan: Unsur Boron. Pembentukan dinding sel, pembuahan, transport gula",
    application: "Tanaman buah, sayuran berbuah, saat berbunga",
    image: null 
  },
  {
    title: "Pupuk Mikro Safa 24 (Cu 8% Zn 8% B 8%)",
    desc: "Kandungan: Tembaga, Seng, Boron masing-masing 8%. Mengatasi defisiensi unsur mikro, meningkatkan metabolisme",
    application: "Semprot daun, tanaman yang menunjukkan gejala defisiensi",
    image: null 
  },
  {
    title: "Pupuk Mikro Majemuk Primatan (Cu Zn Fe B)",
    desc: "Kandungan: Tembaga, Seng, Besi, Boron. Lengkap untuk kebutuhan unsur mikro",
    application: "Pemeliharaan rutin, tanaman intensif",
    image: null 
  },
  {
    title: "Mikoriza Mycopir (Ganoderma)",
    desc: "Kandungan: Jamur mikoriza dengan Ganoderma. Meningkatkan penyerapan hara, ketahanan tanaman",
    application: "Saat tanam, tanaman keras, perkebunan",
    image: null 
  },
  {
    title: "Fungisida Ganoderma Hyphos 45",
    desc: "Kandungan: Bahan aktif antijamur untuk Ganoderma. Mengendalikan penyakit jamur Ganoderma",
    application: "Tanaman yang terserang atau pencegahan",
    image: null 
  },
  {
    title: "Pupuk Cair Organik",
    desc: "Pupuk cair kaya nutrisi yang mudah diserap tanaman, cocok untuk aplikasi daun dan tanah.",
    image: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=600&q=80"
  }
];

const ProductCatalog = () => {

  return (
    <section id="katalog" className="py-20 px-6 md:px-16 bg-[#F8F9FA] min-h-[80vh] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <h2 className="text-4xl md:text-5xl font-extrabold text-[#1F2937] text-center mb-8" data-aos="fade-up" data-aos-delay="0" data-aos-duration="900">Katalog Produk</h2>
        <p className="text-lg text-[#374151] text-center mb-10" data-aos="fade-up" data-aos-delay="100" data-aos-duration="900">Temukan berbagai jenis pupuk berkualitas tinggi untuk kebutuhan pertanian Anda</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.slice(0, 3).map((p, idx) => (
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
              <div className="font-semibold text-[20px] text-[#1F2937] mb-2">{p.title}</div>
              <div className="text-[16px] text-[#6B7280] mb-2">{p.desc}</div>
              <div className="text-[15px] text-[#374151] italic mb-5">{p.application}</div>
              <a href="#kontak" className="bg-[#10B981] hover:bg-green-700 text-white rounded-xl shadow px-6 py-2 font-medium mt-auto self-start transition">Hubungi Kami</a>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <a
            href="/produk-lainnya"
            className="bg-[#10B981] hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium text-base text-center shadow transition"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            Produk Lainnya
          </a>
        </div>
      </div>
    </section>
  );
}

export default ProductCatalog;
