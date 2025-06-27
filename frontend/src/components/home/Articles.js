import { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const articles = [
  {
    slug: "kebun-sayur-pekarangan",
    title: "Cara Mudah Memulai Kebun Sayur di Pekarangan Rumah", 
    title: "Cara Mudah Memulai Kebun Sayur di Pekarangan Rumah",
    desc: "Panduan langkah-langkah praktis menanam sayuran sendiri di lahan terbatas, cocok untuk pemula dan anak muda.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    category: "Tips Praktis",
    date: "27 Juni 2025"
  },
  {
    slug: "jenis-pupuk-hortikultura",
    title: "Mengenal Jenis Pupuk Dasar untuk Tanaman Hortikultura",
    desc: "Penjelasan singkat tentang pupuk organik dan anorganik, serta tips memilih pupuk yang tepat untuk hasil maksimal.",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    category: "Panduan Pemupukan",
    date: "27 Juni 2025"
  },
  {
    slug: "tips-tanaman-buah-lebat",
    title: "Tips Merawat Tanaman Buah Agar Berbuah Lebat di Lahan Sempit",
    desc: "Tips praktis memilih varietas, pemangkasan, dan pemupukan agar tanaman buah tetap produktif meski di kebun kecil.",
    img: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80",
    category: "Tips Perkebunan",
    date: "27 Juni 2025"
  },
  {
    slug: "kompos-rumah-organik",
    title: "Panduan Singkat Membuat Kompos Sendiri di Rumah",
    desc: "Langkah-langkah sederhana membuat kompos dari sampah dapur dan kebun, ramah lingkungan dan hemat biaya.",
    img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
    category: "Organik & Lingkungan",
    date: "27 Juni 2025"
  },
  {
    slug: "kesalahan-pemula-berkebun",
    title: "5 Kesalahan Umum Pemula Saat Menanam & Cara Menghindarinya",
    desc: "Ringkasan kesalahan yang sering dilakukan pemula (penyiraman, pemupukan, pemilihan bibit, dsb) dan solusi mudahnya.",
    img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
    category: "Tips Praktis",
    date: "27 Juni 2025"
  },
  {
    slug: "pupuk-organik-vs-anorganik",
    title: "Memahami Perbedaan Pupuk Organik dan Anorganik",
    desc: "Pelajari perbedaan mendasar antara pupuk organik dan anorganik, kelebihan, kekurangan, serta rekomendasi penggunaannya.",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    category: "Pemupukan",
    date: "15 Juni 2023"
  },
  {
    slug: "panduan-pemupukan-pemula",
    title: "Panduan Lengkap Pemupukan untuk Pemula",
    desc: "Ikuti panduan langkah demi langkah untuk pemupukan yang tepat, mulai dari pemilihan pupuk, dosis, hingga waktu aplikasi.",
    img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    category: "Panduan",
    date: "10 Juni 2023"
  },
  {
    slug: "keamanan-pupuk-tanaman-pangan",
    title: "Memastikan Keamanan Pupuk untuk Tanaman Pangan",
    desc: "Tips dan panduan memilih pupuk yang aman untuk tanaman pangan, termasuk cara aplikasi yang benar untuk hasil maksimal.",
    img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
    category: "Keamanan Pangan",
    date: "5 Juni 2023"
  }
];

const Articles = () => {


  return (
  <section id="artikel" className="py-20 px-6 md:px-16 bg-[#F8F9FA] min-h-[80vh] flex flex-col justify-center">
    <div className="max-w-7xl mx-auto w-full">
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#1F2937] text-center mb-8" data-aos="fade-up" data-aos-delay="0" data-aos-duration="900">Artikel & Panduan</h2>
      <p className="text-lg text-[#374151] text-center mb-10" data-aos="fade-up" data-aos-delay="100" data-aos-duration="900">Temukan informasi dan panduan lengkap seputar pertanian dan pemupukan</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {articles.slice(0,3).map((a, idx) => (
  <div
    key={a.slug || idx}
    className="bg-white rounded-2xl shadow p-6 flex flex-col h-full transition hover:shadow-xl"
    data-aos="fade-up"
    data-aos-delay={100 + idx * 100}
    data-aos-duration="900"
  >
    <img
      src={a.img}
      alt={a.title}
      className="w-full aspect-[4/3] object-cover rounded-xl shadow-sm mb-6"
    />
    <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
      <span>{a.category}</span>
      <span className="mx-1">•</span>
      <span>{a.date}</span>
    </div>
    <div className="font-semibold text-[20px] text-[#1F2937] mb-2">{a.title}</div>
    <div className="text-[16px] text-[#6B7280] mb-5 line-clamp-2">{a.desc}</div>
    <Link
      to={a.slug ? `/artikel/${a.slug}` : '#'}
      className="text-[#10B981] hover:underline font-medium inline-flex items-center gap-1 mt-auto transition"
    >
      Baca Selengkapnya
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-4 h-4 ml-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M17.25 12H6.75m7.5 0l-3-3m3 3l-3 3"
        />
      </svg>
    </Link>
  </div>
))}
      </div>
      <div className="flex justify-center mt-8">
        <Link
          to="/artikel"
          className="bg-[#10B981] hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium text-base text-center shadow transition"
          data-aos="fade-up" data-aos-delay="200" data-aos-duration="900"
        >
          Lihat Semua Artikel
        </Link>
      </div>
    </div>
  </section>
  );
}

export default Articles;
