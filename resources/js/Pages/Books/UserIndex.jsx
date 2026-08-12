import React from 'react';
import { Link, router } from '@inertiajs/react';

export default function UserIndex({ books, categories, filters }) {
    const handleSearch = (e) => {
        e.preventDefault();
        const search = e.target.search.value;
        const category = e.target.category.value;
        router.get('/books', { search, category }, { preserveState: true });
    };

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        router.get('/books', { search: filters?.search || '', category }, { preserveState: true });
    };

    return (
        <div className="bg-gray-100 text-gray-900 font-sans min-h-screen">
            {/* Navbar Utama User */}
            <nav className="bg-blue-600 text-white shadow-md p-4 sticky top-0 z-50">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold tracking-wide flex items-center gap-2">
                        <span>📚</span> Ebook Library Store
                    </h1>
                    {/* Link Tersembunyi Ke Portal Admin jika mau kelola data */}
                    <Link href="/admin/books" className="text-xs bg-blue-700 hover:bg-blue-800 px-3 py-1.5 rounded-full transition-colors font-medium">
                        Portal Admin 🔒
                    </Link>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8 max-w-7xl">

                {/* Form Fitur Pencarian & Filter Kategori */}
                <form onSubmit={handleSearch} className="bg-white p-4 rounded-xl shadow-sm mb-6 flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                        <input 
                            type="text" 
                            name="search" 
                            defaultValue={filters?.search || ''} 
                            placeholder="Cari berdasarkan judul buku atau penulis..." 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                        />
                    </div>

                    <div className="w-full md:w-52">
                        <select 
                            name="category" 
                            defaultValue={filters?.category || ''} 
                            onChange={handleCategoryChange} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm text-gray-700"
                        >
                            <option value="">Semua Kategori</option>
                            {categories && categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-colors text-sm">
                            Cari
                        </button>
                        {(filters?.search || filters?.category) && (
                            <Link href="/books" className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm transition-colors flex items-center justify-center">
                                Reset
                            </Link>
                        )}
                    </div>
                </form>

                {/* Grid Card Ebook Untuk User */}
                {books.length === 0 ? (
                    <div className="bg-white p-8 rounded-xl shadow-sm text-center my-6">
                        <p className="text-gray-500 text-base">Buku yang dicari tidak ditemukan.</p>
                        <Link href="/books" className="text-blue-600 hover:underline text-sm mt-2 inline-block font-medium">Lihat Semua Ebook</Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {books.map((book) => (
                            <div key={book.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between">
                                <div>
                                    <div className="relative h-52 bg-gray-200 overflow-hidden">
                                        {book.cover_image ? (
                                            <img src={`/storage/${book.cover_image}`} alt={book.title} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
                                                No Cover Image
                                            </div>
                                        )}
                                        <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow">
                                            {book.category}
                                        </span>
                                    </div>

                                    <div className="p-4">
                                        <h3 className="font-bold text-base text-gray-800 line-clamp-1">{book.title}</h3>
                                        <p className="text-xs text-gray-500 mt-1">Penulis: <span className="text-gray-700">{book.author}</span></p>
                                    </div>
                                </div>

                                <div className="p-4 pt-0">
                                    <Link href={`/books/${book.id}`} className="block text-center w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition-colors text-sm">
                                        📖 Baca / Detail Ebook
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}