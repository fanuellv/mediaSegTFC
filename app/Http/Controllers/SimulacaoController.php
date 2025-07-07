<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ApoliceModel;
use App\Models\PlanoModel;
use App\Models\Simulacao;
use App\Models\tipoSeguro;
use Illuminate\Http\Request;
use App\Services\Cotacao\CotacaoService;
use Illuminate\Support\Str;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;


class SimulacaoController extends Controller
{
    protected CotacaoService $cotacaoService;

    public function __construct(CotacaoService $cotacaoService)
    {
        $this->cotacaoService = $cotacaoService;
    }

    public function store(Request $request)
{
    $request->validate([
        'cliente_id' => 'required|exists:clientes,id',
        'tipo_seguro_id' => 'required|exists:TipoSeguro,id',
        'valor_calculado' => 'required|numeric',
        'status' => 'required|string',
    ]);
    

    $simulacao = Simulacao::create([
        'cliente_id' => $request->cliente_id,
        'tipo_seguro_id' => $request->tipo_seguro_id,
        'data' => now(),
        'valor_calculado' => $request->valor_calculado,
        'status' => $request->status,
    ]);

    return response()->json($simulacao);
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

        // Gerar a apólice (contrato de seguro)
        $apolice = ApoliceModel::create([
            'cliente_id' => $user->id ?? 1,
            'plano_id' => $planoSelecionado->id,
            'numero' => strtoupper(Str::random(10)),
            'data_inicio' => now(),
            'data_fim' => now()->addYear(),
            'valor_total' => $valor,
        ]);

        return response()->json([
            'valor' => $valor,
            'plano' => $planoSelecionado,
            'apolice_id' => $apolice->id,
        ]);
    } catch (\Exception $e) {
        // Log do erro para depuração
        //\Log::error('Erro ao calcular cotação:', ['erro' => $e->getMessage()]);

        return response()->json(['erro' => 'Erro ao calcular cotação. ' . $e->getMessage()], 500);
    }

    
}
public function adquirir(Request $request)
{
    $dados = $request->all();
    $plano = PlanoModel::findOrFail($dados['plano_id']);

    $apolice = ApoliceModel::create([
        'cliente_id' => $user->id ?? 1,
        'plano_id' => $plano->id,
        'numero' => strtoupper(Str::random(10)),
        'data_inicio' => now(),
        'data_fim' => now()->addYear(),
        'valor_total' => $dados['valor'] ?? 0,
    ]);

    // 🔧 Gerar único PDF com apólice e fatura
    $pdf = Pdf::loadView('documentos.apolice_fatura', ['apolice' => $apolice]);

    $path = "pdfs/apolice_fatura_{$apolice->id}.pdf";
    Storage::put("public/{$path}", $pdf->output());

    return response()->json([
        'documento_url' => Storage::url($path),
    ]);
}



    public function tiposDeSeguro()
{
    $tipos = tipoSeguro::whereIn('id', PlanoModel::select('tipo_id')->distinct())->get();
    return response()->json($tipos);
}
}
