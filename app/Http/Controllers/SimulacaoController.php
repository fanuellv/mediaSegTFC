<?php

namespace App\Http\Controllers;

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

namespace App\Http\Controllers;

use App\Models\Simulacao;
use App\Services\Cotacao\CotadorInterface;
use Illuminate\Http\Request;
use App\Services\Cotacao\CotadorResolver;

class SimulacaoController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'tipo_seguro_id' => 'required|exists:tipo_seguro,id',
            'dados' => 'required|array',
        ]);

        $tipoSeguro = strtolower(\App\Models\TipoSeguro::find($validated['tipo_seguro_id'])->nome);

        $cotador = CotadorResolver::resolver($tipoSeguro);
        $valorCalculado = $cotador->calcular($validated['dados']);

        $simulacao = Simulacao::create([
            'cliente_id' => $validated['cliente_id'],
            'tipo_seguro_id' => $validated['tipo_seguro_id'],
            'data' => now(),
            'valor_calculado' => $valorCalculado,
            'status' => 'simulado',
        ]);

        return response()->json([
            'mensagem' => 'Simulação criada com sucesso',
            'simulacao' => $simulacao
        ], 201);
    }
}
