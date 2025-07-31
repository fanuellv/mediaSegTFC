<?php

namespace Database\Seeders;


use Illuminate\Database\Seeder;
use App\Models\Quiz;
use App\Models\perguntas;

class QuizGeralSeeder extends Seeder
{
    public function run(): void
    {
        $quiz = Quiz::create([
            'titulo' => 'Mundo dos Seguros',
        ]);

        perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'O que é um seguro?',
            'alternativas' => [
                'Um investimento com retorno garantido',
                'Um contrato que oferece proteção financeira contra riscos específicos',
                'Um empréstimo com taxas baixas',
                'Uma forma de isenção de impostos'
            ],
            'correta' => 'Um contrato que oferece proteção financeira contra riscos específicos',
        ]);

        perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'Quem é o segurado em um contrato de seguro?',
            'alternativas' => [
                'A empresa que vende o seguro',
                'O governo',
                'A pessoa que contrata o seguro',
                'O banco financiador'
            ],
            'correta' => 'A pessoa que contrata o seguro',
        ]);

        perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'O que é a apólice do seguro?',
            'alternativas' => [
                'O comprovativo de pagamento da seguradora',
                'O documento que oficializa o contrato do seguro',
                'Um código de rastreio do seguro',
                'Um tipo de nota fiscal'
            ],
            'correta' => 'O documento que oficializa o contrato do seguro',
        ]);

        perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'Quais são os principais tipos de seguro?',
            'alternativas' => [
                'Seguro de celular e computador',
                'Seguro saúde, automóvel, vida, patrimonial e viagem',
                'Seguro de renda fixa e ações',
                'Seguro escolar e universitário'
            ],
            'correta' => 'Seguro saúde, automóvel, vida, patrimonial e viagem',
        ]);
    }
}
