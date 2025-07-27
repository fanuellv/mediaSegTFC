<?php

namespace App\Http\Controllers;

use App\Models\ClienteModel;
use Illuminate\Support\Facades\Auth;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth as FacadesAuth;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class LoginCOntroller extends Controller
{
    //
    public function showLoginForm()
{
    return redirect()->intended('/iniciar-sessao'); // ou return view('auth.iniciar'); se estiver usando Blade
}


public function login(Request $request)
{
    $credentials = $request->validate([
        'nif' => ['required'], // agora pode ser NIF ou nome de usuário
        'senha' => ['required'],
    ], [
        'nif.required' => 'O campo NIF ou nome de usuário é obrigatório.',
        'senha.required' => 'O campo senha é obrigatório.',
    ]);
    /** @var \App\Models\ClienteModel $cliente */
    $cliente = ClienteModel::where('nif', $credentials['nif'])
        ->orWhere('nome_usuario', $credentials['nif'])
        ->first();

    if ($cliente && Hash::check($credentials['senha'], $cliente->senha)) {
        Auth::guard('cliente')->login($cliente);
        $request->session()->regenerate();
        return redirect()->intended('/painel');
    }

    return back()->withErrors([
        'nif' => 'NIF, nome de usuário ou senha incorretos.',
    ]);
}


    public function logout(Request $request)
    {
        FacadesAuth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/iniciar-sessao');
    }
}
