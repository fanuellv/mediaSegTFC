<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;



use App\Models\ClienteModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;


use App\Http\Controllers\Controller;
use App\Models\Notificacao;

class ClienteController extends Controller
{
    //

    private function estaAutenticado()
    {
        return Auth::guard('admin')->check() || Auth::guard('cliente')->check();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'sobrenome' => 'required|string|max:255',
            'nome_usuario' => 'required|string|max:255|unique:clientes,nome_usuario',
            'email' => 'required|email|unique:clientes,email',
            'dataRegistro' => 'required|date',
            'nif' => 'required|string|max:50',
            'senha' => 'required|string|min:6',
            'telefone' => 'required|string|max:50',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ], [
            'nome.required' => 'O campo nome é obrigatório.',
            'nome.string' => 'O nome deve conter apenas texto.',
            'nome.max' => 'O nome não pode exceder 255 caracteres.',
            'sobrenome.required' => 'O campo sobrenome é obrigatório.',
            'nome_usuario.required' => 'O campo sobrenome é obrigatório.',
            'email.required' => 'O campo sobrenome é obrigatório.',
            'dataRegistro.required' => 'O campo sobrenome é obrigatório.',
            'nif.required' => 'O campo sobrenome é obrigatório.',
            'senha.required' => 'O campo sobrenome é obrigatório.',
            'telefone.required' => 'O campo sobrenome é obrigatório.',


        ]);

        // Upload da imagem, se existir
        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('clientes/fotos', 'public');
            $validated['foto'] = $fotoPath;
        }

        ClienteModel::create($validated);

        return Inertia::location(route('login'));
    }

    //login


    public function dashboard()
    {
        $cliente = auth()->guard('cliente')->user();
        return view('dashboard', compact('cliente'));
    }

    public function show()
    {
        $cliente = auth()->guard('cliente')->user();


        if (!$cliente) {
            return response()->json(['erro' => 'Cliente não autenticado.'], 401);
        }

        return response()->json([
            'nome' => $cliente->nome,
            'sobrenome' => $cliente->sobrenome,
            'nome_usuario' => $cliente->nome_usuario,
            'email' => $cliente->email,
            'dataRegistro' => $cliente->dataRegistro,
            'nif' => $cliente->nif,
            'telefone' => $cliente->telefone,
            'foto_url' => $cliente->foto ? Storage::url($cliente->foto) : null,
        ]);
    }

    public function update(Request $request)
    {
        try {
            /** @var \App\Models\ClienteModel $cliente */
            $cliente = auth('cliente')->user();
    
            if (!$cliente) {
                return response()->json(['message' => 'Cliente não autenticado'], 401);
            }
    
            Log::info('CLIENTE ID:', [$cliente->id]);
            Log::info('DADOS PARA UPDATE:', [$request->all()]);

    
            $data = $request->validate([
                'nome' => 'nullable|string|max:255',
                'sobrenome' => 'nullable|string|max:255',
                'nome_usuario' => 'nullable|string|max:255|unique:clientes,nome_usuario,' . $cliente->id,
                'email' => 'nullable|email|max:255|unique:clientes,email,' . $cliente->id,
                'dataRegistro' => 'nullable|date',
                'nif' => 'nullable|string|max:50',
                'senha' => 'nullable|string|min:6',
                'telefone' => 'nullable|string|max:50',
                'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
            ]);
    
            // Foto
            if ($request->hasFile('foto')) {
                $data['foto'] = $request->file('foto')->store('clientes/fotos', 'public');
            }
    
            // Senha
            if (!empty($data['senha'])) {
                $data['senha'] = Hash::make($data['senha']);
            } else {
                unset($data['senha']);
            }
    
            $cliente->update($data);
    
            Log::info('SALVOU?', [$data]);
            Log::info('CLIENTE ATUALIZADO:', $cliente->toArray());
    
            return response()->json(['message' => 'Atualizado com sucesso']);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Erro interno',
                'error' => $e->getMessage(),
                'line' => $e->getLine(),
                'file' => $e->getFile(),
            ], 500);
        }
    }

    public function minhasNotificacoes()
{
    $cliente = Auth::guard('cliente')->user();

    $notificacoes = $cliente->notificacoes()
        ->orderBy('created_at', 'desc')
        ->take(20)
        ->get();

    return response()->json($notificacoes);
}

public function marcarComoLida($id)
{
    $cliente = Auth::guard('cliente')->user();

    $notificacao = Notificacao::where('id', $id)
        ->where('cliente_id', $cliente->id)
        ->firstOrFail();

    $notificacao->lida = true;
    $notificacao->save();

    return response()->json(['success' => true]);
}

    
}
