<?php

namespace Database\Seeders;

use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class Seguradora extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $data = [
            [
                'nome' => 'Nossa Seguros',
                'nif' => '500000001',
                'telefone' => '923111111',
                'foto' => 'seguradoras/nossa.png',
                'endereco' => 'Luanda, Maianga',
                'descricao' => 'Seguradora nacional com foco em seguros de vida e automóvel.',
                'administrador_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'nome' => 'Mundial Seguros',
                'nif' => '500000002',
                'telefone' => '923222222',
                'foto' => 'seguradoras/mundial.png',
                'endereco' => 'Luanda, Ingombota',
                'descricao' => 'Oferece ampla cobertura para empresas e indivíduos.',
                'administrador_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'nome' => 'Fortaleza Seguros',
                'nif' => '500000003',
                'telefone' => '923333333',
                'foto' => 'seguradoras/fortaleza.png',
                'endereco' => 'Luanda, Talatona',
                'descricao' => 'Seguros personalizados e assistência ao cliente.',
                'administrador_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        DB::table('seguradoras')->insert($data);
    
    }
}
