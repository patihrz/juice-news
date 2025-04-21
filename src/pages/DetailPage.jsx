// src/pages/DetailPage.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Languages } from 'lucide-react';

export default function DetailPage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const article = state?.article;

  if (!article) return <p className="text-center mt-20">Berita tidak ditemukan 😢</p>;

  const { title, description, urlToImage, content, url, publishedAt } = article;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-all"
    >
      <div className="max-w-3xl mx-auto flex flex-col gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ArrowLeft size={18} /> Kembali
        </button>

        {urlToImage && (
          <img
            src={urlToImage}
            alt={title}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/fallback.jpg';
            }}
            className="rounded-xl w-full object-cover max-h-[300px]"
          />
        )}

        <h1 className="text-2xl font-bold leading-tight">{title}</h1>

        <p className="text-sm text-gray-500 dark:text-gray-400">
          Dipublikasikan: {new Date(publishedAt).toLocaleString()}
        </p>

        <p className="text-lg leading-relaxed">{description || 'Tidak ada deskripsi.'}</p>
        {content && <p className="text-base mt-2">{content}</p>}

        <div className="flex gap-3 mt-4 flex-wrap">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-full shadow transition"
          >
            <ExternalLink size={16} /> Baca di sumber asli
          </a>
          <a
            href={`https://translate.google.com/?sl=auto&tl=id&text=${encodeURIComponent(
              title + '\n\n' + (content || description)
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-full shadow hover:underline"
          >
            <Languages size={16} /> Translate
          </a>
        </div>
      </div>
    </motion.div>
  );
}
