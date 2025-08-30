<?php

namespace App\Http\Controllers;

use App\Models\ClienteLearning;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ClienteLearningController extends Controller
{
    // Listar todos os registros
    public function index()
    {
        $data = ClienteLearning::with(['cliente', 'video', 'quiz'])->get();
        return response()->json($data);
    }

    // Criar um novo registro
    public function store(Request $request)
    {
        $cliente = Auth::guard('cliente')->user();
    
        if (!$cliente) {
            return response()->json(['erro' => 'Não autenticado'], 401);
        }
    
        // valida apenas os campos que o usuário envia
        $validated = $request->validate([
            'video_id' => 'nullable|exists:play_lists,id',
            'assistiu' => 'boolean',
            'quiz_id' => 'nullable|exists:quizzes,id',
            'finalizou' => 'boolean',
        ]);
    
        // força o cliente_id autenticado
        $validated['cliente_id'] = $cliente->id;
    
        $learning = ClienteLearning::create($validated);
    
        return response()->json($learning, 201);
    }

    // Mostrar um registro específico
    public function show($id)
    {
        $learning = ClienteLearning::with(['cliente', 'video', 'quiz'])->findOrFail($id);
        return response()->json($learning);
    }

    // Atualizar
    public function update(Request $request, $id)
    {
        $learning = ClienteLearning::findOrFail($id);

        $validated = $request->validate([
            'video_id' => 'nullable|exists:play_lists,id',
            'assistiu' => 'boolean',
            'quiz_id' => 'nullable|exists:quizzes,id',
            'finalizou' => 'boolean',
        ]);

        $learning->update($validated);

        return response()->json($learning);
    }

    // Deletar
    public function destroy($id)
    {
        $learning = ClienteLearning::findOrFail($id);
        $learning->delete();

        return response()->json(['message' => 'Registro deletado com sucesso']);
    }


   // Total de vídeos assistidos (geral)
public function totalVideosAssistidos()
{
    $total = ClienteLearning::whereNotNull('video_id')
        ->where('assistiu', true)
        ->count();

    return response()->json([
        'total_videos_assistidos' => $total
    ]);
}

// Total de quizzes jogados (geral)
public function totalQuizzesJogadas()
{
    $total = ClienteLearning::whereNotNull('quiz_id')
        ->where('finalizou', true) // se existir este campo
        ->count();

    return response()->json([
        'total_quizzes_jogadas' => $total,
    ]);
}


}
