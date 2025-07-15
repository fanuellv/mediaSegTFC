<?php

namespace App\Services\Cotacao;

use App\Models\PlanoModel;

class CotadorAutomovel implements CotadorInterface
{
    public function calcular(array $dados): float
    {
        $plano = PlanoModel::find($dados['plano_id']);

        if (!$plano) {
            throw new \Exception("Plano automóvel não encontrado.");
        }

        $base = $plano->valor;

        if ($dados['ano_veiculo'] < 2015) {
            $base += 3000;
        }

        $temFranquia = $dados['tem_franquia'] ?? true; // assume true se não vier
        if ($temFranquia === false) {
            $base += 5000;
        }


        if ($dados['tipo_uso'] === 'comercial') {
            $base += 4000;
        }

        return round($base, 2);
    }
}
