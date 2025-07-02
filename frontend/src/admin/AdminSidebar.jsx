import { Link, useLocation } from 'react-router-dom';

export default function AdminSidebar() {
  const { pathname } = useLocation();
  const nav = [
    { label: 'Dashboard', path: '/admin' },
    { label: 'Manajemen Produk', path: '/admin/products' },
    { label: 'Manajemen Artikel', path: '/admin/articles' },
  ];
  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen flex flex-col py-6 px-4">
      <div className="mb-8 text-2xl font-bold tracking-wide text-center">Admin Panel</div>
      <nav className="flex-1 space-y-2">
        {nav.map(item => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-4 py-2 rounded-lg transition-colors font-medium ${pathname === item.path ? 'bg-gray-800 text-green-400' : 'hover:bg-gray-800'}`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
