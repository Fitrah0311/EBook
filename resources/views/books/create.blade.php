<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Buku Baru - Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-100 text-gray-900 font-sans">

    <nav class="bg-blue-600 text-white shadow-md p-4">
        <div class="container mx-auto">
            <h1 class="text-xl font-bold">📚 Admin Panel - Ebook Library</h1>
        </div>
    </nav>

    <main class="container mx-auto px-4 py-8 max-w-2xl">
        <a href="{{ route('books.index') }}" class="text-blue-600 hover:text-blue-800 font-medium mb-6 inline-block">← Kembali</a>

        <div class="bg-white rounded-xl shadow-md p-6 md:p-8">
            <h2 class="text-2xl font-bold mb-6 text-gray-800">Tambah Koleksi Ebook Baru</h2>

            <form action="{{ route('books.store') }}" method="POST" enctype="multipart/form-data" class="space-y-4">
                @csrf

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Judul Buku</label>
                    <input type="text" name="title" required class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Penulis</label>
                        <input type="text" name="author" required class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                        <input type="text" name="category" required placeholder="Contoh: Informatika, Novel" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Sinopsis / Deskripsi</label>
                    <textarea name="description" rows="4" class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"></textarea>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">File PDF Ebook</label>
                    <!-- Ubah yang tadinya ada 'required' menjadi tanpa required seperti di bawah ini -->
                    <input type="file" name="file_path" accept=".pdf" class="w-full text-sm text-gray-500 ...">
                </div>

                <button type="submit" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow transition-colors duration-200 mt-4">
                    Simpan & Publikasikan
                </button>
            </form>
        </div>
    </main>

</body>
</html>