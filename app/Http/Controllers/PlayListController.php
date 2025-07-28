<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use Illuminate\Http\Request;

class PlayListController extends Controller
{
    public function index()
    {
        $playlists = Playlist::latest()->get();
        return response()->json($playlists);
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
            'nome' => $request->nome,
            'descricao' => $request->descricao,
            'autor' => $request->autor,
            'url_videos' => $request->url_videos,
        ]);

        return response()->json($playlist, 201);
    }

    public function show($id)
    {
        $playlist = Playlist::findOrFail($id);
        return response()->json($playlist);
    }

    public function update(Request $request, $id)
    {
        $playlist = Playlist::findOrFail($id);

        $playlist->update($request->only(['nome', 'descricao', 'url_videos', 'autor']));

        return response()->json($playlist);
    }

    public function destroy($id)
    {
        $playlist = Playlist::findOrFail($id);
        $playlist->delete();

        return response()->json(['mensagem' => 'Playlist removida com sucesso.']);
    }
}
