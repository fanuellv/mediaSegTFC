<?php

namespace App\Http\Controllers;

use App\Models\PlanoModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlanoController extends Controller
{
    private function estaAutenticado()
    {
        return Auth::guard('admin')->check() || Auth::guard('cliente')->check();
    }

    public function index(Request $request)
    {
        if (!$this->estaAutenticado()) {
            return response()->json(['message' => 'Não autenticado'], 401);
        }

        $seguradoraId = $request->query('seguradora_id');

        if ($seguradoraId) {
            $planos = PlanoModel::where('seguradora_id', $seguradoraId)->get();
        } else {
            $planos = PlanoModel::all();
        }

        return response()->json($planos);
    }

    public function store(Request $request)
    {
        if (!$this->estaAutenticado()) {
            return response()->json(['message' => 'Não autenticado'], 401);
        }

        $data = $request->validate([
            'nome' => 'required|string|max:100',
            'descricao' => 'nullable|string|max:255',
            'valor' => 'required|numeric',
            'duracao' => 'required|string|max:50',
            'seguradora_id' => 'required|exists:seguradoras,id',
        ]);

        $plano = PlanoModel::create($data);

        return response()->json($plano, 201);
    }

    public function show($id)
    {
        if (!$this->estaAutenticado()) {
            return response()->json(['message' => 'Não autenticado'], 401);
        }

        return PlanoModel::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        if (!$this->estaAutenticado()) {
            return response()->json(['message' => 'Não autenticado'], 401);
        }

        $plano = PlanoModel::findOrFail($id);

        $data = $request->validate([
            'nome' => 'required|string|max:100',
            'descricao' => 'nullable|string|max:255',
            'valor' => 'required|numeric',
            'duracao' => 'required|string|max:50',
            'seguradora_id' => 'required|exists:seguradoras,id',
        ]);

        $plano->update($data);

        return response()->json($plano);
    }

    public function destroy($id)
    {
        if (!$this->estaAutenticado()) {
            return response()->json(['message' => 'Não autenticado'], 401);
        }

        $plano = PlanoModel::findOrFail($id);
        $plano->delete();

        return response()->json(null, 204);
    }
}
