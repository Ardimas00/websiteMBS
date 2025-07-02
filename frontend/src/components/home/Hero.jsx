import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Hero = () => {


  return (
    <section
      id="beranda"
      className="relative min-h-[70vh] flex items-center justify-start bg-cover bg-center"
      style={{
        backgroundImage:
          "url('/images/banner.jpg')"
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16 py-20 md:py-32">
        <h1
          className="text-4xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-lg"
          data-aos="fade-up"
          data-aos-delay="0"
          data-aos-duration="900"
        >
          Meningkatkan Kualitas Tanaman Anda dengan<br />Pupuk Berkualitas
        </h1>
        <p
          className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl"
          data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000"
        >
          Kami menyediakan berbagai jenis pupuk pilihan untuk membantu meningkatkan pertumbuhan, ketahanan, dan produktivitas tanaman Anda secara&nbsp;maksimal.
        </p>
        <div className="flex gap-4 mb-8 flex-wrap">
          <a
            href="#katalog"
            className="bg-[#10B981] hover:bg-green-700 text-white px-8 py-3 rounded-xl font-semibold shadow transition"
            data-aos="fade-up"
            data-aos-delay="600"
            data-aos-duration="900"
            data-aos-easing="ease-out-cubic"
          >
            Lihat Produk
          </a>
          <a
            href="#kontak"
            className="bg-white border border-[#10B981] text-[#10B981] hover:bg-[#10B981] hover:text-white px-8 py-3 rounded-xl font-semibold shadow transition"
            data-aos="fade-up"
            data-aos-delay="700"
            data-aos-duration="900"
            data-aos-easing="ease-out-cubic"
          >
            Hubungi Kami
          </a>
        </div>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-20 flex justify-center w-full pointer-events-none">
        <span className="animate-bounce text-white/80 text-3xl">↓</span>
      </div>
    </section>
  );
};

export default Hero;
