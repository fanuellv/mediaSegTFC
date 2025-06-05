<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\Administrador;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth as FacadesAuth;

class AdminController extends Controller
{
    // Cadastrar novo administrador
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:100',
            'sobrenome' => 'required|string|max:100',
            'nome_usuario' => 'required|string|max:100|unique:administrador,nome_usuario',
            'email' => 'required|email|max:100|unique:administrador,email',
            'dataRegistro' => 'required|date',
            'senha' => 'required|string|min:6',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg|max:2048',
        ]);

        // Upload da imagem, se existir
        if ($request->hasFile('foto')) {
            $fotoPath = $request->file('foto')->store('administradores/fotos', 'public');
            $validated['foto'] = $fotoPath;
        }

        Administrador::create($validated);

        return redirect()->route('admin.login')->with('success', 'Administrador criado com sucesso!');
    }

    // Logout
    public function logout()
    {
        Auth::guard('admin')->logout();
        return redirect()->route('iniciar-sessao');
    }

    public function showLogin()
    {
        return Inertia::render('administrador/login');
    }

    public function login(Request $request)
{
    $request->validate([
        'nome_usuario' => 'required',
        'senha' => 'required',
    ]);

    if (Auth::guard('admin')->attempt([
        'nome_usuario' => $request->nome_usuario,
        'password' => $request->senha, // O Laravel usará getAuthPassword() automaticamente
    ])) {
        return redirect()->route('painel');
    }

    return back()->withErrors(['nome_usuario' => 'Credenciais inválidas']);
}

}
