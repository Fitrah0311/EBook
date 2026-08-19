import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';

export default function Show({ book, isAdmin }) {
    const [showReader, setShowReader] = useState(false);

    const handleDelete = () => {
        if (confirm('Apakah yakin ingin menghapus buku ini? Data dan file terkait akan dihapus permanen.')) {
            router.delete(`/admin/books/${book.id}`);
        }
    };

    const handleBookmark = () => {
        router.post(`/user/books/${book.id}/bookmark`, {}, { preserveScroll: true });
    };

    return (
        <div className="bg-gray-100 text-gray-900 font-sans min-h-screen">
            <nav className="bg-blue-600 text-white shadow-md p-4">
                <div className="container mx-auto">
                    <Link href={isAdmin ? "/admin/books" : "/user/books"} className="text-xl font-bold tracking-wide hover:text-blue-200">
                        📚 Ebook Library
                    </Link>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                <Link href={isAdmin ? "/admin/books" : "/user/books"} className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6">
                    ← Kembali
                </Link>

                <div className="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8 flex flex-col md:flex-row gap-8">
                    <div className="w-full md:w-1/3 flex justify-center items-start">
                        {book.cover_image ? (
                            <img src={`/storage/${book.cover_image}`} alt={`Sampul Buku ${book.title}`} className="w-full max-w-[240px] h-auto object-cover rounded-lg shadow-md border border-gray-200" />
                        ) : (
                            <div className="w-full min-h-[320px] bg-gray-300 rounded-lg flex items-center justify-center text-gray-500 shadow-inner">
                                <span className="text-center p-4 font-medium">No Cover Image</span>
                            </div>
                        )}
                    </div>

                    <div className="w-full md:w-2/3 flex flex-col justify-between">
                        <div>
                            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">
                                {book.category}
                            </span>
                            <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-1">{book.title}</h2>
                            <p className="text-gray-600 font-medium mb-4">Penulis: <span className="text-gray-800">{book.author}</span></p>
                            <hr className="my-4 border-gray-200" />
                            <h4 className="font-bold text-gray-700 mb-2">Sinopsis / Deskripsi:</h4>
                            <p className="text-gray-650 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-150">
                                {book.description || 'Tidak ada deskripsi untuk buku ini.'}
                            </p>
                        </div>

                        {/* Aksi Buku: Baca, Bookmark, & CRUD Admin */}
                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            {book.file_path ? (
                                <button onClick={() => setShowReader(!showReader)} className="bg-green-600 hover:bg-green-700 text-white font-bold px-5 py-2.5 rounded-lg shadow transition-colors">
                                    📖 {showReader ? 'Tutup Reader' : 'Baca Ebook'}
                                </button>
                            ) : (
                                <button disabled className="bg-gray-400 text-white font-bold px-5 py-2.5 rounded-lg cursor-not-allowed">
                                    File PDF Tidak Tersedia
                                </button>
                            )}

                            {/* Tombol Simpan Bookmark (Khusus User Portal) */}
                            {!isAdmin && (
                                <button 
                                    onClick={handleBookmark}
                                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-lg shadow transition-colors flex items-center gap-1.5"
                                >
                                    🔖 Bookmark
                                </button>
                            )}

                            {/* Cek apakah Admin yang buka */}
                            {isAdmin && (
                                <>
                                    <Link href={`/admin/books/${book.id}/edit`} className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-5 py-2.5 rounded-lg shadow transition-colors">
                                        ✏️ Edit
                                    </Link>

                                    <button onClick={handleDelete} className="bg-red-600 hover:bg-red-700 text-white font-bold px-5 py-2.5 rounded-lg shadow transition-colors">
                                        🗑️ Hapus
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Embedded PDF Viewer */}
                {showReader && book.file_path && (
                    <div className="mt-8 bg-white rounded-xl shadow-md p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800">Membaca: {book.title}</h3>
                            <button onClick={() => setShowReader(false)} className="text-red-600 font-medium">Tutup ✕</button>
                        </div>
                        <iframe src={`/user/books/${book.id}/stream`} className="w-full h-[650px] rounded-lg border border-gray-200" title={book.title}></iframe>
                    </div>
                )}
            </main>
        </div>
    );
}