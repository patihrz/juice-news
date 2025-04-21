import { motion } from 'framer-motion';

const categories = [
  { key: '', label: 'Semua' },
  { key: 'technology', label: 'Teknologi' },
  { key: 'business', label: 'Bisnis' },
  { key: 'entertainment', label: 'Hiburan' },
  { key: 'health', label: 'Kesehatan' },
  { key: 'science', label: 'Sains' },
  { key: 'sports', label: 'Olahraga' },
  { key: 'mixed', label: 'Indonesia + Dunia' },
];

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="overflow-x-auto whitespace-nowrap px-4 py-4 scrollbar-hide"
    >
      <div className="inline-flex gap-3">
        {categories.map((cat) => {
          const isActive = selected === cat.key;
          return (
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              key={cat.key}
              onClick={() => onSelect(cat.key)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 border ${
                isActive
                  ? 'bg-indigo-600 text-white border-indigo-600'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              {cat.label}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
