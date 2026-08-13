<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class AdminMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        // Pengecekan eksplisit: Wajib Login DAN Role sama dengan 'admin'
        if (Auth::check() && strtolower(Auth::user()->role) === 'admin') {
            return $next($request);
        }

        // Kalau gagal, tendang ke user/books
        return redirect()->route('user.books.index')->with('error', 'Akses khusus Admin!');
    }
}