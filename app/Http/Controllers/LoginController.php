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
    public function show()
    {
        // Mostra o formulário de login
        return Inertia::render('/iniciar-sessao');
    }

    public function login(Request $request)
{
    $credentials = $request->validate([
        'nif' => ['required'],
        'senha' => ['required'],
    ]);

    $cliente = ClienteModel::where('nif', $credentials['nif'])->first();

    if ($cliente && Hash::check($credentials['senha'], $cliente->senha)) {
        Auth::guard('cliente')->login($cliente);
        $request->session()->regenerate();
        return redirect()->intended('/painel');
    }

    return back()->withErrors([
        'nif' => 'NIF ou senha incorretos.',
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
