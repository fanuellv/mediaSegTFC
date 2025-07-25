<?php

namespace App\Http\Controllers;

use App\Models\ClienteModel;
use App\Models\Notificacao;
use App\Models\PlanoModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

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
            'cobertura' => 'required|string|max:100',
            'seguradora_id' => 'required|exists:seguradoras,id',
            'tipo_id' => 'required|exists:TipoSeguro,id',
            'foto' => 'nullable|image|max:2048', // nova validação
        ]);

        // Se veio uma foto no request, armazena
        if ($request->hasFile('foto')) {
            $data['foto'] = $request->file('foto')->store('planos/fotos', 'public');
        }

        $plano = PlanoModel::create($data);

        foreach (ClienteModel::all() as $cliente) {
            Notificacao::create([
                'titulo' => 'Novo plano disponível!',
                'mensagem' => 'Um novo plano de seguro foi adicionado.',
                'tipo' => 'plano',
                'cliente_id' => $cliente->id,
            ]);
        }
        

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
            'cobertura' => 'required|string|max:100',
            'seguradora_id' => 'required|exists:seguradoras,id',
            'tipo_id' => 'required|exists:TipoSeguro,id',
            'foto' => 'nullable|image|max:2048',
        ]);

        // Se veio uma nova foto, salva e substitui
        if ($request->hasFile('foto')) {
            // Remove a foto antiga, se existir
            if ($plano->foto && Storage::disk('public')->exists($plano->foto)) {
                Storage::disk('public')->delete($plano->foto);
            }

            // Salva a nova
            $data['foto'] = $request->file('foto')->store('planos/fotos', 'public');
        }

        $plano->update($data);

        return response()->json($plano);
    }

    public function destroy($id)
    {
        if (!$this->estaAutenticado()) {
            return response()->json(['message' => 'Não autenticado'], 401);
        }

        $plano = PlanoModel::findOrFail($id);

        // Remove a imagem do disco, se existir
        if ($plano->foto && Storage::disk('public')->exists($plano->foto)) {
            Storage::disk('public')->delete($plano->foto);
        }

        $plano->delete();

        return response()->json(null, 204);
    }
}
