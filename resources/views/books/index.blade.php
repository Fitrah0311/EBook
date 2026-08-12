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

        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <h2 class="text-2xl font-bold text-gray-800">Semua Koleksi Ebook</h2>
            <a href="{{ route('books.create') }}" class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg shadow transition-colors duration-200">
                + Tambah Buku Baru
            </a>
        </div>

        <!-- Form Fitur Pencarian & Filter Kategori -->
        <form action="{{ route('books.index') }}" method="GET" class="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row gap-4">
            <!-- Input Search -->
            <div class="flex-grow">
                <input type="text" 
                       name="search" 
                       value="{{ request('search') }}" 
                       placeholder="Cari judul buku atau penulis..." 
                       class="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
            </div>

            <!-- Select Category -->
            <div class="w-full md:w-48">
                <select name="category" onchange="this.form.submit()" class="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
                    <option value="">Semua</option>
                    @if(isset($categories))
                        @foreach($categories as $cat)
                            <option value="{{ $cat }}" {{ request('category') == $cat ? 'selected' : '' }}>
                                {{ $cat }}
                            </option>
                        @endforeach
                    @endif
                </select>
            </div>

            <!-- Tombol Submit & Reset -->
            <div class="flex gap-2">
                <button type="submit" class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-colors duration-200">
                    Cari
                </button>
                @if(request('search') || request('category'))
                    <a href="{{ route('books.index') }}" class="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors duration-200 flex items-center justify-center">
                        Reset
                    </a>
                @endif
            </div>
        </form>

        @if($books->isEmpty())
            <div class="bg-white p-6 rounded-lg shadow-sm text-center">
                <p class="text-gray-500 text-lg">Tidak ada koleksi buku yang ditemukan.</p>
                @if(request('search') || request('category'))
                    <a href="{{ route('books.index') }}" class="text-blue-600 hover:underline mt-2 inline-block">Lihat Semua Buku</a>
                @endif
            </div>
        @else
            <!-- Grid Card Katalog Buku -->
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                @foreach($books as $book)
                    <div class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between">
                        
                        <div>
                            <!--Logika Cover Gambar -->
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
                            </div>
                        </div>

                        <div class="p-4 pt-0">
                            <!-- Tombol Baca -->
                            <a href="{{ route('books.show', $book->id) }}" class="block text-center w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded transition-colors duration-200">
                                Lihat Ebook
                            </a>
                        </div>

                    </div>
                @endforeach
            </div>
        @endif
    </main>

</body>
</html>