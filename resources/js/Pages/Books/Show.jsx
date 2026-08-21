import React, { useState } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

export default function Show({ book, isAdmin }) {
    const [showReader, setShowReader] = useState(false);
    const { flash } = usePage().props;

    const handleDelete = () => {
        if (confirm(`Apakah Anda yakin ingin menghapus buku "${book.title}"? Data dan file terkait akan dihapus permanen.`)) {
            router.delete(`/admin/books/${book.id}`);
        }
    };

    const handleBookmark = () => {
        router.post(`/user/books/${book.id}/bookmark`, {}, { preserveScroll: true });
    };

    return (
        <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
            {/* Top Navigation */}
            <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <Link
                        href={isAdmin ? "/admin/books" : "/user/books"}
                        className="flex items-center gap-2.5 font-extrabold text-base tracking-tight text-white hover:text-blue-300 transition-colors"
                    >
                        <img 
                        src="/images/logo.jpeg" 
                        alt="Logo Ebook Library" 
                        className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center text-xl shadow-lg ring-1 ring-white/10"/>
                        <span>Ebook Library</span>
                        {isAdmin && (
                            <span className="text-[10px] uppercase tracking-wider font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                                ADMIN
                            </span>
                        )}
                    </Link>

                    <Link
                        href={isAdmin ? "/admin/books" : "/user/books"}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl transition-colors border border-slate-700"
                    >
                        <span>←</span> Kembali ke Katalog
                    </Link>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Notifikasi Flash Message */}
                {flash?.success && (
                    <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 rounded-2xl shadow-xs text-sm font-medium flex items-center gap-2">
                        <span>✅</span>
                        <span>{flash.success}</span>
                    </div>
                )}

                {/* Main Card Detail Ebook */}
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row gap-8 lg:gap-12">
                    
                    {/* Cover Book Section */}
                    <div className="w-full md:w-5/12 lg:w-1/3 flex flex-col items-center">
                        <div className="relative w-full max-w-[260px] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl ring-1 ring-slate-900/10 group">
                            {book.cover_image ? (
                                <img
                                    src={`/storage/${book.cover_image}`}
                                    alt={`Sampul Buku ${book.title}`}
                                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-slate-100 to-slate-200 flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                                    <span className="text-4xl mb-2">🖼️</span>
                                    <span className="text-xs font-semibold">No Cover Image</span>
                                </div>
                            )}
                            <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-wide shadow-sm">
                                {book.category}
                            </span>
                        </div>

                        {/* File Format Indicator */}
                        <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/60">
                            <span>📄 Format Dokumen:</span>
                            <span className="text-blue-600 uppercase font-bold">PDF Ebook</span>
                        </div>
                    </div>

                    {/* Book Metadata & Synopsis */}
                    <div className="w-full md:w-7/12 lg:w-2/3 flex flex-col justify-between space-y-6">
                        <div className="space-y-4">
                            <div>
                                <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-3 py-1 rounded-lg border border-blue-100 mb-2">
                                    {book.category}
                                </span>
                                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                                    {book.title}
                                </h1>
                                <p className="text-sm sm:text-base text-slate-600 font-medium mt-1">
                                    Karya Penulis: <span className="text-slate-900 font-bold">{book.author}</span>
                                </p>
                            </div>

                            <hr className="border-slate-100" />

                            {/* Synopsis Box */}
                            <div>
                                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                                    <span>📝</span> Sinopsis / Deskripsi Buku
                                </h3>
                                <div className="text-sm leading-relaxed text-slate-700 bg-slate-50/70 p-5 rounded-2xl border border-slate-200/70 whitespace-pre-line">
                                    {book.description || 'Tidak ada deskripsi atau ringkasan yang disertakan untuk buku ini.'}
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons Toolbar */}
                        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                            {book.file_path ? (
                                <button
                                    onClick={() => setShowReader(!showReader)}
                                    className={`font-bold px-6 py-3 rounded-xl shadow-md transition-all flex items-center gap-2 text-sm transform active:scale-95 ${
                                        showReader
                                            ? 'bg-slate-800 hover:bg-slate-700 text-white ring-2 ring-slate-600'
                                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30'
                                    }`}
                                >
                                    <span>{showReader ? '✕' : '📖'}</span>
                                    <span>{showReader ? 'Tutup Reader' : 'Baca Ebook Sekarang'}</span>
                                </button>
                            ) : (
                                <button disabled className="bg-slate-200 text-slate-400 font-semibold px-5 py-3 rounded-xl cursor-not-allowed text-sm">
                                    File PDF Tidak Tersedia
                                </button>
                            )}

                            {/* Bookmark Button (Portal User) */}
                            {!isAdmin && (
                                <button
                                    onClick={handleBookmark}
                                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-3 rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center gap-2 text-sm active:scale-95"
                                >
                                    <span>🔖</span> Simpan
                                </button>
                            )}

                            {/* Admin Controls (Edit & Delete) */}
                            {isAdmin && (
                                <div className="flex items-center gap-2 ml-auto">
                                    <Link
                                        href={`/admin/books/${book.id}/edit`}
                                        className="bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white font-bold px-4 py-3 rounded-xl border border-amber-200/80 transition-colors flex items-center gap-1.5 text-sm"
                                    >
                                        <span>✏️</span> Edit
                                    </Link>

                                    <button
                                        onClick={handleDelete}
                                        className="bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white font-bold px-4 py-3 rounded-xl border border-rose-200/80 transition-colors flex items-center gap-1.5 text-sm"
                                    >
                                        <span>🗑️</span> Hapus
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Embedded PDF Viewer Section */}
                {showReader && book.file_path && (
                    <div className="bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-800 transition-all duration-300 animate-fadeIn">
                        {/* Reader Bar Header */}
                        <div className="bg-slate-950/80 px-6 py-4 flex justify-between items-center border-b border-slate-800 text-white">
                            <div className="flex items-center gap-3">
                                <span className="text-xl">📖</span>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-100 truncate max-w-md">
                                        Membaca: {book.title}
                                    </h3>
                                    <p className="text-[11px] text-slate-400">Mode Pembaca PDF Terintegrasi</p>
                                </div>
                            </div>

                            <button
                                onClick={() => setShowReader(false)}
                                className="bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white font-bold text-xs px-3.5 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                            >
                                Tutup ✕
                            </button>
                        </div>

                        {/* PDF Stream Frame */}
                        <div className="p-2 sm:p-4 bg-slate-900">
                            <iframe
                                src={`/user/books/${book.id}/stream`}
                                className="w-full h-[700px] rounded-2xl bg-white border-0 shadow-inner"
                                title={book.title}
                            ></iframe>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}