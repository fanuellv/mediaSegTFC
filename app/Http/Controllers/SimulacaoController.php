<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\PlanoModel;
use App\Models\tipoSeguro;
use Illuminate\Http\Request;
use App\Services\Cotacao\CotacaoService;

class SimulacaoController extends Controller
{
    protected CotacaoService $cotacaoService;

    public function __construct(CotacaoService $cotacaoService)
    {
        $this->cotacaoService = $cotacaoService;
    }

    public function calcular(Request $request)
{
    $dados = $request->all();

    // Log dos dados recebidos (fica no storage/logs/laravel.log)
    //\Log::info('📥 Dados recebidos na simulação:', $dados);

    $tipo = $dados['tipo'] ?? null;
    $planoId = $dados['plano_id'] ?? null;

    // Verificação básica
    if (!$tipo || !$planoId) {
        return response()->json(['erro' => 'Tipo de seguro ou plano não selecionado.'], 400);
    }

    try {
        // Calcula o valor da cotação
        $valor = $this->cotacaoService->calcular($tipo, $dados);

        $planoSelecionado = PlanoModel::with('tipo')->find($planoId);

        return response()->json([
            'valor' => $valor,
            'plano' => $planoSelecionado,
        ]);
    } catch (\Exception $e) {
        // Log do erro para depuração
        //\Log::error('Erro ao calcular cotação:', ['erro' => $e->getMessage()]);

        return response()->json(['erro' => 'Erro ao calcular cotação. ' . $e->getMessage()], 500);
    }
}



    public function tiposDeSeguro()
{
    $tipos = tipoSeguro::whereIn('id', PlanoModel::select('tipo_id')->distinct())->get();
    return response()->json($tipos);
}
}
