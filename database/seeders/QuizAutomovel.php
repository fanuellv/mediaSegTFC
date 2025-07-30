<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Quiz;
use App\Models\Perguntas;

class QuizAutomovel extends Seeder
{
    public function run(): void
    {
        $quiz = Quiz::create([
            'titulo' => 'Seguro Automóvel',
        ]);

        Perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'Qual é o principal objetivo de um seguro automóvel?',
            'alternativas' => [
                'Aumentar o valor de revenda do carro',
                'Cobrir despesas com combustível',
                'Proteger o veículo contra danos, roubo e acidentes',
                'Evitar pagamento de multas de trânsito'
            ],
            'correta' => 'Proteger o veículo contra danos, roubo e acidentes',
        ]);

        Perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'O que é a franquia no seguro automóvel?',
            'alternativas' => [
                'O valor que a seguradora paga ao cliente todo mês',
                'O valor fixo pago pelo segurado em caso de sinistro',
                'O valor total da apólice do seguro',
                'A porcentagem de desconto no seguro'
            ],
            'correta' => 'O valor fixo pago pelo segurado em caso de sinistro',
        ]);

        Perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'Qual das coberturas abaixo é considerada adicional no seguro automóvel?',
            'alternativas' => [
                'Roubo ou furto do veículo',
                'Danos a terceiros',
                'Colisão acidental',
                'Despesas com lavagem e polimento'
            ],
            'correta' => 'Danos a terceiros',
        ]);

        Perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'Em caso de acidente, o que o segurado deve fazer primeiro?',
            'alternativas' => [
                'Arrumar o carro por conta própria',
                'Esperar que a seguradora ligue para ele',
                'Acionar a seguradora e registrar um boletim de ocorrência',
                'Levar o carro direto para qualquer oficina'
            ],
            'correta' => 'Acionar a seguradora e registrar um boletim de ocorrência',
        ]);

        Perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => 'O que é um sinistro no contexto do seguro automóvel?',
            'alternativas' => [
                'O prazo para renovação do seguro',
                'O valor total pago na apólice',
                'Um evento coberto pelo seguro que causa prejuízo ao segurado',
                'A avaliação do carro antes de contratar o seguro'
            ],
            'correta' => 'Um evento coberto pelo seguro que causa prejuízo ao segurado',
        ]);
    }
}
