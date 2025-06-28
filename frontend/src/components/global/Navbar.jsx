import { useState } from "react";
import { HashLink as Link } from 'react-router-hash-link';
import AOS from "aos";
import "aos/dist/aos.css";

import { useEffect } from "react";

const Navbar = ({ openMenu, setOpenMenu }) => {
  useEffect(() => {
    AOS.init({ once: true, duration: 700 });
  }, []);
  const menuItems = [
    {label: 'Beranda', href: '#beranda', aosDelay: 100},
    {label: 'Tentang Kami', href: '#tentang', aosDelay: 200},
    {label: 'Katalog Produk', href: '#katalog', aosDelay: 300},
    {label: 'Artikel', href: '#artikel', aosDelay: 400},
    {label: 'Hubungi Kami', href: '#kontak', aosDelay: 500},
  ];

  return (
    <nav className="bg-black/30 backdrop-blur-md fixed w-full top-0 z-50 border-b border-white/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6">
        <Link to="/#beranda" className="flex items-center cursor-pointer select-none" style={{textDecoration: 'none'}}>
          <img src="/images/logo.png" alt="Logo MBS" className="h-14 w-auto mr-2" style={{maxHeight:'56px'}} />
        </Link>
        {/* Hamburger menu for mobile & tombol X close saat menu terbuka */}
        <button
  className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
  aria-label={openMenu ? "Tutup menu" : "Buka menu"}
  onClick={() => setOpenMenu(v => !v)}
  type="button"
>
  <span
    className={
      `block w-6 h-0.5 rounded transition-all duration-300 mb-1 ` +
      (openMenu ? 'rotate-45 translate-y-1.5 bg-green-500' : 'bg-white')
    }
  ></span>
  <span
    className={
      `block w-4 h-0.5 rounded transition-all duration-300 mb-1 mx-auto ` +
      (openMenu ? 'opacity-0 scale-x-0 bg-green-500' : 'bg-white')
    }
  ></span>
  <span
    className={
      `block w-6 h-0.5 rounded transition-all duration-300 ` +
      (openMenu ? '-rotate-45 -translate-y-1.5 bg-green-500' : 'bg-white')
    }
  ></span>
</button>
        {/* Desktop menu */}
        <ul className="hidden md:flex items-center space-x-6">
  {menuItems.map((item, idx) => (
    <li key={idx} className="h-full flex items-center"
        data-aos="fade-down"
        data-aos-delay={item.aosDelay}
        data-aos-duration="700"
        data-aos-easing="ease-out-cubic"
    >
      <Link
        to={`/${item.href}`}
        className="relative text-sm md:text-base font-medium text-white drop-shadow px-2 py-2 transition hover:text-green-400 after:content-[''] after:block after:h-[2px] after:w-0 hover:after:w-full after:bg-green-400 after:transition-all after:duration-300 after:rounded"
        style={{transition: 'color 0.3s'}}
        onClick={() => setOpenMenu && setOpenMenu(false)}
      >
        {item.label}
      </Link>
    </li>
  ))}
</ul>
        {/* Mobile menu */}
        <div
          className={`fixed inset-0 top-16 bg-black/60 z-40 transition-opacity duration-300 ${openMenu ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'} md:hidden`}
          onClick={() => setOpenMenu(false)}
        ></div>
        {/* Drawer menu mobile muncul di bawah nav, tidak menutupi nav */}
        <div className={`fixed right-0 top-16 w-80 max-w-xs z-40 transition-transform duration-300 md:hidden ${openMenu ? 'translate-x-0' : 'translate-x-full'}`}
          style={{transitionProperty: 'transform'}}
        >
          <ul className="flex flex-col space-y-2 px-6 py-4 bg-gray-50/95 rounded-lg shadow-lg mx-4 mt-6">
  {menuItems.map((item, idx) => (
    <li
      key={idx}
      className={`transform transition-all duration-500 ease-out ${openMenu ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}
      style={{ transitionDelay: openMenu ? `${idx * 80 + 100}ms` : '0ms' }}
    >
      <Link
        to={`/${item.href}`}
        className="block py-3 px-2 text-lg font-medium text-gray-800 hover:text-green-600 rounded transition"
        onClick={() => setOpenMenu(false)}
      >
        {item.label}
      </Link>
    </li>
  ))}
</ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
