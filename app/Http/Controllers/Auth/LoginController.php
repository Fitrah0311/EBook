<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LoginController extends Controller
{
    // Tampilkan Halaman Login React
    public function showLoginForm()
    {
        // Jika sudah login sebagai admin, langsung lempar ke dashboard admin
        if (Auth::check() && Auth::user()->role === 'admin') {
            return redirect()->route('admin.books.index');
        }

        return Inertia::render('Auth/Login');
    }

    // Proses Autentikasi Login
    public function login(Request $request)
{
    $credentials = $request->validate([
        'email'    => ['required', 'email'],
        'password' => ['required'],
    ]);

    if (Auth::attempt($credentials, $request->boolean('remember'))) {
        $request->session()->regenerate();

        $user = Auth::user();

        // SIMPAN STATUS ADMIN DI SESSION SECARA EKSPLISIT
        if (strtolower($user->role) === 'admin') {
            session(['is_admin' => true]); // Simpan flag admin
            return redirect('/admin/books');
        }

        return redirect('/user/books');
    }

    return back()->withErrors([
        'email' => 'Email atau password yang Anda masukkan salah.',
    ])->onlyInput('email');
}

    // Proses Logout
    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('user.books.index')->with('success', 'Anda telah berhasil logout.');
    }
}