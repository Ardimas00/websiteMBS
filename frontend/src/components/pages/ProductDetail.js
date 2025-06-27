import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// Data produk utama dan produk lainnya
const defaultProducts = [
  {
    slug: "pupuk-organik-granul",
    name: "Pupuk Organik Granul",
    desc: "Pupuk organik berbahan dasar kotoran hewan yang sudah difermentasi, kaya akan unsur hara makro dan mikro.",
    img: "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
    detail: "Pupuk Organik Granul sangat baik untuk memperbaiki struktur tanah, meningkatkan kapasitas tukar kation, dan menyediakan unsur hara secara bertahap. Cocok untuk segala jenis tanaman dan ramah lingkungan."
  },
  {
    slug: "pupuk-npk-16-16-16",
    name: "Pupuk NPK 16-16-16",
    desc: "Pupuk majemuk dengan kandungan Nitrogen, Fosfor, dan Kalium seimbang untuk pertumbuhan optimal tanaman.",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    detail: "NPK 16-16-16 memberikan keseimbangan nutrisi untuk pertumbuhan daun, akar, dan buah. Dapat diaplikasikan untuk berbagai tanaman pangan dan hortikultura."
  },
  {
    slug: "pupuk-cair-organik",
    name: "Pupuk Cair Organik",
    desc: "Pupuk cair kaya nutrisi yang mudah diserap tanaman, cocok untuk aplikasi daun dan tanah.",
    img: "https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=600&q=80",
    detail: "Pupuk cair ini mempercepat penyerapan nutrisi oleh tanaman, meningkatkan pertumbuhan, dan memperbaiki kualitas hasil panen."
  }
];

const otherProducts = [
  {
    slug: "pupuk-kompos-premium",
    name: "Pupuk Kompos Premium",
    desc: "Kompos berkualitas tinggi untuk memperbaiki struktur tanah dan meningkatkan kesuburan.",
    img: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
    detail: "Kompos ini membantu meningkatkan aktivitas mikroba tanah, memperbaiki aerasi, dan mengurangi kebutuhan pupuk kimia."
  },
  {
    slug: "pupuk-hayati",
    name: "Pupuk Hayati",
    desc: "Mengandung mikroorganisme bermanfaat untuk meningkatkan kesehatan tanah dan tanaman.",
    img: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
    detail: "Pupuk hayati memperbaiki kesuburan tanah secara alami dan meningkatkan ketahanan tanaman terhadap penyakit."
  },
  {
    slug: "pupuk-urea",
    name: "Pupuk Urea",
    desc: "Sumber nitrogen utama untuk pertumbuhan vegetatif tanaman dengan cepat.",
    img: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=600&q=80",
    detail: "Urea sangat efektif untuk tanaman yang membutuhkan banyak nitrogen pada fase pertumbuhan awal."
  }
];

const allProducts = [...defaultProducts, ...otherProducts];

const ProductDetail = () => {
  const { slug } = useParams();
  useEffect(() => {
    AOS.init({ once: true, duration: 800 });
  }, []);
  const product = allProducts.find((p) => p.slug === slug);
  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-4">Produk tidak ditemukan</h2>
        <Link to="/produk-lainnya" className="text-green-600 hover:underline">Kembali ke Produk Lainnya</Link>
      </div>
    );
  }
  return (
    <section className="py-20 md:py-28 bg-gray-50 min-h-[80vh] flex flex-col justify-center" data-aos="fade-up">
      <div className="max-w-3xl mx-auto px-4 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
        <img src={product.img} alt={product.name} className="w-full h-64 object-cover object-center rounded-xl mb-8" />
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">{product.name}</h1>
        <p className="text-gray-600 text-lg mb-4">{product.desc}</p>
        <div className="text-gray-700 mb-8 whitespace-pre-line">{product.detail}</div>
        <Link to="#kontak" className="bg-green-600 hover:bg-green-700 text-white py-2 px-8 rounded-xl font-medium text-base text-center transition">Hubungi Kami</Link>
        <div className="mt-8">
          <Link to="/produk-lainnya" className="text-green-600 hover:underline">&larr; Kembali ke Produk Lainnya</Link>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
