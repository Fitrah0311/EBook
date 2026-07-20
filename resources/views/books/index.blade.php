<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ebook Store - Koleksi Buku</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 text-gray-900 font-sans">

    <!-- Navbar -->
    <nav class="bg-blue-600 text-white shadow-md p-4">
        <div class="container mx-auto flex justify-between items-center">
            <h1 class="text-xl font-bold tracking-wide">📚 Ebook Library</h1>
            <span class="text-sm bg-blue-700 px-3 py-1 rounded-full">Laravel 13 Dev</span>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
        
        <!-- Notifikasi Sukses / Flash Message -->
        @if(session('success'))
            <div class="mb-6 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 rounded shadow-sm">
                {{ session('success') }}
            </div>
        @endif

        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Semua Koleksi Ebook</h2>
            <a href="{{ route('books.create') }}" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors duration-200">
                + Tambah Buku Baru
            </a>
        </div>

        @if($books->isEmpty())
            <div class="bg-white p-6 rounded-lg shadow-sm text-center">
                <p class="text-gray-500 text-lg">Belum ada koleksi buku saat ini. Hubungi Admin untuk upload!</p>
            </div>
        @else
            <!-- Grid Card Buku -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                @foreach($books as $book)
                    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        
                        <!-- Logika Cover Gambar -->
                        @if($book->cover_image)
                            <img src="{{ asset('storage/' . $book->cover_image) }}" alt="{{ $book->title }}" class="w-full h-48 object-cover">
                        @else
                            <!-- Placeholder kalau tidak ada cover -->
                            <div class="h-48 bg-gray-300 flex items-center justify-center text-gray-500">
                                <span>No Cover Image</span>
                            </div>
                        @endif
                        
                        <!-- Detail Buku -->
                        <div class="p-4">
                            <span class="text-xs font-semibold text-blue-600 uppercase tracking-wider bg-blue-50 px-2 py-1 rounded">
                                {{ $book->category }}
                            </span>
                            <h3 class="font-bold text-lg mt-2 text-gray-800 line-clamp-1">{{ $book->title }}</h3>
                            <p class="text-sm text-gray-600 mb-4">Penulis: {{ $book->author }}</p>
                            
                            <!-- Tombol Baca -->
                            <a href="{{ route('books.show', $book->id) }}" class="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition-colors duration-200">
                                Baca Ebook
                            </a>
                        </div>

                    </div>
                @endforeach
            </div>
        @endif
    </main>

</body>
</html>