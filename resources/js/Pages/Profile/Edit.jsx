import React, { useState } from 'react';
import { useForm, router, usePage } from '@inertiajs/react';
import UserLayout from '@/Layouts/UserLayout';

export default function Edit({ user }) {
    const { flash } = usePage().props;

    // Form Edit Profil & Avatar
    const { data: profileData, setData: setProfileData, post: postProfile, processing: profileProcessing, errors: profileErrors } = useForm({
        name: user.name || '',
        avatar: null,
    });

    // Form Ganti Password
    const { data: passwordData, setData: setPasswordData, put: putPassword, processing: passwordProcessing, errors: passwordErrors, reset: resetPassword } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const [previewUrl, setPreviewUrl] = useState(
        user.avatar ? `/storage/${user.avatar}` : null
    );

    // Handle upload avatar preview
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileData('avatar', file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    // Submit Edit Profil
    const handleProfileSubmit = (e) => {
        e.preventDefault();
        postProfile('/user/profile', {
            preserveScroll: true,
        });
    };

    // Submit Ganti Password
    const handlePasswordSubmit = (e) => {
        e.preventDefault();
        putPassword('/user/profile/password', {
            preserveScroll: true,
            onSuccess: () => resetPassword(),
        });
    };

    // Handle Logout
    const handleLogout = (e) => {
        e.preventDefault();
        router.post('/logout');
    };

    return (
        <UserLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Pengaturan Akun 👤</h2>
                    <p className="text-sm text-gray-500">Kelola informasi data diri, foto profil, dan kata sandi</p>
                </div>

                {/* Flash Message */}
                {flash?.success && (
                    <div className="p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg shadow-sm text-sm">
                        {flash.success}
                    </div>
                )}

                {/* Section 1: Informasi Profil & Avatar */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                        Informasi Profil
                    </h3>

                    <form onSubmit={handleProfileSubmit} className="space-y-5">
                        {/* Foto Profil Preview & Input */}
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <div className="relative">
                                {previewUrl ? (
                                    <img
                                        src={previewUrl}
                                        alt="Avatar"
                                        className="w-24 h-24 rounded-full object-cover border-2 border-blue-500 shadow-md"
                                    />
                                ) : (
                                    <div className="w-24 h-24 rounded-full bg-blue-600 text-white font-bold text-3xl flex items-center justify-center shadow-md">
                                        {user.name?.charAt(0).toUpperCase()}
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                                    Ganti Foto Profil
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleAvatarChange}
                                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                />
                                <p className="text-[11px] text-gray-400 mt-1">Format: JPG, PNG, WEBP (Maks. 2MB)</p>
                                {profileErrors.avatar && (
                                    <p className="text-red-500 text-xs mt-1">{profileErrors.avatar}</p>
                                )}
                            </div>
                        </div>

                        {/* Nama Lengkap */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                                Nama Lengkap
                            </label>
                            <input
                                type="text"
                                value={profileData.name}
                                onChange={(e) => setProfileData('name', e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                required
                            />
                            {profileErrors.name && (
                                <p className="text-red-500 text-xs mt-1">{profileErrors.name}</p>
                            )}
                        </div>

                        {/* Email (Readonly) */}
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                                Alamat Email (Tidak Dapat Diubah)
                            </label>
                            <input
                                type="email"
                                value={user.email}
                                disabled
                                className="w-full px-4 py-2 border border-gray-200 bg-gray-50 text-gray-500 rounded-lg text-sm cursor-not-allowed"
                            />
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={profileProcessing}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow transition-colors text-sm disabled:opacity-50"
                            >
                                {profileProcessing ? 'Menyimpan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Section 2: Ganti Kata Sandi */}
                <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100">
                        Keamanan & Kata Sandi
                    </h3>

                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                                Kata Sandi Saat Ini
                            </label>
                            <input
                                type="password"
                                value={passwordData.current_password}
                                onChange={(e) => setPasswordData('current_password', e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                required
                            />
                            {passwordErrors.current_password && (
                                <p className="text-red-500 text-xs mt-1">{passwordErrors.current_password}</p>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                                    Kata Sandi Baru
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.password}
                                    onChange={(e) => setPasswordData('password', e.target.value)}
                                    placeholder="Minimal 6 karakter"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    required
                                />
                                {passwordErrors.password && (
                                    <p className="text-red-500 text-xs mt-1">{passwordErrors.password}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">
                                    Konfirmasi Kata Sandi Baru
                                </label>
                                <input
                                    type="password"
                                    value={passwordData.password_confirmation}
                                    onChange={(e) => setPasswordData('password_confirmation', e.target.value)}
                                    placeholder="Ulangi kata sandi baru"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={passwordProcessing}
                                className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-5 py-2.5 rounded-lg shadow transition-colors text-sm disabled:opacity-50"
                            >
                                {passwordProcessing ? 'Memperbarui...' : 'Ubah Kata Sandi'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Section 3: Logout Akun */}
                <div className="bg-red-50/50 rounded-xl p-6 border border-red-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h4 className="font-bold text-red-900 text-sm">Keluar dari Sesi Aplikasi</h4>
                        <p className="text-xs text-red-600 mt-0.5">Akhiri sesi login kamu pada perangkat ini.</p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-colors shadow flex items-center gap-1.5"
                    >
                        Keluar Akun (Logout)
                    </button>
                </div>
            </div>
        </UserLayout>
    );
}