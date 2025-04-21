import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
      className="px-4 mb-4 max-w-3xl mx-auto pt-16">

      <form onSubmit={handleSubmit} className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-full shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 overflow-hidden">
        <input
          type="text"
          placeholder="Cari berita..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-2 bg-transparent text-sm text-gray-800 dark:text-gray-200 outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 text-indigo-600 dark:text-indigo-400 hover:text-indigo-800"
        >
          <Search className="w-5 h-5" />
        </button>
      </form>
    </motion.div>
  );
}
