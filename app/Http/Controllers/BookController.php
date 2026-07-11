<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\StreamedResponse;

class BookController extends Controller
{
    public function index()
    {
        $books = Book::all();
        return view('books.index', compact('books'));
    }

    public function create()
    {
        return view('books.create');
    }

    public function store(Request $request)
    {
        // 1. Validasi file asli dengan limit ukuran
        $request->validate([
            'title'       => 'required|string|max:255',
            'author'      => 'required|string|max:255',
            'category'    => 'required|string|max:255',
            'description' => 'nullable|string',
            'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'pdf_file'    => 'required|file|mimes:pdf|max:10240', 
        ]);

        try {
            // 2. Proses upload file ke folder
            if ($request->hasFile('pdf_file')) {
                $file = $request->file('pdf_file');
                $path = $file->store('ebooks', 'public'); 
            } else {
                return response()->json(['success' => false, 'message' => 'File tidak ditemukan.'], 400);
            }

            // 3. Simpan path lokasinya ke database
            Book::create([
                'title'       => $request->title,
                'author'      => $request->author,
                'category'    => $request->category,
                'description' => $request->description,
                'cover_image' => $request->cover_image,
                'file_path'   => $path,
            ]);

            return response()->json(['success' => true]);

        } catch (\Exception $e) {
            Log::error('Gagal mengunggah file ebook: ' . $e->getMessage());

            return response()->json([
                'success' => false, 
                'message' => 'Gagal memproses unggahan: ' . $e->getMessage()
            ], 500);
        }
    }

    public function show(string $id)
    {
        $book = Book::findOrFail($id);
        return view('books.show', compact('book'));
    }

    public function streamFile(Book $book)
{
    // Pastikan file-nya ada
    if (!$book->file_path || !Storage::disk('public')->exists($book->file_path)) {
        abort(404, 'File tidak ditemukan.');
    }

    $filePath = Storage::disk('public')->path($book->file_path);
    
    // Kirim response streaming dengan Content-Type yang tepat
    return response()->file($filePath, [
        'Content-Type' => 'application/pdf',
        'Content-Disposition' => 'inline; filename="' . $book->title . '.pdf"',
        'Cache-Control' => 'no-store, no-cache, must-revalidate, max-age=0',
    ]);
}
}