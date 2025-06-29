<?php

namespace App\Services\Cotacao;

use App\Services\Cotacao\CotadorVida;
use App\Services\Cotacao\CotadorSaude;
use App\Services\Cotacao\CotadorAutomovel;

class CotacaoService
{
    public function calcular(string $tipo, array $dados): float
    {
        $cotador = $this->obterCotador($tipo);
        return $cotador->calcular($dados);
    }

    private function obterCotador(string $tipo): CotadorInterface
    {
        return match ($tipo) {
            'vida' => new CotadorVida(),
            'saude' => new CotadorSaude(),
            'automovel' => new CotadorAutomovel(),
            default => throw new \Exception("Tipo de seguro inválido."),
        };
    }
}
