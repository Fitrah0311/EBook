<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
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

        return Inertia::render('Books/UserIndex', [
            'books'      => $books,
            'categories' => $categories,
            'filters'    => $request->only(['search', 'category']),
        ]);
    }

    // Tampilan Untuk Admin Kelola Data
    public function adminIndex(Request $request)
    {
        $isUserAdmin = Auth::check() && (strtolower(Auth::user()->role) === 'admin' || session('is_admin'));

        if (!$isUserAdmin) {
            return redirect()->route('user.books.index')->with('error', 'Akses Ditolak!');
        }

        $books = Book::latest()->get();
        $categories = Book::select('category')->distinct()->pluck('category');

        return Inertia::render('Books/AdminIndex', [
            'books'      => $books,
            'categories' => $categories,
            'filters'    => $request->only(['search', 'category']),
        ]);
    }

    public function create()
    {
        return Inertia::render('Books/Create');
    }

    public function store(Request $request)
    {
        // Validasi: Mendukung nama field 'file_path' maupun 'pdf_file'
        $request->validate([
            'title'       => 'required|string|max:255',
            'author'      => 'required|string|max:255',
            'category'    => 'required|string|max:255',
            'description' => 'nullable|string',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
            'file_path'   => 'nullable|file|mimes:pdf|max:20480',
            'pdf_file'    => 'nullable|file|mimes:pdf|max:20480',
        ]);

        try {
            // Tangkap file PDF dari 'file_path' atau 'pdf_file'
            $pdfPath = null;
            if ($request->hasFile('file_path')) {
                $pdfPath = $request->file('file_path')->store('ebooks', 'public');
            } elseif ($request->hasFile('pdf_file')) {
                $pdfPath = $request->file('pdf_file')->store('ebooks', 'public');
            }

            // Tangkap cover image
            $coverPath = null;
            if ($request->hasFile('cover_image')) {
                $coverPath = $request->file('cover_image')->store('covers', 'public');
            }

            Book::create([
                'title'       => $request->title,
                'author'      => $request->author,
                'category'    => $request->category,
                'description' => $request->description,
                'cover_image' => $coverPath,
                'file_path'   => $pdfPath,
            ]);

            return redirect()->route('admin.books.index')->with('success', 'Buku berhasil ditambahkan!');

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
        $isAdmin = $request->is('admin/*');

        return Inertia::render('Books/Show', [
            'book'    => $book,
            'isAdmin' => $isAdmin
        ]);
    }

    public function edit(Book $book)
    {
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
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,webp,gif|max:10240',
            'file_path'   => 'nullable|file|mimes:pdf|max:20480',
            'pdf_file'    => 'nullable|file|mimes:pdf|max:20480',
        ]);

        try {
            $pdfPath = $book->file_path;
            $coverPath = $book->cover_image;

            // Update file PDF jika ada upload baru
            $uploadedPdf = $request->file('file_path') ?? $request->file('pdf_file');
            if ($uploadedPdf) {
                if ($book->file_path && Storage::disk('public')->exists($book->file_path)) {
                    Storage::disk('public')->delete($book->file_path);
                }
                $pdfPath = $uploadedPdf->store('ebooks', 'public');
            }

            // Update Cover Image jika ada upload baru
            if ($request->hasFile('cover_image')) {
                if ($book->cover_image && Storage::disk('public')->exists($book->cover_image)) {
                    Storage::disk('public')->delete($book->cover_image);
                }
                $coverPath = $request->file('cover_image')->store('covers', 'public');
            }

            $book->update([
                'title'       => $request->title,
                'author'      => $request->author,
                'category'    => $request->category,
                'description' => $request->description,
                'cover_image' => $coverPath,
                'file_path'   => $pdfPath,
            ]);

            // Redirect kembali ke admin.books.index
            return redirect()->route('admin.books.index')->with('success', 'Buku berhasil diperbarui!');

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
        // Redirect kembali ke admin.books.index
        return redirect()->route('admin.books.index')->with('success', 'Buku berhasil dihapus dari katalog!');
    }
}