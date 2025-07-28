<?php
namespace App\Http\Controllers;

use App\Models\Quiz;
use App\Models\Perguntas;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    // Criar um novo quiz com perguntas
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'perguntas' => 'required|array|min:1',
            'perguntas.*.pergunta' => 'required|string',
            'perguntas.*.alternativas' => 'required|array|min:2',
            'perguntas.*.correta' => 'required|string',
        ]);

        // Cria o quiz
        $quiz = Quiz::create([
            'titulo' => $request->titulo,
        ]);

        // Adiciona perguntas ao quiz
        foreach ($request->perguntas as $perguntaData) {
            Perguntas::create([
                'quiz_id' => $quiz->id,
                'pergunta' => $perguntaData['pergunta'],
                'alternativas' => $perguntaData['alternativas'],
                'correta' => $perguntaData['correta'],
            ]);
        }

        return response()->json([
            'message' => 'Quiz criado com sucesso!',
            'quiz' => $quiz->load('perguntas'),
        ]);
    }

    // Listar todos os quizzes com suas perguntas
    public function index()
    {
        $quizzes = Quiz::with('perguntas')->get();
        return response()->json($quizzes);
    }

    public function update(Request $request, $id)
{
    $request->validate([
        'titulo' => 'required|string|max:255',
        'perguntas' => 'required|array|min:1',
        'perguntas.*.pergunta' => 'required|string',
        'perguntas.*.alternativas' => 'required|array|min:2',
        'perguntas.*.correta' => 'required|string',
    ]);

    // Atualiza o quiz
    $quiz = Quiz::findOrFail($id);
    $quiz->update(['titulo' => $request->titulo]);

    // Remove perguntas antigas
    $quiz->perguntas()->delete();

    // Adiciona novas perguntas
    foreach ($request->perguntas as $perguntaData) {
        Perguntas::create([
            'quiz_id' => $quiz->id,
            'pergunta' => $perguntaData['pergunta'],
            'alternativas' => $perguntaData['alternativas'],
            'correta' => $perguntaData['correta'],
        ]);
    }

    return response()->json([
        'message' => 'Quiz atualizado com sucesso!',
        'quiz' => $quiz->load('perguntas'),
    ]);
}


    // Ver um quiz específico
    public function show($id)
    {
        $quiz = Quiz::with('perguntas')->findOrFail($id);
        return response()->json($quiz);
    }
}
