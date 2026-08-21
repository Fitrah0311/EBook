import React, { useState } from 'react';
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

    const [coverPreview, setCoverPreview] = useState(
        book.cover_image ? `/storage/${book.cover_image}` : null
    );

    const handleCoverChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setData('cover_image', file);
            setCoverPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Mengarah ke route admin dengan multipart form-data
        post(`/admin/books/${book.id}`, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <div className="bg-slate-50 text-slate-900 font-sans min-h-screen">
            {/* Header Admin */}
            <header className="bg-slate-900 text-white sticky top-0 z-40 border-b border-slate-800 shadow-md">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-amber-500 rounded-xl flex items-center justify-center text-lg shadow text-slate-950 font-bold">
                            ✏️
                        </div>
                        <div>
                            <h1 className="font-bold text-base text-white">Admin Panel - Edit Ebook</h1>
                            <p className="text-[11px] text-slate-400">Memperbarui informasi & berkas buku</p>
                        </div>
                    </div>
                    <Link
                        href="/admin/books"
                        className="text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-3.5 py-2 rounded-xl transition-colors border border-slate-700"
                    >
                        ← Kembali ke Dashboard
                    </Link>
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
                <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs p-6 sm:p-8 lg:p-10">
                    
                    {/* Judul & Keterangan */}
                    <div className="flex justify-between items-start pb-5 border-b border-slate-100 mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">Perbarui Informasi Buku</h2>
                            <p className="text-xs text-slate-500 mt-0.5">
                                Edit data judul, penulis, kategori, sinopsis, atau unggah berkas pengganti.
                            </p>
                        </div>
                        <span className="text-[11px] uppercase font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">
                            Mode Edit
                        </span>
                    </div>

                    {/* Alert Error Validasi */}
                    {Object.keys(errors).length > 0 && (
                        <div className="mb-6 p-4 bg-rose-50 border-l-4 border-rose-500 text-rose-800 rounded-2xl text-xs space-y-1">
                            <p className="font-bold flex items-center gap-1.5">
                                <span>❌</span> Gagal memperbarui data buku:
                            </p>
                            <ul className="list-disc list-inside mt-1 space-y-0.5">
                                {Object.values(errors).map((err, i) => (
                                    <li key={i}>{err}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Judul Buku */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
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
                            {errors.title && <p className="text-rose-500 text-xs mt-1">{errors.title}</p>}
                        </div>

                        {/* Penulis & Kategori */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
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
                                {errors.author && <p className="text-rose-500 text-xs mt-1">{errors.author}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
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
                                {errors.category && <p className="text-rose-500 text-xs mt-1">{errors.category}</p>}
                            </div>
                        </div>

                        {/* Sinopsis / Deskripsi */}
                        <div>
                            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                                Sinopsis / Deskripsi
                            </label>
                            <textarea
                                rows="4"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Tuliskan ringkasan isi buku..."
                                className="w-full px-4 py-2.5 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-slate-50/50 leading-relaxed"
                            ></textarea>
                            {errors.description && <p className="text-rose-500 text-xs mt-1">{errors.description}</p>}
                        </div>

                        {/* Upload Cover & PDF dengan Preview */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-slate-50/80 rounded-2xl border border-slate-200/60">
                            {/* Cover Image */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                                    Cover Buku (Opsional)
                                </label>
                                <div className="flex items-center gap-4">
                                    {coverPreview ? (
                                        <img
                                            src={coverPreview}
                                            alt="Preview Cover"
                                            className="w-16 h-20 object-cover rounded-lg border border-slate-300 shadow-xs shrink-0"
                                        />
                                    ) : (
                                        <div className="w-16 h-20 bg-slate-200 rounded-lg flex items-center justify-center text-xs text-slate-400 shrink-0">
                                            No Cover
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleCoverChange}
                                            className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                        />
                                        <p className="text-[10px] text-slate-400 mt-1">Biarkan kosong jika tidak ingin mengubah cover.</p>
                                    </div>
                                </div>
                                {errors.cover_image && <p className="text-rose-500 text-xs mt-1">{errors.cover_image}</p>}
                            </div>

                            {/* PDF File */}
                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                                    File Dokumen PDF (Opsional)
                                </label>
                                <div className="space-y-2">
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={(e) => setData('pdf_file', e.target.files[0])}
                                        className="block w-full text-xs text-slate-500 file:mr-3 file:py-2 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                                    />
                                    <p className="text-[10px] text-slate-400">
                                        {book.file_path ? '✅ File PDF saat ini sudah tersedia di sistem.' : '⚠️ Belum ada file PDF.'} Unggah hanya jika ingin menggantinya.
                                    </p>
                                </div>
                                {errors.pdf_file && <p className="text-rose-500 text-xs mt-1">{errors.pdf_file}</p>}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end items-center gap-3 pt-6 border-t border-slate-100">
                            <Link
                                href="/admin/books"
                                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-semibold transition-colors"
                            >
                                Batal
                            </Link>
                            <button
                                type="submit"
                                disabled={processing}
                                className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-2.5 rounded-xl shadow-md shadow-amber-500/20 transition-all text-xs active:scale-95 disabled:opacity-50"
                            >
                                {processing ? 'Memperbarui...' : 'Simpan Perubahan Ebook'}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}