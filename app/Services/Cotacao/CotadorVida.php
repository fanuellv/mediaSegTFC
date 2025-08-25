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
        // Dependentes (se vierem em JSON ou array)
        if (!empty($dados['dependentes']) && is_array($dados['dependentes'])) {
            foreach ($dados['dependentes'] as $dependente) {
                $idade = $dependente['idade'] ?? null;

                if ($idade !== null) {
                    if ($idade > 60) {
                        $base += 6000;
                    } elseif ($idade > 40) {
                        $base += 4000;
                    } else {
                        $base += 2000; // dependente jovem
                    }
                }
            }
        }

        return round($base, 2);
    }
}
