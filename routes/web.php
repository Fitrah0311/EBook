<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;

Route::get('/', function () {
    return view('welcome');
});
Route::resource('books', BookController::class);
// Redirect Halaman Utama ke Katalog Books
Route::get('/', function () {
    return redirect()->route('user.books.index');
});

// Route Khusus User Biasa (Tanpa Fitur CRUD)
Route::prefix('user')->group(function () {
    Route::get('/books', [BookController::class, 'index'])->name('user.books.index');
    Route::get('/books/{id}', [BookController::class, 'show'])->name('user.books.show');
    Route::get('/books/{book}/stream', [BookController::class, 'streamFile'])->name('user.books.stream');
});

// Route Khusus Admin Kelola Data (CRUD)
Route::prefix('admin')->group(function () {
    Route::get('/books', [BookController::class, 'adminIndex'])->name('admin.books.index');
    Route::get('/books/create', [BookController::class, 'create'])->name('admin.books.create');
    Route::post('/books', [BookController::class, 'store'])->name('admin.books.store');
    Route::get('/books/{id}', [BookController::class, 'show'])->name('admin.books.show');
    Route::get('/books/{book}/stream', [BookController::class, 'streamFile'])->name('user.books.stream');
    Route::get('/books/{book}/edit', [BookController::class, 'edit'])->name('admin.books.edit');
    Route::put('/books/{book}', [BookController::class, 'update'])->name('admin.books.update');
    Route::delete('/books/{book}', [BookController::class, 'destroy'])->name('admin.books.destroy');
});

