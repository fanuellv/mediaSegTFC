<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PlanoModel;
use App\Models\SeguradoraModel;
use App\Models\tipoSeguro;

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
        $global = SeguradoraModel::where('nome', 'Global Seguros')->first();
        $bic = SeguradoraModel::where('nome', 'BIC Seguros')->first();
        $viva = SeguradoraModel::where('nome', 'Viva Seguros')->first();
        $saham = SeguradoraModel::where('nome', 'Saham Seguros')->first();

        // -------------------- Nossa Seguros --------------------
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

        // -------------------- Mundial Seguros --------------------
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
            'tipo_id' => $tipos['Saude']->id,
            'nome' => 'Saúde Mundial',
            'descricao' => 'Cobertura médica básica e hospitalar.',
            'valor' => 20000,
            'duracao' => '12 meses',
            'cobertura' => 'Consultas, exames e internamento.',
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

        // -------------------- Fortaleza Seguros --------------------
        PlanoModel::create([
            'tipo_id' => $tipos['Vida']->id,
            'nome' => 'Vida Fortaleza',
            'descricao' => 'Plano de vida acessível e seguro.',
            'valor' => 18000,
            'duracao' => '12 meses',
            'cobertura' => 'Morte natural e invalidez.',
            'seguradora_id' => $fortaleza->id,
        ]);

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

        // -------------------- Global Seguros --------------------
        PlanoModel::create([
            'tipo_id' => $tipos['Vida']->id,
            'nome' => 'Global Vida Plus',
            'descricao' => 'Plano de vida flexível e acessível.',
            'valor' => 15000,
            'duracao' => '12 meses',
            'cobertura' => 'Morte natural, acidente e invalidez.',
            'seguradora_id' => $global->id,
        ]);

        PlanoModel::create([
            'tipo_id' => $tipos['Saude']->id,
            'nome' => 'Global Saúde Família',
            'descricao' => 'Plano de saúde com cobertura familiar.',
            'valor' => 28000,
            'duracao' => '12 meses',
            'cobertura' => 'Consultas, exames, internamento e parto.',
            'seguradora_id' => $global->id,
        ]);

        PlanoModel::create([
            'tipo_id' => $tipos['Automovel']->id,
            'nome' => 'Global Auto Premium',
            'descricao' => 'Cobertura completa para veículos particulares.',
            'valor' => 24000,
            'duracao' => '12 meses',
            'cobertura' => 'Acidentes, roubo, danos a terceiros e assistência.',
            'seguradora_id' => $global->id,
        ]);

        // -------------------- BIC Seguros --------------------
        PlanoModel::create([
            'tipo_id' => $tipos['Vida']->id,
            'nome' => 'BIC Vida Segura',
            'descricao' => 'Seguros de vida com benefícios financeiros.',
            'valor' => 22000,
            'duracao' => '12 meses',
            'cobertura' => 'Morte, invalidez total e doenças graves.',
            'seguradora_id' => $bic->id,
        ]);

        PlanoModel::create([
            'tipo_id' => $tipos['Saude']->id,
            'nome' => 'BIC Saúde Mais',
            'descricao' => 'Cobertura médica avançada.',
            'valor' => 26000,
            'duracao' => '12 meses',
            'cobertura' => 'Consultas, exames, internamento e parto.',
            'seguradora_id' => $bic->id,
        ]);

        PlanoModel::create([
            'tipo_id' => $tipos['Automovel']->id,
            'nome' => 'BIC Auto Protegido',
            'descricao' => 'Cobertura total para veículos particulares.',
            'valor' => 26000,
            'duracao' => '12 meses',
            'cobertura' => 'Roubo, acidente, danos a terceiros e carro reserva.',
            'seguradora_id' => $bic->id,
        ]);

        // -------------------- Viva Seguros --------------------
        PlanoModel::create([
            'tipo_id' => $tipos['Vida']->id,
            'nome' => 'Viva Vida Essencial',
            'descricao' => 'Cobertura de vida com preço acessível.',
            'valor' => 17000,
            'duracao' => '12 meses',
            'cobertura' => 'Morte e invalidez.',
            'seguradora_id' => $viva->id,
        ]);

        PlanoModel::create([
            'tipo_id' => $tipos['Saude']->id,
            'nome' => 'Viva Saúde Total',
            'descricao' => 'Plano de saúde premium para toda a família.',
            'valor' => 32000,
            'duracao' => '12 meses',
            'cobertura' => 'Consultas, exames, internamento, parto e emergência.',
            'seguradora_id' => $viva->id,
        ]);

        PlanoModel::create([
            'tipo_id' => $tipos['Automovel']->id,
            'nome' => 'Viva Auto Essencial',
            'descricao' => 'Plano básico para proteção automóvel.',
            'valor' => 17000,
            'duracao' => '12 meses',
            'cobertura' => 'Danos a terceiros, assistência e reboque.',
            'seguradora_id' => $viva->id,
        ]);

        // -------------------- Saham Seguros --------------------
        PlanoModel::create([
            'tipo_id' => $tipos['Vida']->id,
            'nome' => 'Saham Vida Internacional',
            'descricao' => 'Cobertura de vida com assistência internacional.',
            'valor' => 35000,
            'duracao' => '12 meses',
            'cobertura' => 'Morte, invalidez, repatriamento e doenças graves.',
            'seguradora_id' => $saham->id,
        ]);

        PlanoModel::create([
            'tipo_id' => $tipos['Saude']->id,
            'nome' => 'Saham Saúde Premium',
            'descricao' => 'Cobertura médica internacional.',
            'valor' => 40000,
            'duracao' => '12 meses',
            'cobertura' => 'Consultas, exames, internamento, parto e evacuação.',
            'seguradora_id' => $saham->id,
        ]);

        PlanoModel::create([
            'tipo_id' => $tipos['Automovel']->id,
            'nome' => 'Saham Auto Global',
            'descricao' => 'Cobertura internacional para automóveis.',
            'valor' => 30000,
            'duracao' => '12 meses',
            'cobertura' => 'Danos, roubo, terceiros, carro reserva e reboque.',
            'seguradora_id' => $saham->id,
        ]);
    }
}
