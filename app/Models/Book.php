<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Book extends Model
{
    // Daftarkan kolom yang boleh diisi dari Form/Request
    protected $fillable = [
        'title',
        'author',
        'description',
        'cover_image',
        'category',
        'file_path'
    ];
}