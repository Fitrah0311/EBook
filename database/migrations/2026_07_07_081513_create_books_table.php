<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table) {
            $table->id();
            $table->string('title');            // Judul Buku
            $table->string('author');           // Penulis
            $table->text('description')->nullable(); // Deskripsi/Sinopsis (boleh kosong)
            $table->string('category');         // Kategori Buku (e.g., Informatika, Novel)
            $table->string('cover_image')->nullable(); // Path untuk foto cover
            $table->string('file_path');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
