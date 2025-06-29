<?php

use App\Http\Controllers\Controller;
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
        $tipo = $dados['tipo'];

        try {
            $valor = $this->cotacaoService->calcular($tipo, $dados);
            return response()->json(['valor' => $valor]);
        } catch (\Exception $e) {
            return response()->json(['erro' => $e->getMessage()], 400);
        }
    }
}
