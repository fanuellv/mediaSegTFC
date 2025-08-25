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

        // Valor base do plano
        $base = $plano->valor;

        // ✅ Ajuste pelo ano do veículo
        if (isset($dados['ano_veiculo']) && $dados['ano_veiculo'] < 2015) {
            $base += 3000;
        }

        // ✅ Ajuste pela franquia
        $temFranquia = $dados['tem_franquia'] ?? true; 
        if ($temFranquia === false) {
            $base += 5000;
        }

        // ✅ Ajuste pelo uso do veículo
        if (!empty($dados['tipo_uso']) && $dados['tipo_uso'] === 'comercial') {
            $base += 4000;
        }

        // ✅ Ajuste pelo valor do veículo (ex.: 2% do valor declarado)
        if (!empty($dados['valor_veiculo'])) {
            $base += ($dados['valor_veiculo'] * 0.0005);
        }

        // ✅ Exemplo: veículos de alto valor pagam taxa extra
        if (!empty($dados['valor_veiculo']) && $dados['valor_veiculo'] > 20_000_000) {
            $base += 10000;
        }

        return round($base, 2);
    }
}
