const API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
const BASE_URL = 'https://gnews.io/api/v4';

export async function getTopHeadlines(category = '', page = 1) {
  const url = new URL(`${BASE_URL}/top-headlines`);
  url.searchParams.append('token', API_KEY);
  url.searchParams.append('lang', 'id');
  url.searchParams.append('max', 10);
  url.searchParams.append('page', page);

  // jika kategori tersedia, tambahkan sebagai q
  if (category) url.searchParams.append('topic', category);

  const res = await fetch(url);
  const data = await res.json();
  return data.articles || [];
}

export async function getMixedNews(page = 1) {
  const idNews = await getTopHeadlines('', page);
  const worldNews = await searchByQuery('berita dunia', page);
  const all = [...idNews, ...worldNews];
  return removeDuplicates(all);
}

export function removeDuplicates(articles) {
  const seen = new Set();
  return articles.filter((art) => {
    if (seen.has(art.title)) return false;
    seen.add(art.title);
    return true;
  });
}

export const searchByQuery = async (query) => {
    const res = await fetch(
      `https://gnews.io/api/v4/search?token=${API_KEY}&lang=id&max=10&q=${query}`
    );
    const json = await res.json();
    return json.articles || [];
  };