import React from 'react';
import { Link, router } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';

export default function UserIndex({ books, categories, filters }) {
    const handleSearch = (e) => {
        e.preventDefault();
        const search = e.target.search.value;
        const category = e.target.category.value;
        router.get('/user/books', { search, category }, { preserveState: true });
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        router.get('/user/books', { search: filters?.search || '', category }, { preserveState: true });
    };

    return (
        <UserLayout>
            <div className="space-y-6">
                
                {/* 1. Hero Banner Sambutan */}
                <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="relative z-10 max-w-xl">
                        <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-white/15 text-blue-200 px-3 py-1 rounded-full mb-3 backdrop-blur-xs border border-white/10">
                            ✨ Platform E-Library Digital
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                            Jelajahi & Baca Koleksi Ebook Favoritmu
                        </h2>
                        <p className="text-sm text-blue-100/80 mt-2 font-normal">
                            Akses bacaan terlengkap mulai dari novel, teknologi, hingga pengetahuan umum langsung dari browsermu.
                        </p>
                    </div>

                    <div className="relative z-10 bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/15 flex items-center gap-3">
                        <div className="text-3xl">📚</div>
                        <div>
                            <p className="text-[11px] uppercase tracking-wider text-blue-200 font-semibold">Tersedia</p>
                            <p className="text-lg font-black text-white">{books.length} Buku Koleksi</p>
                        </div>
                    </div>

                    {/* Hiasan background abstrak */}
                    <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
                </div>

                {/* 2. Bar Pencarian & Filter Kategori */}
                <form onSubmit={handleSearch} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3">
                    <div className="flex-grow relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                        <input 
                            type="text" 
                            name="search" 
                            defaultValue={filters?.search || ''} 
                            placeholder="Cari berdasarkan judul buku atau penulis..." 
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-slate-50/50 transition-all"
                        />
                    </div>

                    <div className="w-full md:w-56">
                        <select 
                            name="category" 
                            defaultValue={filters?.category || ''} 
                            onChange={handleCategoryChange} 
                            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-slate-50/50 text-slate-700 cursor-pointer transition-all"
                        >
                            <option value="">Semua Kategori</option>
                            {categories && categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button 
                            type="submit" 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-md shadow-blue-600/20 transition-all text-sm active:scale-95"
                        >
                            Cari
                        </button>
                        {(filters?.search || filters?.category) && (
                            <Link 
                                href="/user/books" 
                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center font-medium"
                            >
                                Reset
                            </Link>
                        )}
                    </div>
                </form>

                {/* 3. Grid Card Ebook Modern */}
                {books.length === 0 ? (
                    <div className="bg-white p-12 rounded-3xl border border-slate-200/80 shadow-xs text-center">
                        <div className="w-16 h-16 bg-slate-100 text-3xl flex items-center justify-center rounded-2xl mx-auto mb-3">
                            📂
                        </div>
                        <h4 className="text-lg font-bold text-slate-800">Buku yang dicari tidak ditemukan</h4>
                        <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                            Coba gunakan kata kunci pencarian yang lain atau pilih kategori yang berbeda.
                        </p>
                        {(filters?.search || filters?.category) && (
                            <Link 
                                href="/user/books" 
                                className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-colors shadow-xs"
                            >
                                Lihat Semua Buku
                            </Link>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {books.map((book) => (
                            <div 
                                key={book.id} 
                                className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                            >
                                <div>
                                    {/* Cover Image Container with Floating Category */}
                                    <div className="relative h-56 bg-slate-100 overflow-hidden">
                                        {book.cover_image ? (
                                            <img 
                                                src={`/storage/${book.cover_image}`} 
                                                alt={book.title} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                                <span className="text-3xl mb-1">🖼️</span>
                                                <span className="text-xs font-semibold">No Cover Image</span>
                                            </div>
                                        )}
                                        <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide shadow-sm">
                                            {book.category}
                                        </span>
                                    </div>
                                    
                                    {/* Info Buku */}
                                    <div className="p-5">
                                        <h3 className="font-bold text-base text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors" title={book.title}>
                                            {book.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                                            Penulis: <span className="text-slate-800 font-medium">{book.author}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Tombol Aksi Bawah */}
                                <div className="p-5 pt-0">
                                    <Link 
                                        href={`/user/books/${book.id}`} 
                                        className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-md shadow-blue-600/20 transition-all text-xs active:scale-95 flex items-center justify-center gap-1.5"
                                    >
                                        <span>📖</span> Lihat Ebook
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </UserLayout>
    );
}