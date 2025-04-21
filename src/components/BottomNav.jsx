// src/components/BottomNav.jsx
import { NavLink } from 'react-router-dom';
import { Home, Search, Star, Settings } from 'lucide-react';

const links = [
  { to: '/', label: 'Beranda', icon: <Home size={20} /> },
  { to: '/search', label: 'Cari', icon: <Search size={20} /> },
  { to: '/bookmark', label: 'Favorit', icon: <Star size={20} /> },
  { to: '/settings', label: 'Setelan', icon: <Settings size={20} /> },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-800 shadow-inner border-t dark:border-gray-700 flex justify-center gap-6 py-2">
      {links.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 text-xs transition-colors duration-200 ${
              isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'
            }`
          }
        >
          {icon}
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

// Footer Component
export function Footer() {
  return (
    <footer className="text-center text-sm py-6 text-gray-400 dark:text-gray-500 mt-10">
      <p>
        📱 Versi 1.0 • Aplikasi berita oleh <strong>Patih Ramadika</strong>
      </p>
    </footer>
  );
}