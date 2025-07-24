<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

// app/Http/Controllers/ComentarioController.php
namespace App\Http\Controllers;

use App\Models\Comentario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ComentarioController extends Controller
{
    public function index()
    {
        $comentarios = Comentario::with('cliente')->latest()->get();
        return response()->json($comentarios);
    }

    public function store(Request $request)
    {
        $request->validate([
            'mensagem' => 'required|string|max:1000',
        ]);

        $comentario = Comentario::create([
            'cliente_id' => Auth::guard('cliente')->id(),
            'mensagem' => $request->mensagem,
        ]);
        //dd($request->all()); // <-- Vai mostrar o que chega do React

        return response()->json($comentario, 201);
    }
}

