import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const articles = [
  {
    slug: "kebun-sayur-pekarangan",
    title: "Cara Mudah Memulai Kebun Sayur di Pekarangan Rumah",
    desc: "Panduan langkah-langkah praktis menanam sayuran sendiri di lahan terbatas, cocok untuk pemula dan anak muda.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
    category: "Tips Praktis",
    date: "27 Juni 2025",
    content: (
      <>
        <p>Mulai dengan memilih jenis sayuran yang mudah tumbuh seperti kangkung, bayam, atau tomat. Gunakan pot atau polybag jika lahan terbatas. Pastikan media tanam gembur dan cukup sinar matahari. Siram secara rutin dan gunakan pupuk organik untuk hasil optimal.</p>
        <ul className="list-disc pl-6 my-3">
          <li>Pilih benih berkualitas dan media tanam subur</li>
          <li>Atur jadwal penyiraman, jangan terlalu basah</li>
          <li>Panen secara bertahap untuk konsumsi harian</li>
        </ul>
      </>
    )
  },
  {
    slug: "jenis-pupuk-hortikultura",
    title: "Mengenal Jenis Pupuk Dasar untuk Tanaman Hortikultura",
    desc: "Penjelasan singkat tentang pupuk organik dan anorganik, serta tips memilih pupuk yang tepat untuk hasil maksimal.",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80",
    category: "Panduan Pemupukan",
    date: "27 Juni 2025",
    content: (
      <>
        <p>Pupuk organik berasal dari bahan alami seperti kompos, sedangkan pupuk anorganik dibuat dari bahan kimia. Untuk hasil maksimal, kombinasikan keduanya sesuai kebutuhan tanaman.</p>
        <ul className="list-disc pl-6 my-3">
          <li>Gunakan pupuk organik untuk memperbaiki struktur tanah</li>
          <li>Pupuk anorganik cocok untuk kebutuhan unsur hara spesifik</li>
          <li>Baca label produk sebelum aplikasi</li>
        </ul>
      </>
    )
  },
  {
    slug: "tips-tanaman-buah-lebat",
    title: "Tips Merawat Tanaman Buah Agar Berbuah Lebat di Lahan Sempit",
    desc: "Tips praktis memilih varietas, pemangkasan, dan pemupukan agar tanaman buah tetap produktif meski di kebun kecil.",
    img: "https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?auto=format&fit=crop&w=400&q=80",
    category: "Tips Perkebunan",
    date: "27 Juni 2025",
    content: (
      <>
        <p>Pilih varietas buah yang cocok untuk pot atau lahan sempit seperti jeruk, jambu, atau stroberi. Lakukan pemangkasan rutin agar tanaman tidak rimbun dan tetap produktif.</p>
        <ul className="list-disc pl-6 my-3">
          <li>Pupuk secara teratur dengan dosis sesuai anjuran</li>
          <li>Jaga kelembapan tanah dan sinar matahari cukup</li>
          <li>Buang daun/ranting yang sakit agar tidak menular</li>
        </ul>
      </>
    )
  },
  {
    slug: "kompos-rumah-organik",
    title: "Panduan Singkat Membuat Kompos Sendiri di Rumah",
    desc: "Langkah-langkah sederhana membuat kompos dari sampah dapur dan kebun, ramah lingkungan dan hemat biaya.",
    img: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=400&q=80",
    category: "Organik & Lingkungan",
    date: "27 Juni 2025",
    content: (
      <>
        <p>Kumpulkan sampah organik seperti sisa sayuran, buah, dan daun kering. Tempatkan di wadah tertutup, aduk secara berkala, dan jaga kelembapan. Dalam 1-2 bulan, kompos siap digunakan untuk pupuk alami.</p>
        <ul className="list-disc pl-6 my-3">
          <li>Gunakan wadah berlubang agar sirkulasi udara baik</li>
          <li>Hindari sampah plastik atau daging</li>
          <li>Kompos matang ditandai warna gelap dan tidak bau</li>
        </ul>
      </>
    )
  },
  {
    slug: "kesalahan-pemula-berkebun",
    title: "5 Kesalahan Umum Pemula Saat Menanam & Cara Menghindarinya",
    desc: "Ringkasan kesalahan yang sering dilakukan pemula (penyiraman, pemupukan, pemilihan bibit, dsb) dan solusi mudahnya.",
    img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
    category: "Tips Praktis",
    date: "27 Juni 2025",
    content: (
      <>
        <ol className="list-decimal pl-6 my-3">
          <li>Terlalu sering menyiram hingga akar busuk</li>
          <li>Memilih bibit kurang sehat</li>
          <li>Pemupukan berlebihan atau kurang</li>
          <li>Tanaman kekurangan cahaya</li>
          <li>Kurang memperhatikan hama/penyakit</li>
        </ol>
        <p>Solusi: Ikuti panduan dasar, cek kondisi tanaman rutin, dan konsultasikan jika ragu.</p>
      </>
    )
  },
  {
    slug: "pupuk-organik-vs-anorganik",
    title: "Memahami Perbedaan Pupuk Organik dan Anorganik",
    desc: "Pelajari perbedaan mendasar antara pupuk organik dan anorganik, kelebihan, kekurangan, serta rekomendasi penggunaannya.",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
    category: "Pemupukan",
    date: "15 Juni 2023",
    content: (
      <>
        <p>Pupuk organik berasal dari bahan alami seperti kompos, pupuk kandang, dan sisa tanaman. Pupuk anorganik adalah pupuk buatan dari bahan kimia.</p>
        <ul className="list-disc pl-6 my-3">
          <li><b>Kelebihan Organik:</b> Ramah lingkungan, memperbaiki struktur tanah.</li>
          <li><b>Kekurangan Organik:</b> Unsur hara tidak selalu konsisten, butuh waktu lama.</li>
          <li><b>Kelebihan Anorganik:</b> Unsur hara spesifik, hasil cepat.</li>
          <li><b>Kekurangan Anorganik:</b> Dapat merusak tanah jika berlebihan.</li>
        </ul>
      </>
    )
  },
  {
    slug: "panduan-pemupukan-pemula",
    title: "Panduan Lengkap Pemupukan untuk Pemula",
    desc: "Ikuti panduan langkah demi langkah untuk pemupukan yang tepat, mulai dari pemilihan pupuk, dosis, hingga waktu aplikasi.",
    img: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80",
    category: "Panduan",
    date: "10 Juni 2023",
    content: (
      <>
        <ol className="list-decimal pl-6 my-3">
          <li>Pilih pupuk sesuai kebutuhan tanaman.</li>
          <li>Hitung dosis yang tepat.</li>
          <li>Aplikasikan secara merata.</li>
          <li>Perhatikan waktu pemupukan.</li>
        </ol>
      </>
    )
  },
  {
    slug: "keamanan-pupuk-tanaman-pangan",
    title: "Memastikan Keamanan Pupuk untuk Tanaman Pangan",
    desc: "Tips dan panduan memilih pupuk yang aman untuk tanaman pangan, termasuk cara aplikasi yang benar untuk hasil maksimal.",
    img: "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
    category: "Keamanan Pangan",
    date: "5 Juni 2023",
    content: (
      <>
        <p>Pilih pupuk yang telah bersertifikat dan aman untuk tanaman pangan. Ikuti petunjuk penggunaan pada label produk.</p>
      </>
    )
  }
];

const ArticleDetail = () => {
  const { slug } = useParams();
  useEffect(() => { AOS.init({ once: true, duration: 800 }); }, []);
  const article = articles.find(a => a.slug === slug);
  if (!article) {
    return <div className="py-20 text-center">Artikel tidak ditemukan.</div>;
  }
  return (
    <section className="py-20 px-6 md:px-16 bg-[#F8F9FA] min-h-[80vh] flex flex-col justify-center">
  <div className="max-w-3xl mx-auto w-full">
    <Link to="/artikel" className="inline-block mb-5 bg-[#10B981] hover:bg-green-700 text-white px-4 py-1.5 rounded-lg font-medium text-sm shadow transition">&larr; Kembali ke Daftar Artikel</Link>
    <img src={article.img} alt={article.title} className="w-full max-h-72 object-cover rounded-xl shadow mb-6 border border-gray-100" />
    <div className="text-xs text-gray-400 mb-2 flex items-center gap-2">
      <span>{article.category}</span>
      <span className="mx-1">•</span>
      <span>{article.date}</span>
    </div>
    <h1 className="font-extrabold text-2xl md:text-3xl mb-3 text-[#1F2937]">{article.title}</h1>
    <p className="text-[16px] text-[#6B7280] mb-6">{article.desc}</p>
    <div className="prose prose-green max-w-none mb-8 text-[#374151]">
      {article.content}
    </div>
  </div>
</section>
  );
};

export default ArticleDetail;
