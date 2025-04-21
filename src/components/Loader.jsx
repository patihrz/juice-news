import { motion } from 'framer-motion';

export default function Loader() {
  return (
    <motion.div
      className="text-center py-20 text-blue-600 text-xl font-medium"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      Loading berita...
    </motion.div>
  );
}
