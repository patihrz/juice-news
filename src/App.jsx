import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DetailPage from './pages/DetailPage';
import ThemeToggle from './components/ThemeToggle';
import BottomNav from './components/BottomNav';
import Bookmark from './pages/Bookmark';
import SearchPage from './pages/SearchPage';
import Settings from "./pages/Settings";

export default function App() {
  return (
    <>
      <ThemeToggle /> {/* ← ini diluar <Routes> supaya tampil di semua page */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detail" element={<DetailPage />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
      <BottomNav />
    </>
  );
}
