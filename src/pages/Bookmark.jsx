import { useEffect, useState } from 'react';
import NewsCard from '../components/NewsCard';
import { motion } from 'framer-motion';

export default function BookmarkPage() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    // Cek localStorage
    const saved = JSON.parse(localStorage.getItem('bookmarked')) || [];
    setBookmarks(saved);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">📌 Berita yang Disimpan</h1>

      {bookmarks.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-3xl">😅</p>
          <p className="mt-2">Belum ada berita yang disimpan</p>
        </div>
      ) : (
        <motion.section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {bookmarks.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <NewsCard article={article} />
            </motion.div>
          ))}
        </motion.section>
      )}
    </div>
  );
}
