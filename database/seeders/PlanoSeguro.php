<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Plano;
use App\Models\PlanoModel;
use App\Models\Seguradora;
use App\Models\SeguradoraModel;
use App\Models\Tipo;
use App\Models\tipoSeguro;
use Carbon\Carbon;

class PlanoSeguro extends Seeder
{
    public function run(): void
    {
        // Buscar tipos por nome
        $tipos = tipoSeguro::whereIn('nome', ['Vida', 'Saude', 'Automovel'])->get()->keyBy('nome');

        // Buscar seguradoras
        $nossa = SeguradoraModel::where('nome', 'Nossa Seguros')->first();
        $mundial = SeguradoraModel::where('nome', 'Mundial Seguros')->first();
        $fortaleza = SeguradoraModel::where('nome', 'Fortaleza Seguros')->first();

        // Planos para Nossa Seguros
        PlanoModel::create([
            'tipo_id' => $tipos['Vida']->id,
            'nome' => 'Vida Protegida',
            'descricao' => 'Plano de vida completo com benefícios adicionais.',
            'valor' => 20000,
            'duracao' => '12 meses',
            'cobertura' => 'Morte, invalidez, doenças graves e funeral.',
            'seguradora_id' => $nossa->id,
        ]);

        PlanoModel::create([
            'tipo_id' => $tipos['Saude']->id,
            'nome' => 'Saúde Premium',
            'descricao' => 'Cobertura hospitalar e consultas ilimitadas.',
            'valor' => 30000,
            'duracao' => '12 meses',
            'cobertura' => 'Consultas, exames, internamento e parto.',
            'seguradora_id' => $nossa->id,
        ]);

        PlanoModel::create([
            'tipo_id' => $tipos['Automovel']->id,
            'nome' => 'Auto Total',
            'descricao' => 'Proteção total contra sinistros e roubos.',
            'valor' => 25000,
            'duracao' => '12 meses',
            'cobertura' => 'Danos próprios, roubo, reboque e carro extra.',
            'seguradora_id' => $nossa->id,
        ]);

        // Planos para Mundial Seguros
        PlanoModel::create([
            'tipo_id' => $tipos['Vida']->id,
            'nome' => 'Vida Simples',
            'descricao' => 'Cobertura de vida com prêmio acessível.',
            'valor' => 12000,
            'duracao' => '6 meses',
            'cobertura' => 'Morte, invalidez por acidente e doenças graves.',
            'seguradora_id' => $mundial->id,
        ]);

        PlanoModel::create([
            'tipo_id' => $tipos['Automovel']->id,
            'nome' => 'Auto Seguro',
            'descricao' => 'Plano básico para veículos particulares.',
            'valor' => 15000,
            'duracao' => '12 meses',
            'cobertura' => 'Acidentes, roubo, terceiros e assistência.',
            'seguradora_id' => $mundial->id,
        ]);

        // Planos para Fortaleza Seguros
        PlanoModel::create([
            'tipo_id' => $tipos['Saude']->id,
            'nome' => 'Saúde Essencial',
            'descricao' => 'Cobertura médica e hospitalar básica.',
            'valor' => 18000,
            'duracao' => '12 meses',
            'cobertura' => 'Consultas, exames, urgência e internamento.',
            'seguradora_id' => $fortaleza->id,
        ]);

        PlanoModel::create([
            'tipo_id' => $tipos['Automovel']->id,
            'nome' => 'Auto Fortaleza',
            'descricao' => 'Plano completo com assistência em estrada.',
            'valor' => 22000,
            'duracao' => '12 meses',
            'cobertura' => 'Danos, roubo, vidros e assistência em estrada.',
            'seguradora_id' => $fortaleza->id,
        ]);
    }
}
