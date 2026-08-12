import React from 'react';
import { Link, useForm } from '@inertiajs/react';

export default function Edit({ book }) {
    const { data, setData, post, processing, errors } = useForm({
        _method: 'PUT',
        title: book.title || '',
        author: book.author || '',
        category: book.category || '',
        description: book.description || '',
        cover_image: null,
        pdf_file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pakai post karena mengirim file via multipart form data dengan spoofing _method: 'PUT'
        post(`/books/${book.id}`);
    };

    return (
        <div className="bg-gray-100 text-gray-900 font-sans min-h-screen">
            <nav className="bg-blue-600 text-white shadow-md p-4">
                <div className="container mx-auto">
                    <h1 className="text-xl font-bold">📚 Admin Panel - Ebook Library</h1>
                </div>
            </nav>

            <main className="container mx-auto px-4 py-8 max-w-2xl">
                <Link href={`/books/${book.id}`} className="text-blue-600 hover:text-blue-800 font-medium mb-6 inline-block">← Batal & Kembali</Link>

                <div className="bg-white rounded-xl shadow-md p-6 md:p-8">
                    <h2 className="text-2xl font-bold mb-6 text-gray-800">Edit Data Ebook</h2>

                    {Object.keys(errors).length > 0 && (
                        <div className="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded shadow-sm">
                            <strong>❌ Gagal memperbarui data:</strong>
                            <ul className="mt-2 list-disc list-inside text-sm">
                                {Object.values(errors).map((err, i) => <li key={i}>{err}</li>)}
                            </ul>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Judul Buku</label>
                            <input type="text" value={data.title} onChange={e => setData('title', e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Penulis</label>
                                <input type="text" value={data.author} onChange={e => setData('author', e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                                <input type="text" value={data.category} onChange={e => setData('category', e.target.value)} required className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Sinopsis / Deskripsi</label>
                            <textarea rows="4" value={data.description} onChange={e => setData('description', e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Sampul Buku Baru (Opsional)</label>
                            <input type="file" accept="image/*" onChange={e => setData('cover_image', e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">File PDF Baru (Opsional)</label>
                            <input type="file" accept=".pdf" onChange={e => setData('pdf_file', e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                        </div>

                        <button type="submit" disabled={processing} className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg shadow transition-colors mt-4">
                            {processing ? 'Memperbarui...' : 'Update Buku'}
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}