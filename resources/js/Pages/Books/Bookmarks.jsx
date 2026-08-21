import React from 'react';
import { Link, router } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';

export default function Bookmarks({ books }) {
    const handleRemoveBookmark = (bookId) => {
        router.post(`/user/books/${bookId}/bookmark`, {}, { preserveScroll: true });
    };

    return (
        <UserLayout>
            <div className="space-y-6">
                {/* 1. Hero Banner Bookmark */}
                <div className="bg-gradient-to-r from-amber-600 via-indigo-700 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-lg relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="relative z-10 max-w-xl">
                        <span className="inline-block text-[11px] font-bold uppercase tracking-wider bg-white/15 text-amber-200 px-3 py-1 rounded-full mb-3 backdrop-blur-xs border border-white/10">
                            🔖 Koleksi Pribadi
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                            Daftar Bookmark Ebook Saya
                        </h2>
                        <p className="text-sm text-amber-100/80 mt-2 font-normal">
                            Kumpulan buku yang telah kamu tandai dan simpan untuk dibaca kapan saja tanpa perlu mencari ulang.
                        </p>
                    </div>

                    <div className="relative z-10 bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-2xl border border-white/15 flex items-center gap-3">
                        <div className="text-3xl">📌</div>
                        <div>
                            <p className="text-[11px] uppercase tracking-wider text-amber-200 font-semibold">Tersimpan</p>
                            <p className="text-lg font-black text-white">{books.length} Ebook</p>
                        </div>
                    </div>

                    {/* Hiasan blur glow */}
                    <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>
                </div>

                {/* 2. Grid Card Buku Tersimpan */}
                {books.length === 0 ? (
                    <div className="bg-white p-12 rounded-3xl border border-slate-200/80 shadow-xs text-center">
                        <div className="w-16 h-16 bg-amber-50 text-amber-600 text-3xl flex items-center justify-center rounded-2xl mx-auto mb-3">
                            🔖
                        </div>
                        <h4 className="text-lg font-bold text-slate-800">Belum ada buku di bookmark</h4>
                        <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                            Kamu belum menyimpan buku apapun. Jelajahi katalog dan tekan tombol bookmark pada buku yang menarik bagimu!
                        </p>
                        <div className="mt-5">
                            <Link 
                                href="/user/books" 
                                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md shadow-blue-600/20 active:scale-95"
                            >
                                <span>📚</span> Jelajahi Katalog Sekarang
                            </Link>
                        </div>
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

                                {/* Tombol Aksi: Lihat Ebook & Hapus Bookmark */}
                                <div className="p-5 pt-0 flex gap-2">
                                    <Link 
                                        href={`/user/books/${book.id}`} 
                                        className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-xl shadow-md shadow-blue-600/20 transition-all text-xs active:scale-95 flex items-center justify-center gap-1.5"
                                    >
                                        <span>📖</span> Lihat Ebook
                                    </Link>
                                    <button
                                        onClick={() => handleRemoveBookmark(book.id)}
                                        className="bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white px-3 py-2.5 rounded-xl text-xs font-semibold border border-rose-200/80 transition-all active:scale-95 flex items-center justify-center"
                                        title="Hapus dari Bookmark"
                                    >
                                        🗑️
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </UserLayout>
    );
}