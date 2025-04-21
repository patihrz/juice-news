// src/pages/SearchPage.jsx
import { useState } from 'react';
import { motion } from 'framer-motion';
import NewsCard from '../components/NewsCard';
import Loader from '../components/Loader';
import { searchByQuery } from '../api/newsApi';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);

    try {
      const data = await searchByQuery(query);
      setResults(data);
    } catch (err) {
      console.error('❌ Error search:', err);
    }

    setLoading(false);
  };

  return (
    <motion.div
      className="min-h-screen px-4 py-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h1 className="text-center text-2xl font-bold mb-4">Cari Berita 🔍</h1>

      <form onSubmit={handleSearch} className="flex justify-center mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Masukkan kata kunci..."
          className="w-full max-w-md p-2 rounded-l border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm"
        />
        <button
          type="submit"
          className="px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-r"
        >
          Cari
        </button>
      </form>

      {loading ? (
        <Loader />
      ) : (
        <motion.section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
        >
          {results.map((article, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
            >
              <NewsCard article={article} />
            </motion.div>
          ))}
        </motion.section>
      )}
    </motion.div>
  );
}
