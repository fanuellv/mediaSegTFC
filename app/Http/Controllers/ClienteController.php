<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;



use App\Models\ClienteModel;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

use App\Http\Controllers\Controller;

class ClienteController extends Controller
{
    //
    
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
        ],[
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
    
}
