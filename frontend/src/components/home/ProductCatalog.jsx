// src/components/home/ProductCatalog.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ProductCatalog() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // inisialisasi AOS
    AOS.init({ once: false, offset: 100, duration: 800, easing: 'ease-in-out', mirror: true });

    // fetch product dari backend
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Gagal memuat produk");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-20 px-6 md:px-16 bg-[#F8F9FA] min-h-[80vh] flex items-center justify-center">
        <p>Loading produk...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-6 md:px-16 bg-[#F8F9FA] min-h-[80vh] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section id="katalog" className="py-20 px-6 md:px-16 bg-[#F8F9FA] min-h-[80vh] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full">
        <h2
          className="text-4xl md:text-5xl font-extrabold text-[#1F2937] text-center mb-8"
          data-aos="fade-up" data-aos-delay="0" data-aos-duration="900"
        >
          Katalog Produk
        </h2>
        <p
          className="text-lg text-[#374151] text-center mb-10"
          data-aos="fade-up" data-aos-delay="100" data-aos-duration="900"
        >
          Temukan berbagai jenis pupuk berkualitas tinggi untuk kebutuhan pertanian Anda
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.slice(0, 3).map((p, idx) => (
            <div
              key={p._id || idx}
              className="bg-white rounded-2xl shadow p-6 flex flex-col h-full transition hover:shadow-xl"
              data-aos="fade-up"
              data-aos-delay={200 + idx * 100}
              data-aos-duration="1000"
              data-aos-easing="ease-out-cubic"
            >
              {p.imageUrl && (
                <img
                  src={
                    p.imageUrl.startsWith('http')
                      ? p.imageUrl
                      : `http://localhost:5000${p.imageUrl}`
                  }
                  alt={p.name}
                  className="w-full max-h-48 object-contain rounded-xl shadow-sm mb-6 bg-white border border-gray-100 p-2"
                />

              )}
              <div className="font-semibold text-[20px] text-[#1F2937] mb-2">{p.name}</div>
              <div className="text-[16px] text-[#6B7280] mb-2">{p.description}</div>
              <div className="text-[15px] text-[#374151] italic mb-5">{p.application}</div>
              <a
                href="#kontak"
                className="bg-[#10B981] hover:bg-green-700 text-white rounded-xl shadow px-6 py-2 font-medium mt-auto self-start transition"
              >
                Hubungi Kami
              </a>
            </div>
          ))}
        </div>

        {products.length > 3 && (
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
        )}
      </div>
    </section>
  );
}
