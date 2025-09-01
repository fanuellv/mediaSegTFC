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
                'email' => 'nossa@gmail.com',
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
                'email' => 'mundial@gmail.com',
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
                'email' => 'fortaleza@gmail.com',
                'descricao' => 'Seguros personalizados e assistência ao cliente.',
                'administrador_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'nome' => 'Global Seguros',
                'nif' => '500000004',
                'telefone' => '923444444',
                'foto' => 'seguradoras/global.png',
                'endereco' => 'Luanda, Maianga',
                'email' => 'globalseguros@gmail.com',
                'descricao' => 'Soluções de seguros para particulares e empresas.',
                'administrador_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'nome' => 'BIC Seguros',
                'nif' => '500000005',
                'telefone' => '923555555',
                'foto' => 'seguradoras/bic.png',
                'endereco' => 'Luanda, Ingombota',
                'email' => 'bicseguros@gmail.com',
                'descricao' => 'Seguros inovadores com a confiança do Banco BIC.',
                'administrador_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'nome' => 'Viva Seguros',
                'nif' => '500000006',
                'telefone' => '923666666',
                'foto' => 'seguradoras/viva.png',
                'endereco' => 'Luanda, Kilamba',
                'email' => 'vivaseguros@gmail.com',
                'descricao' => 'Seguros acessíveis para proteger o que mais importa.',
                'administrador_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'nome' => 'Saham Seguros',
                'nif' => '500000007',
                'telefone' => '923777777',
                'foto' => 'seguradoras/saham.png',
                'endereco' => 'Luanda, Alvalade',
                'email' => 'sahamseguros@gmail.com',
                'descricao' => 'Parte do grupo Sanlam, oferecendo confiança e cobertura internacional.',
                'administrador_id' => 1,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            
        ];

        DB::table('seguradoras')->insert($data);
    
    }
}
