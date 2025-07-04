import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const CATEGORY_LIST = [
  "Semua",
  "PUPUK NPK",
  "PUPUK TUNGGAL",
  "PEMBENAH TANAH",
  "PUPUK MIKRO",
  "BIOLOGIS",
  "LAINNYA"
];

const OtherProducts = () => {
  const [activeCategory, setActiveCategory] = useState("Semua");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ once: true, duration: 800 });

    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Gagal memuat produk:", err);
        setError("Gagal memuat produk");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts =
    activeCategory === "Semua"
      ? products
      : products.filter((p) => p.category === activeCategory);

  if (loading) {
    return (
      <section className="py-20 px-6 md:px-16 bg-gray-50 min-h-[80vh] flex items-center justify-center">
        <p>Loading produk...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-6 md:px-16 bg-gray-50 min-h-[80vh] flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </section>
    );
  }

  return (
    <section
      className="py-20 md:py-28 bg-gray-50 min-h-[80vh] flex flex-col justify-center"
      data-aos="fade-up"
    >
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-black">
          Produk Lainnya
        </h2>
        <p
          className="text-gray-500 text-center mb-10"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Lihat berbagai bahan untuk kebutuhan pertanian Anda
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-10">
          {CATEGORY_LIST.map((cat) => (
            <button
              key={cat}
              className={`px-5 py-2 rounded-full border text-sm font-semibold transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-[#10B981] text-white border-[#10B981]"
                  : "bg-white text-[#10B981] border-[#10B981] hover:bg-[#10B981] hover:text-white"
              }`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <p className="text-center text-gray-400">Tidak ada produk dalam kategori ini.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.map((p, idx) => (
              <div
                key={p._id}
                className="bg-white rounded-2xl shadow p-6 flex flex-col h-full transition hover:shadow-xl"
                data-aos="fade-up"
                data-aos-delay={200 + idx * 100}
              >
                {p.imageUrl && (
                  <img
                    src={
                      p.imageUrl.startsWith("http")
                        ? p.imageUrl
                        : `http://localhost:5000${p.imageUrl}`
                    }
                    alt={p.name}
                    className="w-full max-h-48 object-contain rounded-xl shadow-sm mb-6 bg-white border border-gray-100 p-2"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                )}
                <div className="font-semibold text-[20px] text-[#1F2937] mb-2">
                  <Link to={`/produk/${p.slug || p._id}`} className="hover:underline">
                    {p.name}
                  </Link>
                </div>
                <div className="text-[16px] text-[#6B7280] mb-5">
                  {p.description}
                </div>
                <a
                  href={`https://wa.me/6282351138808?text=${encodeURIComponent(`halo, saya tertarik dengan produk ${p.name}. Mohon informasinya lebih lanjut, terima kasih.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#10B981] hover:bg-green-700 text-white rounded-xl shadow px-6 py-2 font-medium mt-auto self-start transition"
                >
                  Hubungi Kami
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OtherProducts;
