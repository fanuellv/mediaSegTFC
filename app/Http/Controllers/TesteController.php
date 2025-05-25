<?php

namespace App\Http\Controllers;

use App\Models\TesteModel;
use Illuminate\Http\Request;

class TesteController extends Controller
{
    //
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
        ]);

        TesteModel::create($validated);

        return redirect()->back()->with('success', 'Usuário salvo com sucesso!');
    }
}
