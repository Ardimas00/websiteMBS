import './index.css';
import Navbar from './components/global/Navbar';
import Hero from "./components/home/Hero";
import About from "./components/home/About";
import ProductCatalog from "./components/home/ProductCatalog";
import Articles from "./components/home/Articles";
import Contact from "./components/home/Contact";
import Footer from './components/global/Footer';
import OtherProducts from './components/pages/OtherProducts';
import ProductDetail from './components/pages/ProductDetail';
import ArticlesList from './components/pages/ArticlesList';
import ArticleDetail from './components/pages/ArticleDetail';
import AOS from 'aos';

import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AdminArticles from './admin/AdminArticles';

function AppContent() {
  const [openMenu, setOpenMenu] = useState(false);
  const location = useLocation();

  const hideNavbarPaths = ['/login', '/admin', '/admin/articles'];

  useEffect(() => {
    AOS.init({
      once: false,
      offset: 100,
      duration: 800,
      easing: 'ease-in-out',
      mirror: true
    });
    AOS.refresh();
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden ">
      {!hideNavbarPaths.includes(location.pathname) && (
        <Navbar openMenu={openMenu} setOpenMenu={setOpenMenu} />
      )}

      {openMenu && (
        <div
          className="fixed inset-0 top-16 bg-black/60 z-40 transition-opacity duration-300 md:hidden opacity-100 pointer-events-auto"
          onClick={() => setOpenMenu(false)}
        ></div>
      )}

      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <ProductCatalog />
            <Articles />
            <Contact />
            <Footer />
          </>
        } />

        <Route path="/produk-lainnya" element={<OtherProducts />} />
        <Route path="/produk/:slug" element={<ProductDetail />} />
        <Route path="/artikel" element={<ArticlesList />} />
        <Route path="/artikel/:slug" element={<ArticleDetail />} />

        {/* Admin Pages */}
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/articles" element={<AdminArticles />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
