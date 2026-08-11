<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Buku - {{ $book->title }}</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 text-gray-900 font-sans">

    <nav class="bg-blue-600 text-white shadow-md p-4">
        <div class="container mx-auto">
            <h1 class="text-xl font-bold">📚 Admin Panel - Ebook Library</h1>
        </div>
    </nav>

    <main class="container mx-auto px-4 py-8 max-w-2xl">
        <a href="{{ route('books.show', $book->id) }}" class="text-blue-600 hover:text-blue-800 font-medium mb-6 inline-block">← Batal & Kembali</a>

        <div class="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 class="text-2xl font-bold mb-6 text-gray-800">Edit Data Ebook</h2>

            @if($errors->any())
                <div class="mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded shadow-sm">
                    <strong>❌ Gagal memperbarui data:</strong>
                    <ul class="mt-2 list-disc list-inside text-sm">
                        @foreach($errors->all() as $error)
                            <li>{{ $error }}</li>
                        @endforeach
                    </ul>
                </div>
            @endif

            <form action="{{ route('books.update', $book->id) }}" method="POST" enctype="multipart/form-data" class="space-y-4">
                @csrf
                @method('PUT')

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Judul Buku</label>
                    <input type="text" name="title" value="{{ old('title', $book->title) }}" required class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Penulis</label>
                        <input type="text" name="author" value="{{ old('author', $book->author) }}" required class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                        <input type="text" name="category" value="{{ old('category', $book->category) }}" required class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Sinopsis / Deskripsi</label>
                    <textarea name="description" rows="4" class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500">{{ old('description', $book->description) }}</textarea>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Sampul Buku Baru (Opsional)</label>
                    @if($book->cover_image)
                        <p class="text-xs text-gray-500 mb-2">Cover saat ini: <span class="font-semibold text-gray-700">{{ $book->cover_image }}</span></p>
                    @endif
                    <input type="file" name="cover_image" accept="image/png, image/jpeg, image/jpg" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                    <span class="text-xs text-gray-400">Biarkan kosong jika tidak ingin mengubah cover.</span>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">File PDF Baru (Opsional)</label>
                    <input type="file" name="pdf_file" accept=".pdf" class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                    <span class="text-xs text-gray-400">Biarkan kosong jika tidak ingin mengganti file PDF.</span>
                </div>

                <button type="submit" class="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg shadow transition-colors duration-200 mt-4 cursor-pointer">
                    Update Buku
                </button>
            </form>
        </div>
    </main>

</body>
</html>