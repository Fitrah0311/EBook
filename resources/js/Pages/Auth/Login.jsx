import React from 'react';
import { useForm, Link } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/20 p-8 transition-all">
                
                {/* Header */}
                <div className="text-center mb-6">
                    <img 
                        src="/images/logo.jpeg" 
                        alt="Logo Ebook Library" 
                        className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-xl mb-3 text-3xl shadow-inner"/>
                    <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Portal Masuk</h2>
                    <p className="text-sm text-gray-500 mt-1">Masuk untuk mengelola atau mengakses ebook</p>
                </div>

                {/* Form Login */}
                <form onSubmit={handleSubmit} className="space-y-4">
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
                            placeholder="••••••••"
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

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center gap-2 cursor-pointer text-gray-600 select-none">
                            <input
                                type="checkbox"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                            />
                            <span className="text-xs">Ingat Saya</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 text-sm"
                    >
                        {processing ? 'Memproses...' : 'Masuk Sekarang'}
                    </button>
                </form>

                {/* Footer Link */}
                <div className="mt-6 text-center pt-4 border-t border-gray-100 flex flex-col gap-2">
                    <p className="text-xs text-gray-500">
                        Belum punya akun?{' '}
                        <Link href="/register" className="text-blue-600 hover:underline font-semibold">
                            Daftar Sekarang
                        </Link>
                    </p>
                    <Link
                        href="/user/books"
                        className="text-xs text-gray-500 hover:text-blue-600 transition-colors font-medium inline-flex items-center justify-center gap-1"
                    >
                        ← Kembali ke Katalog Ebook
                    </Link>
                </div>

            </div>
        </div>
    );
}