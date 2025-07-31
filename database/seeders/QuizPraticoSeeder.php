<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Quiz;
use App\Models\perguntas;

class QuizPraticoSeeder extends Seeder
{
    public function run(): void
    {
        $quiz = Quiz::create([
            'titulo' => 'Seguros na Prática',
        ]);

        perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'Antes de contratar um seguro, o que é essencial fazer?',
            'alternativas' => [
                'Pedir opinião de amigos',
                'Ler a apólice com atenção e comparar coberturas',
                'Ir direto para o mais barato',
                'Pedir desconto sem verificar detalhes'
            ],
            'correta' => 'Ler a apólice com atenção e comparar coberturas',
        ]);

        perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'O que é considerado um sinistro?',
            'alternativas' => [
                'Pagamento mensal do seguro',
                'A renovação da apólice',
                'Um evento previsto na apólice que causa prejuízo',
                'O valor da franquia'
            ],
            'correta' => 'Um evento previsto na apólice que causa prejuízo',
        ]);

        perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'Quando acionar a seguradora?',
            'alternativas' => [
                'Sempre que tiver dúvidas financeiras',
                'Apenas no fim do contrato',
                'Quando ocorrer um evento coberto pela apólice',
                'Quando quiser cancelar o seguro'
            ],
            'correta' => 'Quando ocorrer um evento coberto pela apólice',
        ]);

        perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'Qual documento é geralmente necessário para registrar um sinistro?',
            'alternativas' => [
                'Comprovante escolar',
                'Cartão de crédito',
                'Boletim de ocorrência',
                'Ficha médica'
            ],
            'correta' => 'Boletim de ocorrência',
        ]);
    }
}
