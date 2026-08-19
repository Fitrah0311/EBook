import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export default function UserLayout({ children }) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    const navItems = [
        { label: 'Katalog Ebook', href: '/user/books', icon: '📚' },
        { label: 'Bookmark', href: '/user/bookmarks', icon: '🔖' },
        { label: 'Profil Akun', href: '/user/profile', icon: '👤' },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row text-gray-900 font-sans">
            {/* Mobile Topbar */}
            <div className="md:hidden bg-blue-600 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
                <h1 className="font-bold text-lg flex items-center gap-2">
                    <span>📚</span> Ebook Store
                </h1>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white focus:outline-none"
                >
                    {sidebarOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Sidebar Overlay (Mobile) */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-slate-900 text-white flex flex-col justify-between p-5 z-50 transition-transform duration-200 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}
            >
                <div>
                    {/* Brand */}
                    <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
                        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-xl shadow">
                            📚
                        </div>
                        <div>
                            <h2 className="font-extrabold text-base leading-tight">Ebook Library</h2>
                            <span className="text-[11px] text-blue-400 font-medium">Reader Portal</span>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="mt-6 space-y-1.5">
                        {navItems.map((item, idx) => (
                            <Link
                                key={idx}
                                href={item.href}
                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
                            >
                                <span className="text-base">{item.icon}</span>
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </nav>
                </div>

                {/* Profile & Logout Section */}
                <div className="pt-4 border-t border-slate-800">
                    {user ? (
                        <div className="space-y-3">
                            <div className="flex items-center gap-3 bg-slate-800/60 p-3 rounded-xl border border-slate-700/50">
                                <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm shadow">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                                <div className="overflow-hidden">
                                    <p className="text-xs font-bold text-white truncate">{user.name}</p>
                                    <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                                </div>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="w-full bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/30 text-xs font-semibold py-2 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                            >
                                Keluar Akun
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow"
                        >
                            🔑 Masuk / Login
                        </Link>
                    )}
                </div>
            </aside>

            {/* Content Wrapper */}
            <div className="flex-1 flex flex-col min-w-0">
                <main className="p-4 md:p-8 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
}