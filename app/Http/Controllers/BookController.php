<?php

namespace App\Http\Controllers;
use App\Models\Book;
use Illuminate\Http\Request;

class BookController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $books = Book::all();
        return view('books.index', compact('books'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('books.create');
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    { 
        $request->validate([
            'title' => 'required|string|max:255',
            'author' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'description' => 'nullable|string',
            'file_path' => 'required|file|mimes:pdf|max:50000', // maksimal 50MB
        ]);

        $dummyPath = 'ebooks/dummy-file-' . time() . '.pdf';

        \App\Models\Book::create([
        'title'       => $request->title,
        'author'      => $request->author,
        'category'    => $request->category,
        'description' => $request->description,
        'file_path'   => 'ebooks/bypass-path.pdf', // Kita hardcode dulu path-nya
    ]);

    // Kembalikan ke halaman utama
    return redirect()->route('books.index')->with('success', 'Buku Meow berhasil masuk!');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $book = Book::findOrFail($id);
        return view('books.show', compact('book'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
