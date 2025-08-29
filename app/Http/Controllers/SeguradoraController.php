<?php
namespace App\Http\Controllers;

use App\Models\SeguradoraModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SeguradoraController extends Controller
{
    private function estaAutenticado()
    {
        return Auth::guard('admin')->check() || Auth::guard('cliente')->check();
    }

    public function index()
{
    if (!Auth::guard('cliente')->check() && !Auth::guard('admin')->check()) {
        return response()->json(['message' => 'Unauthenticated.'], 401);
    }

    return response()->json(SeguradoraModel::all());
}

    public function store(Request $request)
    {
        if (!$this->estaAutenticado()) {
            return response()->json(['message' => 'Não autenticado'], 401);
        }

        $data = $request->validate([
            'nome' => 'required|string|max:100',
            'nif' => 'required|string|max:14|unique:seguradoras,nif',
            'telefone' => 'required|string|max:20',
            'endereco' => 'required|string|max:100',
            'email' => 'required|string|max:100',
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
        if (!$this->estaAutenticado()) {
            return response()->json(['message' => 'Não autenticado'], 401);
        }

        $seg = SeguradoraModel::findOrFail($id);

        $data = $request->validate([
            'nome' => 'required|string|max:100',
            'nif' => 'required|string|max:14|unique:seguradoras,nif,' . $id,
            'telefone' => 'required|string|max:20',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'endereco' => 'required|string|max:100',
            'email' => 'required|string|max:100',
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
        if (!$this->estaAutenticado()) {
            return response()->json(['message' => 'Não autenticado'], 401);
        }

        $seg = SeguradoraModel::findOrFail($id);
        $seg->delete();

        return response()->json(['message' => 'Apagado']);
    }

    public function totalSeguradora()
{
    $total = \App\Models\SeguradoraModel::count();

    return response()->json([
        'total_seguradora' => $total
    ]);
}
}
