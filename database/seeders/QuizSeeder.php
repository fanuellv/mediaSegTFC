<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Quiz;
use App\Models\perguntas;

class QuizSeeder extends Seeder
{
    public function run(): void
    {
        $quiz = Quiz::create([
            'titulo' => 'Seguros de Vida',
        ]);

    perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'O que é um seguro de vida?',
            'alternativas' => [
                'Um contrato que cobre danos ao carro',
                'Um plano de saúde',
                'Uma proteção financeira para beneficiários em caso de falecimento do segurado',
                'Um tipo de empréstimo bancário'
            ],
            'correta' => 'Uma proteção financeira para beneficiários em caso de falecimento do segurado',
        ]);

    perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'Quem pode ser beneficiário em um seguro de vida?',
            'alternativas' => [
                'Somente filhos',
                'Qualquer pessoa designada pelo segurado',
                'Apenas cônjuges',
                'O banco que vendeu o seguro'
            ],
            'correta' => 'Qualquer pessoa designada pelo segurado',
        ]);

    perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'Qual das opções abaixo é uma cobertura comum em seguros de vida?',
            'alternativas' => [
                'Cobertura de acidentes de trânsito',
                'Cobertura de falecimento por causas naturais ou acidentais',
                'Cobertura de danos ao imóvel',
                'Cobertura contra roubo de automóveis'
            ],
            'correta' => 'Cobertura de falecimento por causas naturais ou acidentais',
        ]);

    perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'O seguro de vida pode ter cobertura em vida para quais situações?',
            'alternativas' => [
                'Para pagar multas de trânsito',
                'Para cobertura de doenças graves ou invalidez',
                'Para quitar empréstimos bancários automaticamente',
                'Para reembolso de despesas médicas rotineiras'
            ],
            'correta' => 'Para cobertura de doenças graves ou invalidez',
        ]);

    perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'Qual é o objetivo principal do seguro de vida?',
            'alternativas' => [
                'Aumentar a renda mensal do segurado',
                'Garantir suporte financeiro aos dependentes após o falecimento do segurado',
                'Cobrir todos os gastos hospitalares do segurado',
                'Evitar pagamento de impostos'
            ],
            'correta' => 'Garantir suporte financeiro aos dependentes após o falecimento do segurado',
        ]);
    }
}
