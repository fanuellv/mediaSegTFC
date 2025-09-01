<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\ApoliceModel;
use App\Models\PlanoModel;
use App\Models\Simulacao;
use App\Models\tipoSeguro;
use App\Models\ItemSimulado;
use App\Models\Notificacao;
use App\Models\SimulacaoDetalhe;
use Illuminate\Http\Request;
use App\Services\Cotacao\CotacaoService;
use Illuminate\Support\Str;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Mail;

class SimulacaoController extends Controller
{
    protected CotacaoService $cotacaoService;

    public function __construct(CotacaoService $cotacaoService)
    {
        $this->cotacaoService = $cotacaoService;
    }

    public function store(Request $request)
{
    $dados = $request->json()->all();

    Log::debug('✅ Dados completos recebidos:', $dados);

    // Validação dos campos principais
    $validated = validator($dados, [
        'tipo_seguro_id' => 'required|exists:TipoSeguro,id',
        'valor_calculado' => 'required|numeric',
        'status' => 'required|string',
        'plano_id' => 'required|exists:plano_seguro,id',

        // Detalhes automóvel
        'marca_modelo' => 'nullable|string|max:255',
        'matricula' => 'nullable|string|max:100',
        'valor_veiculo' => 'nullable|numeric',
        'tem_franquia' => 'nullable|boolean',
        'tipo_uso' => 'nullable|string|max:100',
        'ano_veiculo' => 'nullable|integer|min:1900|max:' . now()->year,

        'profissao' => 'nullable|string',
        'idade' => 'nullable|string',

        // Dependentes (array opcional)
        'dependentes' => 'nullable|array',
        'dependentes.*.nome' => 'required_with:dependentes|string|max:255',
        'dependentes.*.idade' => 'required_with:dependentes|integer|min:0',
        'dependentes.*.fumante' => 'required_with:dependentes|boolean',
    ])->validate();

    $cliente = Auth::guard('cliente')->user();
    if (!$cliente) {
        return response()->json(['erro' => 'Não autenticado'], 401);
    }

    // Criar a simulação principal
    $simulacao = Simulacao::create([
        'cliente_id' => $cliente->id,
        'tipo_seguro_id' => $validated['tipo_seguro_id'],
        'data' => now(),
        'valor_calculado' => $validated['valor_calculado'],
        'status' => $validated['status'],
    ]);

    // Criar os detalhes da simulação (inclui dependentes como JSON)
    SimulacaoDetalhe::create([
        'simulacao_id' => $simulacao->id,
        'marca_modelo' => $request->input('marca_modelo'),
        'matricula' => $request->input('matricula'),
        'valor_veiculo' => $request->input('valor_veiculo'),
        'tem_franquia' => filter_var($request->input('tem_franquia'), FILTER_VALIDATE_BOOLEAN),
        'tipo_uso' => $request->input('tipo_uso'),
        'ano_veiculo' => $request->input('ano_veiculo'),
        'dependentes' => $request->input('dependentes') ? json_encode($request->input('dependentes')) : null,
        'profissao' => $request->input('profissao'),
        'idade' => $request->input('idade'),
    ]);

    Notificacao::create([
        'titulo' => 'Simulação realizada com sucesso!',
        'mensagem' => 'Sua simulação foi concluída.',
        'tipo' => 'simulacao',
        'cliente_id' => $cliente->id,
    ]);

    ItemSimulado::create([
        'simulacao_id' => $simulacao->id,
        'plano_id' => $validated['plano_id'],
    ]);

    $email = $cliente->email;

// pega a última apólice do cliente (ou null se não existir)
$apolice = ApoliceModel::where('cliente_id', $cliente->id)->latest()->first();

Mail::send('email.simulacao', [
    'user' => $cliente,
    'apolice' => $apolice,
    'plano_seguro' => $apolice->plano->nome, // pega o nome do plano
], function ($message) use ($email) {
    $message->to($email)->subject('Obrigado por realizares a simulação');
});

    

    return response()->json([
        'id' => $simulacao->id,
        'cliente_id' => $simulacao->cliente_id,
        'tipo_seguro_id' => $simulacao->tipo_seguro_id,
        'valor_calculado' => $simulacao->valor_calculado,
        'status' => $simulacao->status,
        'detalhes' => $simulacao->detalhes,
        'dependentes' => $request->input('dependentes', []), // devolve dependentes no response
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

            $cliente = Auth::guard('cliente')->user();
            $clienteId = $cliente->id;


            if (!$clienteId) {
                Log::warning('⚠️ Nenhum cliente autenticado na simulação.');
            } else {
                Log::info('✅ Cliente autenticado na simulação:', ['id' => $cliente->id, 'nome' => $cliente->nome]);
            }
            

            // Gerar a apólice (contrato de seguro)
            $apolice = ApoliceModel::create([
                'cliente_id' => $clienteId,
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

                'marca_modelo' => $dados['marca_modelo'] ?? null,
                'matricula' => $dados['matricula'] ?? null,
                'valor_veiculo' => $dados['valor_veiculo'] ?? null,
            ]);
        } catch (\Exception $e) {
            // Log do erro para depuração
            //\Log::error('Erro ao calcular cotação:', ['erro' => $e->getMessage()]);

            return response()->json(['erro' => 'Erro ao calcular cotação. ' . $e->getMessage()], 500);
        }
    }


    public function gerarPdf($id)
    {
        $simulacao = Simulacao::with(['cliente', 'itens.plano.tipo', 'itens.plano.seguradora', 'detalhes'])->findOrFail($id);

        $plano = $simulacao->itens->first()->plano ?? null;
        $valor_total = $simulacao->valor_calculado;

        $extras = $simulacao->extras ?? [];


        if (!$plano) {
            abort(404, 'Plano associado à simulação não encontrado.');
        }

        $pdf = Pdf::loadView('documentos.apolice_fatura', [
            'apolice' => $simulacao,
            'simulacao' => $simulacao,
            'plano_seguro' => $plano,
            'valor_total' => $simulacao->valor_calculado, // <- corrigido aqui
            'detalhes' => $simulacao->detalhes, // se quiser retornar
        ]);
        Log::debug('Valor total', [

            'valor_total' => $simulacao->valor_calculado, // <- corrigido aqui

        ]);
        Log::debug('detalhes', [

            'detalhes' => $simulacao->detalhes,

        ]);
        Log::debug('cliente da simulação', [
            'cliente' => $simulacao->cliente,
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




    public function meusPlanos()
    {
        if (!Auth::guard('cliente')->check()) {
            return response()->json(['erro' => 'Não autenticado.'], 401);
        }

        $clienteId = Auth::guard('cliente')->user()->id;

        // Traz todas as apólices com seus planos e seguradoras
        $apolices = ApoliceModel::with('plano.seguradora')
            ->where('cliente_id', $clienteId)
            ->orderBy('data_inicio', 'desc')
            ->get();

        $total = $apolices->count();

        // Considera ativo se a data atual estiver entre o início e fim
        $ativos = $apolices->filter(function ($apolice) {
            $hoje = now();
            return $apolice->data_inicio <= $hoje && $apolice->data_fim >= $hoje;
        })->count();

        $totalInvestido = $apolices->reduce(function ($soma, $apolice) {
            return $soma + floatval($apolice->valor_total ?? 0);
        }, 0);

        return response()->json([
            'apolices' => $apolices,
            'resumo' => [
                'total' => $total,
                'ativos' => $ativos,
                'investido' => $totalInvestido,
            ],
        ]);
    }


    public function totalSimulacao()
{
    $total = \App\Models\Simulacao::count();

    return response()->json([
        'total_simulacao' => $total
    ]);
}

public function simulacoesPorTipo()
{
    $simulacoes = \App\Models\Simulacao::selectRaw('tipo_seguro_id, COUNT(*) as total')
        ->groupBy('tipo_seguro_id')
        ->with('tipoSeguro') // garantir que o relacionamento existe no Model
        ->get()
        ->map(function ($item) {
            return [
                'tipo' => $item->tipoSeguro->nome ?? 'Desconhecido',
                'total' => $item->total
            ];
        });

    return response()->json([
        'status' => 'success',
        'data' => $simulacoes
    ]);
}

}
