<?php

namespace App\Services\Cotacao;

use App\Models\PlanoModel;

class CotadorVida implements CotadorInterface
{
    public function calcular(array $dados): float
    {
        $plano = PlanoModel::where('tipo_id', $dados['tipo_id'])
            ->where('seguradora_id', $dados['seguradora_id'])
            ->first();

        if (!$plano) {
            throw new \Exception("Plano de seguro não encontrado.");
        }

        $base = $plano->valor;

        if ($dados['idade'] > 50) {
            $base += 6000;
        } elseif ($dados['idade'] > 30) {
            $base += 3000;
        }

        if (!empty($dados['fumante']) && $dados['fumante']) {
            $base += 5000;
        }

        if (!empty($dados['profissao']) && $dados['profissao'] === 'risco') {
            $base += 4000;
        }

        return round($base, 2);
    }
}
