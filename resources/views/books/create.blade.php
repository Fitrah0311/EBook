<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Tambah Buku Baru - JSON Mode</title>
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

            <div id="statusBanner" class="hidden mb-6 p-4 rounded shadow-sm"></div>

            <form id="ebookForm" class="space-y-4">
                @csrf
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Judul Buku</label>
                    <input type="text" id="title" required class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Penulis</label>
                        <input type="text" id="author" required class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-semibold text-gray-700 mb-1">Kategori</label>
                        <input type="text" id="category" required placeholder="Contoh: Informatika / Novel" class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Sinopsis / Deskripsi</label>
                    <textarea id="description" rows="4" class="w-full p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"></textarea>
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Sampul Buku (Gambar)</label>
                    <input type="file" id="coverInput" accept="image/png, image/jpeg, image/jpg" required class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                </div>

                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-1">Pilih File PDF Ebook</label>
                    <input type="file" id="pdfInput" accept=".pdf" required class="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100">
                </div>

                <button type="submit" id="submitBtn" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow transition-colors duration-200 mt-4">
                    Simpan & Publikasikan
                </button>
            </form>
        </div>
    </main>

<script>
document.getElementById('ebookForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const pdfInput = document.getElementById('pdfInput');
    const coverInput = document.getElementById('coverInput');
    const submitBtn = document.getElementById('submitBtn');
    const banner = document.getElementById('statusBanner');

    if (pdfInput.files.length === 0 || coverInput.files.length === 0) {
        alert('Pastikan file PDF dan Gambar Sampul sudah dipilih!');
        return;
    }

    submitBtn.innerText = 'Mengunggah Data Ebook...';
    submitBtn.disabled = true;
    banner.classList.add('hidden');

    const formData = new FormData();
    formData.append('_token', document.querySelector('input[name="_token"]').value);
    formData.append('title', document.getElementById('title').value);
    formData.append('author', document.getElementById('author').value);
    formData.append('category', document.getElementById('category').value);
    formData.append('description', document.getElementById('description').value);
    
    // Inject file biner asli ke FormData
    formData.append('pdf_file', pdfInput.files[0]);
    formData.append('cover_image', coverInput.files[0]); 

    fetch("{{ route('books.store') }}", {
        method: "POST",
        headers: {
            "Accept": "application/json"
        },
        body: formData
    })
    .then(async response => {
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await response.json() : null;

        if (!response.ok) {
            const errorMsg = data?.message || `Terjadi kesalahan (Status: ${response.status})`;
            throw new Error(errorMsg);
        }
        return data;
    })
    .then(data => {
        if(data && data.success) {
            window.location.href = "{{ route('books.index') }}";
        } else {
            throw new Error(data?.message || 'Gagal menyimpan data.');
        }
    })
    .catch(error => {
        banner.className = "mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded shadow-sm";
        banner.innerHTML = `<strong>❌ Error:</strong> ${error.message}`;
        banner.classList.remove('hidden');
        
        submitBtn.innerText = 'Simpan & Publikasikan';
        submitBtn.disabled = false;
    });
});
</script>
</body>
</html>