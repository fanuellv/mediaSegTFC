<?php

namespace App\Http\Controllers;

use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class QuizController extends Controller
{
    public function index()
    {
        $quizzes = Quiz::with('cliente')->latest()->get();
        return response()->json($quizzes);
    }

    public function store(Request $request)
    {
        $request->validate([
            'pergunta' => 'required|string|max:255',
            'alternativas' => 'required|array|min:2',
            'correta' => 'required|string',
        ]);

        $quiz = Quiz::create([
            'cliente_id' => Auth::guard('cliente')->id(),
            'pergunta' => $request->pergunta,
            'alternativas' => $request->alternativas,
            'correta' => $request->correta,
        ]);

        return response()->json($quiz, 201);
    }

    public function show($id)
    {
        $quiz = Quiz::findOrFail($id);
        return response()->json($quiz);
    }

    public function update(Request $request, $id)
    {
        $quiz = Quiz::findOrFail($id);

        $quiz->update($request->only(['pergunta', 'alternativas', 'correta']));

        return response()->json($quiz);
    }

    public function destroy($id)
    {
        $quiz = Quiz::findOrFail($id);
        $quiz->delete();

        return response()->json(['mensagem' => 'Quiz removido com sucesso.']);
    }
}
