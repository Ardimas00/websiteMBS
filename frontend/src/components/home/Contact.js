import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {

  return (
    <>
      <section id="kontak" className="py-20 px-6 md:px-16 bg-[#F8F9FA] min-h-[80vh] flex flex-col justify-center">
        <div className="max-w-7xl mx-auto w-full">
      <h2 className="text-4xl md:text-5xl font-extrabold text-[#1F2937] text-center mb-8" data-aos="fade-up" data-aos-delay="0" data-aos-duration="900">Hubungi Kami</h2>
      <p className="text-lg text-[#374151] text-center mb-10 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100" data-aos-duration="900">Ada pertanyaan atau ingin konsultasi produk? Silakan hubungi kami melalui form di bawah atau info kontak berikut.</p>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch">
        {/* Info Kontak, Alamat, Maps */}
        <div
          className="bg-white rounded-2xl shadow p-8 flex-1 min-w-[320px] flex flex-col justify-center"
          data-aos="fade-right" data-aos-delay="150"
          data-aos-duration="1000"
          data-aos-easing="ease-out-cubic"
        >
          <ul className="space-y-8">
            <li className="flex items-start gap-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D1FADF]">
                {/* Heroicons Map Pin */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-4.418 0-8-5.373-8-9a8 8 0 1 1 16 0c0 3.627-3.582 9-8 9Z"/><circle cx="12" cy="10" r="3"/></svg>
              </span>
              <div>
                <div className="font-semibold text-[#1F2937] mb-0.5">Alamat</div>
                <div className="text-[#6B7280] text-sm">Jalan Parit Haji Husin 2 Komplek Disbun 1B No.1<br/>Kelurahan Bangka Belitung Laut<br/>Kecamatan Pontianak Tenggara<br/>Pontianak, Kalimantan Barat</div>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D1FADF]">
                {/* Heroicons Envelope */}
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="1.8" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H4.5a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5H4.5A2.25 2.25 0 0 0 2.25 6.75m19.5 0-9.75 7.5-9.75-7.5"/></svg>
              </span>
              <div>
                <div className="font-semibold text-[#1F2937] mb-0.5">Email</div>
                <a href="mailto:info@ahdapupuk.com" className="text-[#6B7280] text-sm hover:underline">info@ahdapupuk.com</a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#D1FADF]">
                {/* WhatsApp Official Logo */}
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="16" cy="16" r="16" fill="#10B981"/>
                  <path d="M23.472 19.339c-.355-.177-2.104-1.038-2.43-1.157-.326-.119-.563-.177-.8.178-.237.355-.914 1.157-1.122 1.395-.208.237-.414.267-.769.089-.355-.178-1.5-.553-2.857-1.763-1.056-.943-1.77-2.104-1.977-2.459-.208-.355-.022-.546.156-.723.16-.159.355-.414.533-.622.178-.208.237-.355.355-.592.119-.237.06-.445-.03-.623-.089-.178-.8-1.924-1.096-2.639-.289-.692-.584-.597-.8-.609-.208-.009-.445-.011-.683-.011-.237 0-.622.089-.949.445-.326.355-1.24 1.211-1.24 2.959 0 1.749 1.269 3.437 1.447 3.674.178.237 2.502 3.825 6.063 5.216.847.366 1.507.584 2.023.747.85.271 1.624.233 2.237.142.682-.101 2.104-.86 2.402-1.693.297-.832.297-1.544.208-1.693-.089-.148-.326-.237-.681-.414z" fill="#fff"/>
                </svg>
              </span>
              <div>
                <div className="font-semibold text-[#1F2937] mb-0.5">WhatsApp</div>
                <a href="https://wa.me/6285784883400" className="text-[#6B7280] text-sm hover:underline">+62 857-8488-3400</a>
              </div>
            </li>
          </ul>
          <div className="mt-8">
            <div className="font-semibold text-lg text-[#1F2937] mb-2">Jam Operasional</div>
            <div className="text-[#374151] mb-4">Senin - Sabtu: 08.00 - 17.00 WIB</div>
            <a href="https://www.google.com/maps/place/0%C2%B005'21.2%22S+109%C2%B020'37.5%22E/@-0.089232,109.343751,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-0.089232!4d109.343751?entry=ttu" target="_blank" rel="noopener noreferrer" className="inline-block bg-[#10B981] hover:bg-green-700 text-white px-6 py-2 rounded-xl font-medium shadow transition mb-4">Buka di Google Maps</a>
            <div className="w-full h-48 md:h-56 rounded-2xl shadow-lg overflow-hidden">
              <iframe
                title="Lokasi Kami"
                src="https://www.google.com/maps?q=-0.089232,109.343751&hl=id&z=17&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
        {/* Form Kontak */}
        <div
          className="bg-white rounded-2xl shadow p-8 flex-1 min-w-[320px]"
          data-aos="fade-left"
          data-aos-delay="220"
          data-aos-duration="1000"
          data-aos-easing="ease-out-cubic"
        >
          <form className="flex flex-col gap-5" action="https://formsubmit.co/emyr@students.amikom.ac.id" method="POST">
            <label className="text-[#374151] font-medium mb-1">Nama Lengkap
              <input type="text" className="mt-1 w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#10B981] transition" placeholder="Nama Lengkap" required />
            </label>
            <label className="text-[#374151] font-medium mb-1">Email
              <input type="email" className="mt-1 w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#10B981] transition" placeholder="Email" required />
            </label>
            <label className="text-[#374151] font-medium mb-1">Pesan
              <textarea className="mt-1 w-full border border-gray-200 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#10B981] transition" placeholder="Pesan" rows="4" required></textarea>
            </label>
            <button type="submit" className="bg-[#10B981] hover:bg-green-700 text-white font-semibold rounded-lg py-3 mt-2 shadow-md transition">Kirim Pesan</button>
          </form>
        </div>
      </div>
    </div>
  </section>
  
    </>
  );
}

export default Contact;
