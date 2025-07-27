<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PlayListController extends Controller
{
    public function index()
    {
        if (Auth::guard('admin')->check()) {
            // Admin vê todas as playlists
            $playlists = Playlist::with('cliente')->latest()->get();
            return response()->json($playlists);
        } elseif (Auth::guard('cliente')->check()) {
            // Cliente vê playlists públicas ou as dele (você pode ajustar a lógica aqui)
            $clienteId = Auth::guard('cliente')->id();
    
            $playlists = Playlist::where('cliente_id', $clienteId)
                ->latest()
                ->get();
    
            return response()->json($playlists);
        } else {
            return response()->json(['erro' => 'Não autenticado'], 401);
        }
    }
    

 
    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'autor' => 'required|string|max:255',
            'url_videos' => 'required|array',
            'url_videos.*' => 'url',
        ]);
    
        $playlist = Playlist::create([
            'cliente_id' => auth('cliente')->id() ?? auth('admin')->id(),
            'nome' => $request->nome,
            'descricao' => $request->descricao,
            'autor' => $request->autor,
            'url_videos' => $request->url_videos,
        ]);
    
        return response()->json($playlist, 201);
    }
    

    public function show($id)
    {
        $playlist = PlayList::with('cliente')->findOrFail($id);
        return response()->json($playlist);
    }

    public function update(Request $request, $id)
    {
        $playlist = PlayList::findOrFail($id);

        $playlist->update($request->only(['nome', 'descricao', 'url_videos','autor']));

        return response()->json($playlist);
    }

    public function destroy($id)
    {
        $playlist = PlayList::findOrFail($id);
        $playlist->delete();

        return response()->json(['mensagem' => 'Playlist removida com sucesso.']);
    }
}
