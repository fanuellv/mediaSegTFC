<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class Administrador extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('administrador')->insert([
            'nome' => 'Admin',
            'sobrenome' => 'Principal',
            'nome_usuario' => 'AdminUser',
            'email' => 'fanueljuniorlv2@gmail.com',
            'dataRegistro'=>date('2001-08-12'),
            'senha' => Hash::make('123456789'),
            'foto'=>'',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
