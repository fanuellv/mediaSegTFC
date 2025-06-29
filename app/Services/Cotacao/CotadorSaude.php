<?php

namespace App\Services\Cotacao;

use App\Models\PlanoModel;

class CotadorSaude implements CotadorInterface
{
    public function calcular(array $dados): float
    {
        $plano = PlanoModel::where('tipo_id', $dados['tipo_id'])
            ->where('seguradora_id', $dados['seguradora_id'])
            ->first();

        if (!$plano) {
            throw new \Exception("Plano de seguro de saúde não encontrado.");
        }

        $base = $plano->valor;

        if ($dados['idade'] > 60) {
            $base += 8000;
        } elseif ($dados['idade'] > 40) {
            $base += 5000;
        }

        if (!empty($dados['fumante']) && $dados['fumante']) {
            $base += 7000;
        }

        if (!empty($dados['profissao']) && $dados['profissao'] === 'risco') {
            $base += 3000;
        }

        return round($base, 2);
    }
}
