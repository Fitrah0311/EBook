import React from 'react';
import { Link, router } from '@inertiajs/react';

export default function AdminIndex({ books, categories, filters, flash }) {
    const handleSearch = (e) => {
        e.preventDefault();
        const search = e.target.search.value;
        const category = e.target.category.value;
        router.get('/admin/books', { search, category }, { preserveState: true });
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        router.get('/admin/books', { search: filters?.search || '', category }, { preserveState: true });
    };

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    const handleDelete = (bookId, title) => {
        if (confirm(`Apakah Anda yakin ingin menghapus buku "${title}"? Data dan file terkait akan dihapus permanen.`)) {
            router.delete(`/admin/books/${bookId}`);
        }
    };

    return (
        <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
            {/* Top Navbar Admin */}
            <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img 
                        src="/images/logo.jpeg" 
                        alt="Logo Ebook Library" 
                        className="w-12 h-12 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-xl flex items-center justify-center text-xl shadow-lg ring-1 ring-white/10"/>
                        <div>
                            <div className="flex items-center gap-2">
                                <h1 className="font-extrabold text-base tracking-tight text-white">Ebook Library</h1>
                                <span className="text-[10px] uppercase tracking-wider font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                                    ADMIN PANEL
                                </span>
                            </div>
                            <p className="text-[11px] text-slate-400">Pusat Manajemen & Kontrol Katalog Ebook</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/user/books"
                            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-lg transition-colors border border-slate-700"
                        >
                            <span>👁️</span> Lihat Portal Pembaca
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="text-xs font-semibold bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 px-3.5 py-2 rounded-lg transition-colors flex items-center gap-1.5"
                        >
                            <span>🚪</span> Keluar
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">

                {/* Notifikasi Flash Success */}
                {flash?.success && (
                    <div className="p-4 bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 rounded-xl shadow-sm text-sm font-medium flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <span>✅</span>
                            <span>{flash.success}</span>
                        </div>
                    </div>
                )}

                {/* Stats & Header Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Koleksi Ebook</p>
                            <h3 className="text-2xl font-black text-slate-900 mt-1">{books.length} Buku</h3>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl font-bold">
                            📖
                        </div>
                    </div>

                    <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Kategori</p>
                            <h3 className="text-2xl font-black text-slate-900 mt-1">{categories ? categories.length : 0} Kategori</h3>
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl font-bold">
                            🏷️
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-5 rounded-2xl text-white shadow-md flex items-center justify-between">
                        <div>
                            <p className="text-xs font-semibold text-blue-100 uppercase tracking-wider">Tindakan Cepat</p>
                            <h3 className="text-lg font-bold mt-0.5">Tambah Koleksi Baru</h3>
                        </div>
                        <Link
                            href="/admin/books/create"
                            className="bg-white text-blue-600 hover:bg-blue-50 font-bold text-xs px-4 py-2.5 rounded-xl transition-transform transform active:scale-95 shadow-sm"
                        >
                            + Tambah Buku
                        </Link>
                    </div>
                </div>

                {/* Search & Filter Bar */}
                <form onSubmit={handleSearch} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row gap-3">
                    <div className="flex-grow relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                        <input
                            type="text"
                            name="search"
                            defaultValue={filters?.search || ''}
                            placeholder="Cari berdasarkan judul ebook atau nama penulis..."
                            className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-slate-50/50"
                        />
                    </div>

                    <div className="w-full md:w-56">
                        <select
                            name="category"
                            defaultValue={filters?.category || ''}
                            onChange={handleCategoryChange}
                            className="w-full px-3.5 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-slate-50/50 text-slate-700 cursor-pointer"
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
                            className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2.5 rounded-xl shadow-xs transition-colors text-sm"
                        >
                            Cari
                        </button>
                        {(filters?.search || filters?.category) && (
                            <Link
                                href="/admin/books"
                                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm transition-colors flex items-center justify-center font-medium"
                            >
                                Reset
                            </Link>
                        )}
                    </div>
                </form>

                {/* Grid Buku */}
                {books.length === 0 ? (
                    <div className="bg-white p-12 rounded-2xl border border-slate-200/80 shadow-xs text-center">
                        <div className="w-16 h-16 bg-slate-100 text-3xl flex items-center justify-center rounded-2xl mx-auto mb-3">
                            📂
                        </div>
                        <h4 className="text-lg font-bold text-slate-800">Tidak ada koleksi buku ditemukan</h4>
                        <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                            Coba ubah kata kunci pencarian atau tambahkan buku baru ke dalam katalog.
                        </p>
                        <div className="mt-4 flex justify-center gap-3">
                            <Link
                                href="/admin/books/create"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-colors shadow-xs"
                            >
                                + Tambah Buku Sekarang
                            </Link>
                            {(filters?.search || filters?.category) && (
                                <Link
                                    href="/admin/books"
                                    className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs px-4 py-2 rounded-xl transition-colors"
                                >
                                    Tampilkan Semua Ebook
                                </Link>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {books.map((book) => (
                            <div
                                key={book.id}
                                className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group"
                            >
                                <div>
                                    {/* Cover Image */}
                                    <div className="relative h-52 bg-slate-100 overflow-hidden">
                                        {book.cover_image ? (
                                            <img
                                                src={`/storage/${book.cover_image}`}
                                                alt={book.title}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                                <span className="text-3xl mb-1">🖼️</span>
                                                <span className="text-xs font-medium">Tanpa Sampul</span>
                                            </div>
                                        )}
                                        <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-xs text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm uppercase tracking-wide">
                                            {book.category}
                                        </span>
                                    </div>

                                    {/* Informasi Ebook */}
                                    <div className="p-4">
                                        <h3 className="font-bold text-base text-slate-900 line-clamp-1 group-hover:text-blue-600 transition-colors" title={book.title}>
                                            {book.title}
                                        </h3>
                                        <p className="text-xs text-slate-500 mt-1 line-clamp-1">
                                            Penulis: <span className="text-slate-700 font-medium">{book.author}</span>
                                        </p>
                                    </div>
                                </div>

                                {/* Action Buttons Admin */}
                                <div className="p-4 pt-0 space-y-2 border-t border-slate-100 mt-2">
                                    <Link
                                        href={`/admin/books/${book.id}`}
                                        className="block text-center w-full bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-semibold py-2 rounded-xl text-xs transition-colors duration-150"
                                    >
                                        📖 Detail & Baca
                                    </Link>

                                    <div className="grid grid-cols-2 gap-2">
                                        <Link
                                            href={`/admin/books/${book.id}/edit`}
                                            className="text-center bg-amber-50 hover:bg-amber-500 text-amber-700 hover:text-white font-semibold py-1.5 rounded-lg text-xs transition-colors"
                                        >
                                            ✏️ Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(book.id, book.title)}
                                            className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white font-semibold py-1.5 rounded-lg text-xs transition-colors"
                                        >
                                            🗑️ Hapus
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}