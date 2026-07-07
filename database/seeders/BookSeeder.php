<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Book;
use Illuminate\Database\Seeder;

class BookSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Book::create([
            'title' => 'Struktur Data',
            'author' => 'John Doe',
            'description' => 'Kupas tuntas Array, Linked List, Stack, hingga Queue dengan implementasi nyata.',
            'category' => 'Informatika',
            'cover_image' => null,
            'file_path' => 'ebooks/struktur-data.pdf'
        ]);
    }
}
