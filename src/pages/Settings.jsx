import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Moon, Sun } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function Settings() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const current = localStorage.getItem('theme') || 'light';
    setIsDark(current === 'dark');
  }, []);

  const toggleDark = () => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
    setIsDark(!isDark);

    toast.success(
      isDark ? '☀️ Mode terang diaktifkan' : '🌙 Mode gelap diaktifkan',
      {
        style: {
          background: isDark ? '#f9fafb' : '#1f2937',
          color: isDark ? '#111827' : '#f3f4f6',
        },
      }
    );
  };

  const clearBookmarks = () => {
    localStorage.removeItem('bookmarked');

    const isDark = document.documentElement.classList.contains('dark');
    toast('🗑️ Semua bookmark dihapus!', {
      icon: <Trash2 className="text-red-500" />,
      style: {
        background: isDark ? '#1f2937' : '#fff',
        color: isDark ? '#f3f4f6' : '#111827',
        border: '1px solid',
        borderColor: isDark ? '#ef4444' : '#dc2626',
        fontWeight: 'bold',
        marginBottom: '4.5rem',
      },
    });
  };

  return (
    <motion.div
      className="min-h-screen pb-28 px-6 pt-6 bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-2xl font-bold mb-6">⚙️ Pengaturan</h1>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
            Mode Gelap
          </span>
          <button
            onClick={toggleDark}
            className="px-4 py-1.5 rounded bg-blue-500 hover:bg-blue-600 text-white transition"
          >
            {isDark ? 'Nonaktifkan' : 'Aktifkan'}
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Trash2 size={18} /> Hapus Semua Bookmark
          </span>
          <button
            onClick={clearBookmarks}
            className="px-4 py-1.5 rounded bg-red-500 hover:bg-red-600 text-white transition"
          >
            Hapus
          </button>
        </div>
      </div>

      {/* Footer Info */}
      <div className="fixed bottom-16 left-0 w-full text-center text-sm text-gray-500 dark:text-gray-400 px-4">
        📱 Versi 1.0 • Aplikasi berita oleh <strong>Patih Ramadika</strong>
      </div>
    </motion.div>
  );
}
