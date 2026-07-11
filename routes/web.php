<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BookController;

Route::resource('books', BookController::class);
Route::get('/', function () {
    return view('welcome');
});
Route::get('/books/{book}/stream', [BookController::class, 'streamFile'])->name('books.stream');