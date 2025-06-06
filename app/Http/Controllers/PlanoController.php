<?php

namespace App\Http\Controllers;

use App\Models\PlanoModel;
use Illuminate\Http\Request;

class PlanoController extends Controller
{
    //
    public function index(Request $request)
{
    $seguradoraId = $request->query('seguradora_id');

    if ($seguradoraId) {
        $planos = PlanoModel::where('seguradora_id', $seguradoraId)->get();
    } else {
        $planos = PlanoModel::all(); // Opcional: pode retornar vazio ou dar erro se preferir
    }

    return response()->json($planos);
}


    public function store(Request $request)
    {
        $data = $request->validate([
            'nome' => 'required|string|max:100',
            'descricao' => 'nullable|string|max:255',
            'valor' => 'required|numeric',
           'duracao' => 'required|string|max:50',

            'seguradora_id' => 'required|exists:seguradoras,id',
          //  'apolice_id' => 'nullable|exists:apolice,id',
           // 'cliente_id' => 'required|exists:clientes,id',
        ]);

        $plano = PlanoModel::create($data);

        return response()->json($plano, 201);
    }

    public function show($id)
    {
        return PlanoModel::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $plano = PlanoModel::findOrFail($id);

        $data = $request->validate([
            'nome' => 'required|string|max:100',
            'descricao' => 'nullable|string|max:255',
            'valor' => 'required|numeric',
            'duracao' => 'required|date_format:H:i:s',
            'seguradora_id' => 'required|exists:seguradoras,id',
            'apolice_id' => 'nullable|exists:apolice,id',
            'cliente_id' => 'required|exists:clientes,id',
        ]);

        $plano->update($data);

        return response()->json($plano);
    }

    public function destroy($id)
    {
        $plano = PlanoModel::findOrFail($id);
        $plano->delete();

        return response()->json(null, 204);
    }
}
