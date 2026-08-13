<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Akun khusus ADMIN
        User::create([
            'name'     => 'Raden Admin',
            'email'    => 'admin@ebook.com',
            'password' => Hash::make('admin123'), // Encrypt password
            'role'     => 'admin',
        ]);

        // 2. Akun untuk USER biasa (buat tes)
        User::create([
            'name'     => 'User Pembaca',
            'email'    => 'user@gmail.com',
            'password' => Hash::make('user123'),
            'role'     => 'user',
        ]);
    }
}