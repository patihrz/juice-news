📱 Juice News
Juice News adalah aplikasi berita modern berbasis React yang menampilkan informasi terkini dari berbagai kategori — dengan desain futuristik, full animasi, dan pengalaman baca yang nyaman.

🎯 Fokus utama: menyajikan berita lokal dan dunia yang informatif dan interaktif untuk pengguna Indonesia.

🔗 Lihat Live Website

🚀 Fitur Unggulan
✅ Berita Terkini dari berbagai topik: teknologi, olahraga, hiburan, sains, bisnis.

🔍 Pencarian Cepat berita dengan tampilan real-time.

🌗 Mode Gelap & Terang yang bisa diubah langsung.

📌 Bookmark Berita favorit ke halaman tersendiri.

🔄 Infinite Scroll untuk pengalaman membaca tanpa batas.

🌐 Terjemahkan Berita via Google Translate.

⚙️ Halaman Pengaturan interaktif.

💾 LocalStorage Caching untuk menghemat permintaan API.

📱 Responsif & Mobile-Friendly, cocok di semua device.

🛠️ Teknologi
Frontend: React, Tailwind CSS, Framer Motion, React Router

API: GNews API

Deploy: Vercel

Dev Tools: Vite, React DevTools

📁 Struktur Folder
bash
Copy
Edit
juice-news/
│
├── public/
├── src/
│   ├── api/              # Fetching berita dari API
│   ├── components/       # UI Components (Card, Footer, Navbar, dll)
│   ├── pages/            # Halaman (Home, Detail, Bookmark, Settings, dll)
│   ├── styles/           # File CSS Tailwind (optional)
│   ├── App.jsx           # Routing utama
│   └── main.jsx          # Entry point
│
├── .env                  # Token API rahasia
├── .gitignore
├── package.json
└── vite.config.js
📦 Cara Menjalankan Lokal
bash
Copy
Edit
# 1. Clone repo
git clone https://github.com/patihrz/juice-news.git
cd juice-news

# 2. Install dependencies
npm install

# 3. Buat file .env dan isi:
VITE_GNEWS_API_KEY=masukkan_api_key_anda

# 4. Jalankan lokal
npm run dev
👨‍💻 Dibuat Oleh
Patih Ramadika
GitHub | LinkedIn
