                                    import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

// Fitur/Keunggulan perusahaan
const features = [
  {
    title: "Kualitas Premium",
    desc: "Formula teruji laboratorium untuk hasil optimal di setiap musim.",
    icon: (
      <span className="inline-flex items-center justify-center w-8 h-8 bg-[#D1FADF] rounded-full mb-2">
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <path d="M12 2c2.5 3.5 7 7.5 7 12a7 7 0 0 1-14 0c0-4.5 4.5-8.5 7-12Z" fill="#10B981"/>
          <circle cx="12" cy="14" r="3" fill="#fff"/>
        </svg>
      </span>
    ),
  },
  {
    title: "Ramah Lingkungan",
    desc: "Bahan organik berkelanjutan, mendukung pertanian hijau.",
    icon: (
      <span className="inline-flex items-center justify-center w-8 h-8 bg-[#D1FADF] rounded-full mb-2">
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <path d="M12 2c2 3.5 6 7.5 6 12a6 6 0 0 1-12 0c0-4.5 4-8.5 6-12Z" fill="#10B981"/>
        </svg>
      </span>
    ),
  },
  {
    title: "Hasil Maksimal",
    desc: "Meningkatkan produktivitas hingga 40% secara nyata.",
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
    title: "Dukungan Ahli",
    desc: "Konsultasi gratis dari tim agronomi berpengalaman.",
    icon: (
      <span className="inline-flex items-center justify-center w-8 h-8 bg-[#D1FADF] rounded-full mb-2">
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#10B981"/>
          <path d="M12 16v-4M12 8h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </span>
    ),
  },
];

const About = () => {

  return (
  <section id="tentang" className="min-h-screen py-20 px-6 md:px-16 bg-[#F8F9FA] flex items-center font-sans" data-aos="fade-up" data-aos-delay="0" data-aos-duration="900">
    <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row gap-10 md:gap-16">
      {/* Kiri: Konten */}
      <div className="md:basis-[45%] flex flex-col justify-center">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 text-[#1F2937]" data-aos="fade-up" data-aos-delay="0" data-aos-duration="900">Tentang Kami</h2>
        <p className="text-lg md:text-xl text-[#374151] mb-10 leading-relaxed" style={{lineHeight:1.6}} data-aos="fade-up" data-aos-delay="100" data-aos-duration="900">
          PT Pupuk Subur Makmur berkomitmen menjadi pelopor inovasi industri pupuk di Indonesia. Kami percaya bahwa pertanian sehat adalah fondasi ketahanan pangan nasional dan masa depan yang berkelanjutan.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10" data-aos="fade-up" data-aos-delay="200" data-aos-duration="900">
          {features.map((f, idx) => (
            <div key={idx} className="flex flex-col gap-2 bg-white rounded-2xl shadow p-6 h-full" data-aos="fade-up" data-aos-delay={300 + idx * 100} data-aos-duration="900">
              {f.icon}
              <div className="font-semibold text-[20px] text-[#1F2937]">{f.title}</div>
              <div className="text-[16px] text-[#6B7280]">{f.desc}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Kanan: Visual */}
      <div className="md:basis-[55%] flex items-center justify-center" data-aos="fade-up" data-aos-delay="500" data-aos-duration="900">
        <div className="relative w-full max-w-md aspect-[4/5] rounded-3xl shadow-xl overflow-hidden">
          <img
            src="/images/tentang.jpg"
            alt="Tentang Kami - PT Pupuk Subur Makmur"
            className="w-full h-full object-cover"
            style={{objectPosition:'center 70%'}}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10B981]/60 to-transparent"/>
        </div>
      </div>
    </div>
  </section>
  );
}

export default About;
