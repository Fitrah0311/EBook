import React from 'react';
import { Link, router } from '@inertiajs/react';

export default function Index({ books, categories, filters, flash }) {
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
            {/* Navbar */}
            <nav className="bg-blue-600 text-white shadow-md p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-xl font-bold tracking-wide">📚 Ebook Library</h1>
                    <span className="text-sm bg-blue-700 px-3 py-1 rounded-full">Laravel 13 + React</span>
                </div>
            </nav>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-8">
                {/* Notifikasi Sukses */}
                {flash?.success && (
                    <div className="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded shadow-sm">
                        {flash.success}
                    </div>
                )}

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">Semua Koleksi Ebook</h2>
                    <Link href="/books/create" className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors duration-200">
                        + Tambah Buku Baru
                    </Link>
                </div>

                {/* Form Fitur Pencarian & Filter Kategori */}
                <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row gap-4">
                    <div className="flex-grow">
                        <input 
                            type="text" 
                            name="search" 
                            defaultValue={filters?.search || ''} 
                            placeholder="Cari berdasarkan judul atau penulis..." 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="w-full md:w-48">
                        <select 
                            name="category" 
                            defaultValue={filters?.category || ''} 
                            onChange={handleCategoryChange} 
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Semua Kategori</option>
                            {categories && categories.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    <div className="flex gap-2">
                        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-colors duration-200">
                            Cari
                        </button>
                        {(filters?.search || filters?.category) && (
                            <Link href="/books" className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center">
                                Reset
                            </Link>
                        )}
                    </div>
                </form>

                {books.length === 0 ? (
                    <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                        <p className="text-gray-500 text-lg">Tidak ada koleksi buku yang ditemukan.</p>
                        {(filters?.search || filters?.category) && (
                            <Link href="/books" className="text-blue-600 hover:underline mt-2 inline-block">Lihat Semua Buku</Link>
                        )}
                    </div>
                ) : (
                    /* Grid Card Buku */
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {books.map((book) => (
                            <div key={book.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
                                <div>
                                    {book.cover_image ? (
                                        <img src={`/storage/${book.cover_image}`} alt={book.title} className="w-full h-48 object-cover" />
                                    ) : (
                                        <div className="h-48 bg-gray-300 flex items-center justify-center text-gray-500">
                                            <span>No Cover Image</span>
                                        </div>
                                    )}
                                    
                                    <div className="p-4">
                                        <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">
                                            {book.category}
                                        </span>
                                        <h3 className="font-bold text-lg mt-2 text-gray-800 line-clamp-1">{book.title}</h3>
                                        <p className="text-sm text-gray-600 mb-4">Penulis: {book.author}</p>
                                    </div>
                                </div>

                                <div className="p-4 pt-0">
                                    <Link href={`/books/${book.id}`} className="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition-colors duration-200">
                                        Lihat Ebook
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