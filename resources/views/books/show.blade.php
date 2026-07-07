<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $book->title }} - Detail Ebook</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 text-gray-900 font-sans">

    <nav class="bg-blue-600 text-white shadow-md p-4">
        <div class="container mx-auto">
            <a href="{{ route('books.index') }}" class="text-xl font-bold tracking-wide hover:text-blue-200">
                📚 Ebook Library
            </a>
        </div>
    </nav>

    <main class="container mx-auto px-4 py-8 max-w-4xl">
        <a href="{{ route('books.index') }}" class="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium mb-6">
            ← Kembali ke Semua Koleksi
        </a>

        <div class="bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8 flex flex-col md:flex-row gap-8">
            
            <div class="w-full md:w-1/3 h-64 bg-gray-300 rounded-lg flex items-center justify-center text-gray-500 shadow-inner">
                <span class="text-center p-4">No Cover Image</span>
            </div>

            <div class="w-full md:w-2/3 flex flex-col justify-between">
                <div>
                    <span class="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">
                        {{ $book->category }}
                    </span>
                    <h2 class="text-3xl font-bold text-gray-800 mt-2 mb-1">{{ $book->title }}</h2>
                    <p class="text-gray-600 font-medium mb-4">Penulis: <span class="text-gray-800">{{ $book->author }}</span></p>
                    
                    <hr class="my-4 border-gray-200">
                    
                    <h4 class="font-bold text-gray-700 mb-2">Sinopsis / Deskripsi:</h4>
                    <p class="text-gray-650 leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-150">
                        {{ $book->description ?? 'Tidak ada deskripsi untuk buku ini.' }}
                    </p>
                </div>

                <div class="mt-6">
                    <a href="#" class="inline-block text-center bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg shadow transition-colors duration-200">
                        Download / Baca PDF (Coming Soon)
                    </a>
                </div>
            </div>

        </div>
    </main>

</body>
</html>