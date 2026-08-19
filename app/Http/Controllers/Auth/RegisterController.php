<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;

class RegisterController extends Controller
{
    // Tampilkan Form Register React
    public function showRegistrationForm()
    {
        if (Auth::check()) {
            return redirect()->route('user.books.index');
        }

        return Inertia::render('Auth/Register');
    }

    // Proses Pendaftaran Akun Baru
    public function register(Request $request)
    {
        $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed', 'min:6'],
        ], [
            'email.unique'       => 'Alamat email sudah terdaftar.',
            'password.confirmed' => 'Konfirmasi kata sandi tidak cocok.',
            'password.min'       => 'Kata sandi minimal 6 karakter.',
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
            'role'     => 'user', // Default pendaftar baru adalah user biasa
        ]);

        Auth::login($user);
        $request->session()->regenerate();

        return redirect()->route('user.books.index')->with('success', 'Akun berhasil dibuat! Selamat datang di Ebook Library.');
    }
}