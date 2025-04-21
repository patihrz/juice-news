import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function NewsCard({ article }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('bookmarked')) || [];
    setBookmarked(saved.some((a) => a.url === article.url));
  }, [article.url]);

  const handleBookmark = (e) => {
    e.preventDefault(); // prevent <Link> redirect

    const saved = JSON.parse(localStorage.getItem('bookmarked')) || [];
    const isSaved = saved.some((a) => a.url === article.url);

    const isDark = document.documentElement.classList.contains('dark');

    if (!isSaved) {
      saved.push(article);
      localStorage.setItem('bookmarked', JSON.stringify(saved));
      setBookmarked(true);

      toast('✅ Ditambahkan ke Bookmark', {
        duration: 2500,
        style: {
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#ffffff' : '#1f2937',
          border: '1px solid',
          borderColor: isDark ? '#4f46e5' : '#6366f1',
        },
        icon: '🔖',
      });
    } else {
      const filtered = saved.filter((a) => a.url !== article.url);
      localStorage.setItem('bookmarked', JSON.stringify(filtered));
      setBookmarked(false);

      toast('❌ Dihapus dari Bookmark', {
        duration: 2500,
        style: {
          background: isDark ? '#1f2937' : '#ffffff',
          color: isDark ? '#ffffff' : '#1f2937',
          border: '1px solid',
          borderColor: isDark ? '#dc2626' : '#ef4444',
        },
        icon: '🗑️',
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      whileHover={{ scale: 1.03 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden flex flex-col transition-all duration-300 border border-transparent hover:border-indigo-400"
    >
      <Link to="/detail" state={{ article }} className="flex flex-col flex-1 relative">
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="h-48 w-full object-cover rounded-t-2xl"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/fallback.jpg';
            }}
          />
        )}

        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          className="absolute bottom-2 right-2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow z-0"
        >
          {bookmarked ? (
            <BookmarkCheck className="text-indigo-500" />
          ) : (
            <Bookmark className="text-gray-600 dark:text-gray-200" />
          )}
        </button>

        <div className="p-4 flex flex-col justify-between h-full">
          <h2 className="font-semibold text-lg text-gray-800 dark:text-gray-100 line-clamp-2 mb-2">
            {article.title}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
            {article.description || 'Tidak ada deskripsi.'}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
