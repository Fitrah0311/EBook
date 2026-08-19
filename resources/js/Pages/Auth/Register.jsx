import React from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/register');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20 p-8 transition-all">
                
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-3 text-3xl shadow-inner">
                        📖
                    </div>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Daftar Akun</h2>
                    <p className="text-sm text-gray-500 mt-1">Buat akun untuk mulai membaca ebook favoritmu</p>
                </div>

                {/* Form Register */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                            placeholder="Contoh: John Doe"
                            className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                                errors.name
                                    ? 'border-red-500 ring-2 ring-red-200'
                                    : 'border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                            }`}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1 font-medium">{errors.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                            Alamat Email
                        </label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                            placeholder="nama@email.com"
                            className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                                errors.email
                                    ? 'border-red-500 ring-2 ring-red-200'
                                    : 'border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                            }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1 font-medium">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                            Kata Sandi
                        </label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                            placeholder="Minimal 6 karakter"
                            className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all ${
                                errors.password
                                    ? 'border-red-500 ring-2 ring-red-200'
                                    : 'border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100'
                            }`}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1 font-medium">{errors.password}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-1">
                            Konfirmasi Kata Sandi
                        </label>
                        <input
                            type="password"
                            value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                            placeholder="Ketik ulang kata sandi"
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 text-sm outline-none transition-all"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm mt-2"
                    >
                        {processing ? 'Mendaftarkan...' : 'Daftar Sekarang'}
                    </button>
                </form>

                {/* Footer Links */}
                <div className="mt-6 text-center pt-4 border-t border-gray-100 flex flex-col gap-2 text-xs text-gray-500">
                    <p>
                        Sudah punya akun?{' '}
                        <Link href="/login" className="text-blue-600 hover:underline font-semibold">
                            Masuk di sini
                        </Link>
                    </p>
                    <Link
                        href="/user/books"
                        className="hover:text-blue-600 transition-colors font-medium"
                    >
                        ← Kembali ke Katalog Ebook
                    </Link>
                </div>

            </div>
        </div>
    );
}