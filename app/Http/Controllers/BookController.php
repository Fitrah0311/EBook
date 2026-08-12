<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class BookController extends Controller
{
    // Tampilan Untuk User Biasa
    public function index(Request $request)
    {
        $query = Book::query();

        if ($request->filled('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('author', 'like', "%{$search}%");
            });
        }

        if ($request->filled('category')) {
            $query->where('category', $request->category);
        }

        $books = $query->latest()->get();
        $categories = Book::select('category')->distinct()->pluck('category');

        // Mengarah ke Tampilan User (UserIndex.jsx)
        return Inertia::render('Books/UserIndex', [
            'books'      => $books,
            'categories' => $categories,
            'filters'    => $request->only(['search', 'category']),
        ]);
    }

    // Tampilan Untuk Admin Kelola Data
    public function adminIndex(Request $request)
    {
        // Cek apakah session admin ada, kalau tidak ada Banting/Redirect ke /user/books
        if (!session('is_admin')) {
            return redirect()->route('user.books.index')->with('error', 'Akses Ditolak! Anda bukan Admin.');
        }

        $books = Book::latest()->get();
        $categories = Book::select('category')->distinct()->pluck('category');

        return Inertia::render('Books/Index', [
            'books'      => $books,
            'categories' => $categories,
        ]);
    }

    public function create()
    {
        // Render komponen React di resources/js/Pages/Books/Create.jsx
        return Inertia::render('Books/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'author'      => 'required|string|max:255',
            'category'    => 'required|string|max:255',
            'description' => 'nullable|string',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:20048',
            'pdf_file'    => 'required|file|mimes:pdf|max:10240', 
        ]);

        try {
            if ($request->hasFile('pdf_file')) {
                $file = $request->file('pdf_file');
                $pdfPath = $file->store('ebooks', 'public'); 
            } else {
                return redirect()->back()->withErrors(['pdf_file' => 'File PDF tidak ditemukan.'])->withInput();
            }

            $coverPath = null;
            if ($request->hasFile('cover_image')) {
                $coverFile = $request->file('cover_image');
                $coverPath = $coverFile->store('covers', 'public');
            }

            Book::create([
                'title'       => $request->title,
                'author'      => $request->author,
                'category'    => $request->category,
                'description' => $request->description,
                'cover_image' => $coverPath,
                'file_path'   => $pdfPath,
            ]);

            return redirect()->route('books.index')->with('success', 'Buku baru berhasil ditambahkan!');

        } catch (\Exception $e) {
            Log::error('Gagal mengunggah file ebook: ' . $e->getMessage());

            return redirect()->back()->withInput()->withErrors([
                'error' => 'Gagal memproses unggahan: ' . $e->getMessage()
            ]);
        }
    }

    public function show(Request $request, string $id)
    {
        $book = Book::findOrFail($id);
        // cek apakah route saat ini adalah route admin atau user
        $isAdmin = $request->is('admin/*');
        return Inertia::render('Books/Show', [
        'book'    => $book,
        'isAdmin' => $isAdmin // Kirim boolean true/false ke React
        ]);
    }

    public function edit(Book $book)
    {
        // Render komponen React di resources/js/Pages/Books/Edit.jsx
        return Inertia::render('Books/Edit', [
            'book' => $book
        ]);
    }

    public function update(Request $request, Book $book)
    {
        $request->validate([
            'title'       => 'required|string|max:255',
            'author'      => 'required|string|max:255',
            'category'    => 'required|string|max:255',
            'description' => 'nullable|string',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:20048',
            'pdf_file'    => 'nullable|file|mimes:pdf|max:10240',
        ]);

        try {
            $pdfPath = $book->file_path;
            $coverPath = $book->cover_image;

            if ($request->hasFile('pdf_file')) {
                if ($book->file_path && Storage::disk('public')->exists($book->file_path)) {
                    Storage::disk('public')->delete($book->file_path);
                }
                $file = $request->file('pdf_file');
                $pdfPath = $file->store('ebooks', 'public');
            }

            if ($request->hasFile('cover_image')) {
                if ($book->cover_image && Storage::disk('public')->exists($book->cover_image)) {
                    Storage::disk('public')->delete($book->cover_image);
                }
                $coverFile = $request->file('cover_image');
                $coverPath = $coverFile->store('covers', 'public');
            }

            $book->update([
                'title'       => $request->title,
                'author'      => $request->author,
                'category'    => $request->category,
                'description' => $request->description,
                'cover_image' => $coverPath,
                'file_path'   => $pdfPath,
            ]);

            return redirect()->route('books.index')->with('success', 'Buku berhasil diperbarui!');

        } catch (\Exception $e) {
            Log::error('Gagal memperbarui data buku: ' . $e->getMessage());

            return redirect()->back()->withInput()->withErrors([
                'error' => 'Gagal memproses pembaruan: ' . $e->getMessage()
            ]);
        }
    }

    public function streamFile(Book $book)
    {
        if (!$book->file_path || !Storage::disk('public')->exists($book->file_path)) {
            abort(404, 'File tidak ditemukan.');
        }

        $filePath = Storage::disk('public')->path($book->file_path);
        $fileName = Str::slug($book->title) . '.pdf';

        return response()->file($filePath, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . $fileName . '"',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }

    public function destroy(Book $book)
    {
        if ($book->cover_image && Storage::disk('public')->exists($book->cover_image)) {
            Storage::disk('public')->delete($book->cover_image);
        }

        if ($book->file_path && Storage::disk('public')->exists($book->file_path)) {
            Storage::disk('public')->delete($book->file_path);
        }

        $book->delete();
        return redirect()->route('books.index')->with('success', 'Buku berhasil dihapus dari katalog!');
    }
}