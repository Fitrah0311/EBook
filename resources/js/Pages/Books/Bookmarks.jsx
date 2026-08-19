import React from 'react';
import { Link, router } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';

export default function Bookmarks({ books }) {
    const handleRemoveBookmark = (bookId) => {
        router.post(`/user/books/${bookId}/bookmark`, {}, { preserveScroll: true });
    };

    return (
        <UserLayout>
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Bookmark Saya 🔖</h2>
                    <p className="text-sm text-gray-500">Daftar buku yang telah kamu simpan</p>
                </div>
            </div>

            {books.length === 0 ? (
                <div className="bg-white p-8 rounded-xl shadow-sm text-center">
                    <p className="text-gray-500 text-base">Belum ada buku yang disimpan di bookmark.</p>
                    <Link href="/user/books" className="text-blue-600 hover:underline text-sm mt-2 inline-block font-medium">
                        Cari & Simpan Ebook Sekarang →
                    </Link>
                </div>
            ) : (
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

                            <div className="p-4 pt-0 flex gap-2">
                                <Link href={`/user/books/${book.id}`} className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded text-sm transition-colors">
                                    Lihat
                                </Link>
                                <button
                                    onClick={() => handleRemoveBookmark(book.id)}
                                    className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-2 rounded text-sm transition-colors"
                                    title="Hapus Bookmark"
                                >
                                    🗑️
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </UserLayout>
    );
}