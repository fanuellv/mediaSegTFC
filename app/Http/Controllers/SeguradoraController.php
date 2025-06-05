<?php

namespace App\Http\Controllers;

use App\Models\SeguradoraModel;
use Illuminate\Http\Request;

class SeguradoraController extends Controller
{
    //
    public function index()
    {
        return response()->json(SeguradoraModel::all());
    }

    public function store(Request $request)
{
    $data = $request->validate([
        'nome' => 'required|string|max:100',
        'nif' => 'required|string|max:14|unique:seguradoras,nif',
        'telefone' => 'required|string|max:20',
        'endereco' => 'required|string|max:100',
        'descricao' => 'required|string',
        'foto' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        'administrador_id' => 'required|exists:administrador,id',
    ]);

    if ($request->hasFile('foto')) {
        $data['foto'] = $request->file('foto')->store('seguradoras', 'public');
    }

    return SeguradoraModel::create($data);
}


    public function update(Request $request, $id)
    {
        $seg = SeguradoraModel::findOrFail($id);

        $data = $request->validate([
            'nome' => 'required|string|max:100',
            'nif' => 'required|string|max:14|unique:seguradora,nif,' . $id,
            'telefone' => 'required|string|max:20',
            'foto' => 'nullable|image',
            'endereco' => 'required|string|max:100',
            'descricao' => 'required|string',
        ]);

        if ($request->hasFile('foto')) {
            $data['foto'] = $request->file('foto')->store('seguradoras', 'public');
        }

        $seg->update($data);
        return $seg;
    }

    public function destroy($id)
    {
        $seg = SeguradoraModel::findOrFail($id);
        $seg->delete();
        return response()->json(['message' => 'Apagado']);
    }
}
