import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';

export default function UserLayout({ children }) {
    const { auth } = usePage().props;
    const { url } = usePage();
    const user = auth?.user;
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    const navItems = [
        { label: 'Katalog', href: '/user/books', icon: '📚' },
        { label: 'Bookmark', href: '/user/bookmarks', icon: '🔖' },
        { label: 'Profil Akun', href: '/user/profile', icon: '👤' },
    ];

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row text-gray-900 font-sans">
            {/* Mobile Topbar */}
            <div className="md:hidden bg-slate-900 text-white p-4 flex justify-between items-center sticky top-0 z-50 shadow-md">
                <h1 className="font-bold text-lg flex items-center gap-2">
                    <img 
                        src="/images/logo.jpeg" 
                        alt="Logo Ebook Library" 
                        className="w-12 h-12 rounded-xl object-contain shadow-md"/>
                        Ebook Library
                </h1>
                <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white focus:outline-none transition-colors"
                    aria-label="Toggle menu"
                >
                    {sidebarOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Sidebar Overlay (Mobile) */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-slate-900 text-white flex flex-col justify-between p-5 z-50 shadow-xl transition-transform duration-200 ease-in-out ${
                    sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
                }`}
            >
                <div>
                    {/* Brand Header */}
                    <div className="flex items-center gap-3 pb-6 border-b border-slate-800">
                        <img 
                        src="/images/logo.jpeg" 
                        alt="Logo Ebook Library" 
                        className="w-12 h-12 rounded-xl object-contain shadow-md"/>
                        <div>
                            <h2 className="font-bold text-base tracking-tight leading-tight">Ebook Library</h2>
                            <span className="text-[11px] text-blue-400 font-medium">Reader Portal</span>
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="mt-6 space-y-1.5">
                        {navItems.map((item, idx) => {
                            const isActive = url.startsWith(item.href);
                            return (
                                <Link
                                    key={idx}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                        isActive
                                            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                                            : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                                    }`}
                                >
                                    <span className="text-base">{item.icon}</span>
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Profile & Authentication Section */}
                <div className="pt-4 border-t border-slate-800">
                    {user ? (
                        <div className="space-y-3">
                            <Link 
                                href="/user/profile"
                                className="flex items-center gap-3 bg-slate-800/80 hover:bg-slate-800 p-2.5 rounded-xl border border-slate-700/60 transition-colors group"
                            >
                                {/* Avatar Display */}
                                {user.avatar ? (
                                    <img
                                        src={`/storage/${user.avatar}`}
                                        alt={user.name}
                                        className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500 shadow-sm shrink-0"
                                    />
                                ) : (
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white font-bold flex items-center justify-center text-sm shadow ring-2 ring-blue-500/50 shrink-0">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                )}

                                <div className="overflow-hidden flex-1">
                                    <div className="flex items-center justify-between gap-1">
                                        <p className="text-xs font-bold text-white truncate group-hover:text-blue-300 transition-colors">
                                            {user.name}
                                        </p>
                                        <span className="text-[9px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-400 shrink-0">
                                            {user.role || 'user'}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
                                </div>
                            </Link>

                            <button
                                onClick={handleLogout}
                                className="w-full bg-red-600/10 hover:bg-red-600 text-red-400 hover:text-white border border-red-500/20 text-xs font-semibold py-2 rounded-xl transition-all flex items-center justify-center gap-1.5"
                            >
                                Keluar Akun
                            </button>
                        </div>
                    ) : (
                        <Link
                            href="/login"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/30"
                        >
                            Masuk / Login
                        </Link>
                    )}
                </div>
            </aside>

            {/* Content Wrapper */}
            <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                <main className="p-4 md:p-8 flex-1 max-w-7xl mx-auto w-full">
                    {children}
                </main>
            </div>
        </div>
    );
}