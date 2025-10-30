<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Faker\Factory as Faker;

class utilizador extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Inserir o utilizador principal (Fanuel)
        DB::table('clientes')->insert([
            'nome' => 'Fanuel',
            'sobrenome' => 'Sousa',
            'nome_usuario' => 'FanuelLV',
            'email' => 'fanueljuniorlv2@gmail.com',
            'dataRegistro' => '2001-08-12',
            'nif' => '006183429LA046',
            'senha' => Hash::make('123456789'),
            'telefone' => '940125778',
            'foto' => '',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        $faker = Faker::create('pt_PT'); // locale português

        for ($i = 1; $i <= 100; $i++) {
            DB::table('clientes')->insert([
                'nome' => $faker->firstName,
                'sobrenome' => $faker->lastName,
                'nome_usuario' => $faker->unique()->userName, // <- aqui
    'email' => $faker->unique()->safeEmail,       // <- e aqui
                'dataRegistro' => $faker->date('Y-m-d', 'now'),
                'nif' => strtoupper($faker->unique()->bothify('########LA###')),
                'senha' => Hash::make('Password*123'),
                'telefone' => $faker->phoneNumber,
                'foto' => '',
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    
    }
}
