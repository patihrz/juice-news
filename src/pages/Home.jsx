import { useEffect, useState } from 'react';
import { getTopHeadlines, searchByQuery, getMixedNews } from '../api/newsApi';
import NewsCard from '../components/NewsCard';
import CategoryFilter from '../components/CategoryFilter';
import Loader from '../components/Loader';
import { motion } from 'framer-motion';
import SearchBar from '../components/SearchBar';
import HeroSection from '../components/HeroSection';
import ScrollToTop from '../components/ScrollToTop';
import { Footer } from '../components/BottomNav';

const CACHE_DURATION = 60 * 60 * 1000; // 1 jam

const getCacheKey = (category, searchQuery, dateFilter, language) =>
  `news-${category}-${searchQuery}-${dateFilter}-${language}`;

const getCache = (key) => {
  const cached = localStorage.getItem(key);
  if (!cached) return null;
  const { data, timestamp } = JSON.parse(cached);
  const expired = Date.now() - timestamp > CACHE_DURATION;
  return expired ? null : data;
};

const setCache = (key, data) => {
  localStorage.setItem(key, JSON.stringify({ data, timestamp: Date.now() }));
};

export default function Home() {
  const [category, setCategory] = useState('mixed');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);
  const [dateFilter, setDateFilter] = useState('');
  const [language, setLanguage] = useState('id');

  useEffect(() => {
    const fetchNews = async () => {
      const cacheKey = getCacheKey(category, searchQuery, dateFilter, language);
      const cached = getCache(cacheKey);
      if (cached) {
        console.log('💾 Load from cache:', cacheKey);
        setArticles(cached);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        let data = [];

        if (searchQuery) {
          data = await searchByQuery(searchQuery, 1, language);
        } else if (category === 'mixed') {
          data = await getMixedNews(1, language);
        } else {
          data = await getTopHeadlines(category, 1, language);
        }

        let filtered = data;
        if (dateFilter) {
          const now = new Date();
          filtered = data.filter((item) => {
            const published = new Date(item.publishedAt);
            if (dateFilter === 'today') return published.toDateString() === now.toDateString();
            if (dateFilter === 'week') {
              const oneWeekAgo = new Date();
              oneWeekAgo.setDate(now.getDate() - 7);
              return published >= oneWeekAgo;
            }
            if (dateFilter === 'month') {
              const oneMonthAgo = new Date();
              oneMonthAgo.setMonth(now.getMonth() - 1);
              return published >= oneMonthAgo;
            }
            return true;
          });
        }

        setArticles(filtered);
        setCache(cacheKey, filtered);
        setPage(2);
      } catch (error) {
        console.error('❌ Error fetching news:', error);
      }

      setLoading(false);
    };

    fetchNews();
  }, [category, dateFilter, searchQuery, language]);

  useEffect(() => {
    const handleScroll = async () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
        !loading &&
        !isFetching
      ) {
        setIsFetching(true);

        const nextData = searchQuery
          ? await searchByQuery(searchQuery, page, language)
          : category === 'mixed'
          ? await getMixedNews(page, language)
          : await getTopHeadlines(category, page, language);

        setArticles((prev) => [...prev, ...nextData]);
        setPage((prev) => prev + 1);
        setIsFetching(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [searchQuery, category, page, loading, isFetching, language]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-colors duration-500">
      <HeroSection />
      <ScrollToTop />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-20 backdrop-blur-md bg-opacity-90 bg-white dark:bg-gray-900 shadow-md"
      >
        <SearchBar onSearch={setSearchQuery} />

        <div className="flex justify-center mt-2 gap-4 flex-wrap">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-3 py-1 text-gray-800 dark:text-gray-100 hover:border-indigo-400 transition"
          >
            <option value="">Semua Tanggal</option>
            <option value="today">Hari Ini</option>
            <option value="week">Minggu Ini</option>
            <option value="month">Bulan Ini</option>
          </select>
        </div>

        <CategoryFilter selected={category} onSelect={setCategory} />
      </motion.div>

      {loading ? (
        <Loader />
      ) : articles.length === 0 ? (
        <p className="text-center text-red-500 text-lg mt-8 animate-pulse">⚠️ Tidak ada berita ditemukan.</p>
      ) : (
        <motion.section
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {articles.map((article, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="relative"
            >
              <NewsCard article={article} />
              <a
                href={`https://translate.google.com/?sl=auto&tl=id&text=${encodeURIComponent(article.title + '\n\n' + article.description || '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-2 right-2 bg-white dark:bg-gray-800 text-xs text-blue-500 px-2 py-1 rounded shadow hover:underline"
              >
                🌐 Translate
              </a>
            </motion.div>
          ))}
        </motion.section>
      )}

      {isFetching && <Loader />}
      <div className="h-20" />

      <Footer />
    </div>
  );
}
