import React from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        author: '',
        category: '',
        description: '',
        cover_image: null,
        file_path: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        
        post('/admin/books', {
            forceFormData: true, // <-- KUNCI UTAMA: Wajib aktif agar file binary terkirim sempurna
            onError: (err) => {
                console.error("Validation Error:", err);
            }
        });
    };

    return (
        <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
            {/* Header Admin */}
            <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img 
                        src="/images/logo.jpeg" 
                        alt="Logo Ebook Library" 
                        className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-lg shadow"/>
                        <h1 className="font-bold text-base text-white">Admin Panel - Tambah Buku</h1>
                    </div>
                    <Link
                        href="/admin/books"
                        className="text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg transition-colors border border-slate-700"
                    >
                        ← Kembali ke Dashboard
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8">
                    <h2 className="text-xl font-bold text-slate-900 mb-1">Form Tambah Ebook Baru</h2>
                    <p className="text-xs text-slate-500 mb-6 pb-4 border-b border-slate-100">
                        Isi metadata buku, upload cover gambar dan file dokumen PDF.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Judul Buku */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                                Judul Buku
                            </label>
                            <input
                                type="text"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                placeholder="Masukkan judul buku..."
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                                required
                            />
                            {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                        </div>

                        {/* Penulis & Kategori */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                                    Penulis
                                </label>
                                <input
                                    type="text"
                                    value={data.author}
                                    onChange={(e) => setData('author', e.target.value)}
                                    placeholder="Nama penulis..."
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                                    required
                                />
                                {errors.author && <p className="text-red-500 text-xs mt-1">{errors.author}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                                    Kategori
                                </label>
                                <input
                                    type="text"
                                    value={data.category}
                                    onChange={(e) => setData('category', e.target.value)}
                                    placeholder="Contoh: Novel, Teknologi, Bisnis..."
                                    className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                                    required
                                />
                                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                            </div>
                        </div>

                        {/* Deskripsi */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                                Sinopsis / Deskripsi
                            </label>
                            <textarea
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                rows="4"
                                placeholder="Tuliskan deskripsi singkat mengenai isi buku..."
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50"
                            ></textarea>
                            {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                        </div>

                        {/* Upload Cover & PDF */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                                    Cover Buku (Image)
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setData('cover_image', e.target.files[0])}
                                    className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                />
                                <p className="text-[10px] text-slate-400 mt-1">Format: JPG, PNG, WEBP (Maks. 2MB)</p>
                                {errors.cover_image && <p className="text-red-500 text-xs mt-1">{errors.cover_image}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1">
                                    File Ebook (PDF)
                                </label>
                                <input
                                    type="file"
                                    accept="application/pdf"
                                    onChange={(e) => setData('file_path', e.target.files[0])}
                                    className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                                />
                                <p className="text-[10px] text-slate-400 mt-1">Format: Dokumen PDF (Maks. 10MB)</p>
                                {errors.file_path && <p className="text-red-500 text-xs mt-1">{errors.file_path}</p>}
                            </div>
                        </div>

                        {/* Submit Actions */}
                        <div className="flex justify-end items-center gap-3 pt-6 border-t border-slate-100">
                            <Link
                                href="/admin/books"
                                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-xl shadow-xs transition-colors text-xs disabled:opacity-50"
                            >
                                {processing ? 'Menyimpan...' : 'Simpan Buku'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}