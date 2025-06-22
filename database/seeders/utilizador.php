<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class utilizador extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('clientes')->insert([
            'nome' => 'Fanuel',
            'sobrenome' => 'Sousa',
            'nome_usuario' => 'FanuelLV',
            'email' => 'fanueljuniorlv2@gmail.com',
            'dataRegistro'=>date('2001-08-12'),
            'nif'=>'006183429LA046',
            'senha' => Hash::make('123456789'),
            'telefone'=>'940125778',
            'foto'=>'',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
