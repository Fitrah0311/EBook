<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookmarkController extends Controller
{
    // Halaman daftar buku yang di-bookmark user
    public function index()
    {
        $user = Auth::user();
        $bookmarkedBooks = $user->bookmarkedBooks()->latest()->get();

        return Inertia::render('Books/Bookmarks', [
            'books' => $bookmarkedBooks,
        ]);
    }

    // Toggle bookmark (Simpan / Batal Simpan)
    public function toggle(Request $request, Book $book)
    {
        $user = Auth::user();

        if ($user->bookmarkedBooks()->where('book_id', $book->id)->exists()) {
            $user->bookmarkedBooks()->detach($book->id);
            return back()->with('success', 'Buku dihapus dari bookmark.');
        }

        $user->bookmarkedBooks()->attach($book->id);
        return back()->with('success', 'Buku berhasil disimpan ke bookmark!');
    }
}