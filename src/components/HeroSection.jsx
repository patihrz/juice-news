import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-center py-10 px-4 bg-gradient-to-r from-indigo-900 via-black to-indigo-900 text-white shadow-xl rounded-b-3xl"
    >
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-4xl sm:text-5xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600"
      >
        Portal Berita Masa Depan 🧠🚀
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="mt-4 text-lg sm:text-xl text-gray-300"
      >
        Tetap update dengan berita terkini dari Indonesia & seluruh dunia 🌍
      </motion.p>
    </motion.header>
  );
}
