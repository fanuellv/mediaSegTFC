<?php
namespace App\Services\Cotacao;

use InvalidArgumentException;

class CotadorResolver
{
    public static function resolver(string $tipo): CotadorInterface
    {
        return match (strtolower($tipo)) {
            'saude'     => new CotadorSaude(),
            'vida'      => new CotadorVida(),
            'automovel' => new CotadorAutomovel(),
            default     => throw new InvalidArgumentException("Tipo de seguro inválido: $tipo"),
        };
    }
}
