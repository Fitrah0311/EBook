<?php

namespace App\Models;
use App\Models\User;

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

    public function bookmarkedByUsers()
    {
        return $this->belongsToMany(User::class, 'bookmarks', 'book_id', 'user_id')->withTimestamps();
    }
}