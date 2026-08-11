<?php

namespace App\Http\Controllers;

use App\Models\Book;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
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
        'cover_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:20048',
        'pdf_file'    => 'required|file|mimes:pdf|max:10240', 
    ]);

    try {
        // 2. Proses upload file PDF
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

        // 4. Simpan path ke database
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

    public function edit(Book $book)
    {
        return view('books.edit', compact('book'));
    }

    public function update(Book $book, Request $request)
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

    public function show(string $id)
    {
        $book = Book::findOrFail($id);
        return view('books.show', compact('book'));
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