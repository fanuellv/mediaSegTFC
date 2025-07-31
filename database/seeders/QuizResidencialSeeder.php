<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Quiz;
use App\Models\perguntas;

class QuizResidencialSeeder extends Seeder
{
    public function run(): void
    {
        $quiz = Quiz::create([
            'titulo' => 'Seguro Residencial',
        ]);

        perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'O que é coberto por um seguro residencial básico?',
            'alternativas' => [
                'Combustível do carro',
                'Roupas e calçados',
                'Incêndio, explosão e queda de raio',
                'Despesas médicas'
            ],
            'correta' => 'Incêndio, explosão e queda de raio',
        ]);

        perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'Seguro residencial é obrigatório?',
            'alternativas' => [
                'Sim, por lei federal',
                'Não, é opcional, mas recomendável',
                'Somente em zonas rurais',
                'Apenas para casas financiadas'
            ],
            'correta' => 'Não, é opcional, mas recomendável',
        ]);

        perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'Qual das opções pode ser uma cobertura adicional?',
            'alternativas' => [
                'Reparos elétricos',
                'Combustível para gerador',
                'Compra de móveis',
                'Manutenção de jardins'
            ],
            'correta' => 'Reparos elétricos',
        ]);

        perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'Seguro residencial cobre bens móveis da casa?',
            'alternativas' => [
                'Sim, se estiver incluído na apólice',
                'Nunca cobre',
                'Somente eletrodomésticos novos',
                'Apenas móveis embutidos'
            ],
            'correta' => 'Sim, se estiver incluído na apólice',
        ]);
    }
}
