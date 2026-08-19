<?php

use App\Http\Controllers\BookController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;

// Redirect Halaman Utama
Route::get('/', function () {
    return redirect()->route('user.books.index');
});

// -------------------------------------------------------------
// AUTH (LOGIN, REGISTER, LOGOUT)
// -------------------------------------------------------------
Route::get('/login', [LoginController::class, 'showLoginForm'])->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::get('/register', [RegisterController::class, 'showRegistrationForm'])->name('register');
Route::post('/register', [RegisterController::class, 'register']);

// -------------------------------------------------------------
// PORTAL USER
// -------------------------------------------------------------
Route::prefix('user')->group(function () {
    // Katalog Publik
    Route::get('/books', [BookController::class, 'index'])->name('user.books.index');
    Route::get('/books/{id}', [BookController::class, 'show'])->name('user.books.show');
    Route::get('/books/{book}/stream', [BookController::class, 'streamFile'])->name('user.books.stream');

    // Menu User Wajib Login (Bookmark & Profile)
    Route::middleware('auth')->group(function () {
        // Bookmark
        Route::get('/bookmarks', [BookmarkController::class, 'index'])->name('user.bookmarks.index');
        Route::post('/books/{book}/bookmark', [BookmarkController::class, 'toggle'])->name('user.bookmarks.toggle');

        // Profil Akun
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::post('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::put('/profile/password', [ProfileController::class, 'updatePassword'])->name('profile.password.update');
    });
});

// -------------------------------------------------------------
// PORTAL ADMIN
// -------------------------------------------------------------
Route::middleware(['web'])->prefix('admin')->group(function () {
    Route::get('/books', [BookController::class, 'adminIndex'])->name('admin.books.index');
    Route::get('/books/create', [BookController::class, 'create'])->name('admin.books.create');
    Route::post('/books', [BookController::class, 'store'])->name('admin.books.store');
    Route::get('/books/{id}', [BookController::class, 'show'])->name('admin.books.show');
    Route::get('/books/{book}/edit', [BookController::class, 'edit'])->name('admin.books.edit');
    Route::put('/books/{book}', [BookController::class, 'update'])->name('admin.books.update');
    Route::delete('/books/{book}', [BookController::class, 'destroy'])->name('admin.books.destroy');
});