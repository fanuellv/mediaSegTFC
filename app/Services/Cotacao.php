<?php 

namespace App\Services\Cotacao;

interface CotadorInterface
{
    public function calcular(array $dados): float;
}

namespace App\Services\Cotacao;

use App\Models\PlanoModel;

class CotadorSaude implements CotadorInterface
{
    public function calcular(array $dados): float
    {
        // Buscar o plano específico de saúde na base de dados
        $plano = PlanoModel::where('tipo_id', $dados['tipo_id'])
            ->where('seguradora_id', $dados['seguradora_id'])
            ->first();

        // Se não encontrar o plano, lança exceção
        if (!$plano) {
            throw new \Exception("Plano de seguro de saúde não encontrado.");
        }

        $base = $plano->valor; // valor base vindo do banco

        // Ajuste por idade
        if ($dados['idade'] > 60) {
            $base += 8000;
        } elseif ($dados['idade'] > 40) {
            $base += 5000;
        }

        // Fumante
        if (!empty($dados['fumante']) && $dados['fumante']) {
            $base += 7000;
        }

        // Profissão de risco
        if (!empty($dados['profissao']) && $dados['profissao'] === 'risco') {
            $base += 3000;
        }

        return round($base, 2);
    }
}


namespace App\Services\Cotacao;

use App\Models\PlanoModel;

class CotadorVida implements CotadorInterface
{
    public function calcular(array $dados): float
    {
        // Buscar o plano específico de vida na base de dados
        $plano = PlanoModel::where('tipo_id', $dados['tipo_id'])
            ->where('seguradora_id', $dados['seguradora_id'])
            ->first();

        // Se não encontrar o plano, lança exceção ou retorna 0
        if (!$plano) {
            throw new \Exception("Plano de seguro não encontrado.");
        }

        $base = $plano->valor; // valor base vindo do banco

        // Ajuste por idade
        if ($dados['idade'] > 50) {
            $base += 6000;
        } elseif ($dados['idade'] > 30) {
            $base += 3000;
        }

        // Fumante
        if (!empty($dados['fumante']) && $dados['fumante']) {
            $base += 5000;
        }

        // Profissão de risco
        if (!empty($dados['profissao']) && $dados['profissao'] === 'risco') {
            $base += 4000;
        }

        return round($base, 2);
    }
}



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

        // Ano do veículo
        if ($dados['ano_veiculo'] < 2015) {
            $base += 3000;
        }

        // Franquia
        if ($dados['tem_franquia'] === false) {
            $base += 5000;
        }

        // Tipo de uso do veículo
        if ($dados['tipo_uso'] === 'comercial') {
            $base += 4000;
        }

        return round($base, 2);
    }
}

