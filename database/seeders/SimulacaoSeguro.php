<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Simulacao;
use App\Models\SimulacaoDetalhe;
use App\Models\ClienteModel;

class SimulacaoSeguro extends Seeder
{
    public function run(): void
    {
        // Inserir tipos de seguro se ainda não existirem
        $tipos = ['Vida', 'Saude', 'Automovel'];
        foreach ($tipos as $tipo) {
            DB::table('TipoSeguro')->updateOrInsert(
                ['nome' => $tipo],
                ['nome' => $tipo]
            );
        }

        // Buscar tipos de seguro com IDs
        $tiposComIds = DB::table('TipoSeguro')->pluck('id', 'nome')->toArray();
        // Exemplo: ['Vida' => 1, 'Saude' => 2, 'Automovel' => 3]

        // Criar clientes fake (se não existirem)
        if (ClienteModel::count() === 0) {
            for ($i = 1; $i <= 10; $i++) {
                ClienteModel::create([
                    'nome' => "Cliente {$i}",
                    'email' => "cliente{$i}@teste.com",
                ]);
            }
        }

        // Criar simulações
        $clientes = ClienteModel::all();
        foreach ($clientes as $cliente) {
            $tipoEscolhido = array_rand($tiposComIds);
            $tipoSeguroId = $tiposComIds[$tipoEscolhido]; // ✅ pega o ID correto

            $simulacao = Simulacao::create([
                'cliente_id' => $cliente->id,
                'tipo_seguro_id' => $tipoSeguroId,  // ✅ agora é INT
                'data' => now(),
                'valor_calculado' => rand(5000, 50000),
                'status' => 'simulado',
            ]);

            // Criar detalhes conforme o tipo
            $detalhes = [
                'simulacao_id' => $simulacao->id,
                'profissao' => null,
                'idade' => null,
                'dependentes' => null,
                'marca_modelo' => null,
                'matricula' => null,
                'valor_veiculo' => null,
                'tem_franquia' => null,
                'tipo_uso' => null,
                'ano_veiculo' => null,
            ];

            if ($tipoEscolhido === 'Automovel') {
                $detalhes['marca_modelo'] = 'Carro ' . $cliente->id;
                $detalhes['matricula'] = 'LD-' . rand(10, 99) . '-' . rand(100, 999);
                $detalhes['valor_veiculo'] = rand(15000, 40000);
                $detalhes['tem_franquia'] = (bool)rand(0, 1);
                $detalhes['tipo_uso'] = ['Particular', 'Comercial'][rand(0, 1)];
                $detalhes['ano_veiculo'] = rand(2000, 2024);
            }

            if ($tipoEscolhido === 'Saude') {
                $detalhes['idade'] = rand(18, 65);
                $detalhes['dependentes'] = json_encode(['Dependente 1', 'Dependente 2']);
            }

            if ($tipoEscolhido === 'Vida') {
                $detalhes['idade'] = rand(18, 70);
                $detalhes['profissao'] = 'Profissão ' . $cliente->id;
            }

            SimulacaoDetalhe::create($detalhes);
        }
    }
}
