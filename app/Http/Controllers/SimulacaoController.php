<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ApoliceModel;
use App\Models\PlanoModel;
use App\Models\Simulacao;
use App\Models\tipoSeguro;
use App\Models\ItemSimulado;
use Illuminate\Http\Request;
use App\Services\Cotacao\CotacaoService;
use Illuminate\Support\Str;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;



class SimulacaoController extends Controller
{
    protected CotacaoService $cotacaoService;

    public function __construct(CotacaoService $cotacaoService)
    {
        $this->cotacaoService = $cotacaoService;
    }

    public function store(Request $request)
    {
        Log::debug('Entrou no método store da SimulacaoController', [
            'cliente_id' => $request->cliente_id,
            'tipo_seguro_id' => $request->tipo_seguro_id,
            'valor_calculado' => $request->valor_calculado,
            'status' => $request->status,
            'plano_id' => $request->plano_id,
        ]);
    
        $validated = $request->validate([
            'cliente_id' => 'required|exists:clientes,id',
            'tipo_seguro_id' => 'required|exists:TipoSeguro,id',
            'valor_calculado' => 'required|numeric',
            'status' => 'required|string',
            'plano_id' => 'required|exists:plano_seguro,id',
        ]);
    
        $simulacao = Simulacao::create([
            'cliente_id' => $validated['cliente_id'],
            'tipo_seguro_id' => $validated['tipo_seguro_id'],
            'data' => now(),
            'valor_calculado' => $validated['valor_calculado'],
            'status' => $validated['status'],
        ]);
    
        // Criar o item simulado associado
        ItemSimulado::create([
            'simulacao_id' => $simulacao->id,
            'plano_id' => $validated['plano_id'],
        ]);
    
        // ✅ Retornar apenas os dados relevantes
        return response()->json([
            'id' => $simulacao->id,
            'cliente_id' => $simulacao->cliente_id,
            'tipo_seguro_id' => $simulacao->tipo_seguro_id,
            'valor_calculado' => $simulacao->valor_calculado,
            'status' => $simulacao->status,
        ]);
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


public function gerarPdf($id)
{
    $simulacao = Simulacao::with(['cliente', 'itens.plano.tipo', 'itens.plano.seguradora'])->findOrFail($id);

    $plano = $simulacao->itens->first()->plano ?? null;
    $valor_total = $simulacao->valor_calculado;


    if (!$plano) {
        abort(404, 'Plano associado à simulação não encontrado.');
    }

    $pdf = Pdf::loadView('documentos.apolice_fatura', [
        'apolice' => $simulacao,
        'plano_seguro' => $plano,
        'valor_total' => $simulacao->valor_calculado, // <- corrigido aqui
    ]);
    Log::debug('Valor total', [
        
        'valor_total' => $simulacao->valor_calculado, // <- corrigido aqui
    
    ]);

    $path = 'pdfs/apolice_fatura_' . $simulacao->id . '.pdf';

    Storage::disk('public')->put($path, $pdf->output());

    return response()->json([
        'documento_url' => Storage::url($path),
    ]);
}



public function adquirirPdf($apoliceId)
{
    $path = "public/pdfs/apolice_fatura_{$apoliceId}.pdf";
    $fullPath = storage_path("app/{$path}");

    if (!file_exists($fullPath)) {
        return response()->json(['erro' => 'Documento não encontrado.'], 404);
    }

    return response()->file($fullPath, [
        'Content-Type' => 'application/pdf',
    ]);
}

    public function tiposDeSeguro()
{
    $tipos = tipoSeguro::whereIn('id', PlanoModel::select('tipo_id')->distinct())->get();
    return response()->json($tipos);
}
}
