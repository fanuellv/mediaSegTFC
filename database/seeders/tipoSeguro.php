<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class tipoSeguro extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        DB::table('TipoSeguro')->insert([
            'nome' => 'Vida',
        ]);
        DB::table('TipoSeguro')->insert([
            'nome' => 'Saude',
        ]);
        DB::table('TipoSeguro')->insert([
            'nome' => 'Automovel',
        ]);
        
    }
}
