                                    import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Fitur/Keunggulan perusahaan
const features = [
  {
    title: "Pengalaman Terpercaya",
    desc: "Telah melayani kebutuhan pertanian sejak 2021 dengan track record yang baik.",
    icon: (
      <span className="inline-flex items-center justify-center w-8 h-8 bg-[#D1FADF] rounded-full mb-2">
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#10B981"/>
          <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z" fill="#fff"/>
        </svg>
      </span>
    ),
  },
  {
    title: "Kualitas Terjamin",
    desc: "Semua produk telah tersertifikasi dan memenuhi standar kualitas nasional.",
    icon: (
      <span className="inline-flex items-center justify-center w-8 h-8 bg-[#D1FADF] rounded-full mb-2">
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#10B981"/>
          <path d="M8 14l2 2 4-4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    ),
  },
  {
    title: "Lokasi Strategis",
    desc: "Berlokasi di pusat kota Pontianak untuk kemudahan akses dan distribusi.",
    icon: (
      <span className="inline-flex items-center justify-center w-8 h-8 bg-[#D1FADF] rounded-full mb-2">
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#10B981"/>
          <path d="M12 8v4l3 3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    ),
  },
  {
    title: "Harga Kompetitif",
    desc: "Menawarkan harga yang bersaing dengan kualitas terbaik.",
    icon: (
      <span className="inline-flex items-center justify-center w-8 h-8 bg-[#D1FADF] rounded-full mb-2">
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#10B981"/>
          <path d="M8 16h8M12 8v8" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    ),
  },
];

const About = () => {

  return (
  <section id="tentang" className="min-h-screen py-20 px-6 md:px-16 bg-[#F8F9FA] flex items-center font-sans" data-aos="fade-up" data-aos-delay="0" data-aos-duration="900">
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-10 md:gap-16">
      {/* Atas: Gambar & Deskripsi sejajar */}
      <div className="flex flex-col md:flex-row gap-10 md:gap-16">
        {/* Deskripsi */}
        <div className="md:basis-[55%] flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-[#1F2937]" data-aos="fade-up" data-aos-delay="0" data-aos-duration="900">Tentang Kami</h2>
          <p className="text-lg md:text-xl text-[#374151] mb-4 leading-relaxed text-justify" style={{lineHeight:1.6}} data-aos="fade-up" data-aos-delay="100" data-aos-duration="900">
            PT Maju Berkah Santosa adalah perusahaan terpercaya di bidang pertanian yang melayani kebutuhan pupuk organik dan anorganik di Kalimantan Barat sejak 2021.
          </p>
          <p className="text-lg md:text-xl text-[#374151] mb-4 leading-relaxed text-justify" style={{lineHeight:1.6}} data-aos="fade-up" data-aos-delay="120" data-aos-duration="900">
            Berlokasi di Pontianak, kami berkomitmen menyediakan produk berkualitas tinggi dan solusi pertanian terbaik untuk meningkatkan produktivitas serta keberlanjutan pertanian.
          </p>
          <p className="text-lg md:text-xl text-[#374151] mb-0 leading-relaxed text-justify" style={{lineHeight:1.6}} data-aos="fade-up" data-aos-delay="140" data-aos-duration="900">
            Dengan dukungan tim berpengalaman dan layanan konsultasi, kami siap menjadi mitra utama petani, distributor, dan toko pertanian.
          </p>
        </div>
        {/* Gambar */}
        <div className="md:basis-[45%] flex items-center justify-center" data-aos="fade-up" data-aos-delay="500" data-aos-duration="900">
          <div className="relative w-full max-w-md aspect-square rounded-3xl shadow-xl overflow-hidden">
            <img
              src="/images/tentang.jpg"
              alt="Tentang Kami - PT Maju Berkah Santosa"
              className="w-full h-full object-cover"
              style={{objectPosition:'center 70%'}}
            />
          </div>
        </div>
      </div>
      {/* Bawah: Point-point keunggulan */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
        {features.map((f, idx) => (
          <div key={idx} className="flex flex-col gap-2 bg-white rounded-2xl shadow p-6 h-full" data-aos="fade-up" data-aos-delay={300 + idx * 100} data-aos-duration="900">
            {f.icon}
            <div className="font-semibold text-[20px] text-[#1F2937]">{f.title}</div>
            <div className="text-[16px] text-[#6B7280]">{f.desc}</div>
          </div>
        ))}
      </div>
    </div>
  </section>
  );
}

export default About;
