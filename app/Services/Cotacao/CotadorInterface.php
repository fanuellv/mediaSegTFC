<?php

namespace App\Services\Cotacao;

interface CotadorInterface
{
    public function calcular(array $dados): float;
}
