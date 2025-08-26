<?php

namespace App\Http\Controllers;

use App\Models\Playlist;
use Illuminate\Http\Request;

class PlayListController extends Controller
{
    // 🔥 Helper para transformar o caminho da imagem em URL pública
    private function transformarTumb($playlist)
    {
        if ($playlist->tumb) {
            $playlist->tumb = asset('storage/' . $playlist->tumb);
        }
        return $playlist;
    }

    public function index()
    {
        $playlists = Playlist::latest()->get();

        $playlists->transform(fn($playlist) => $this->transformarTumb($playlist));

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
            'tumb' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $fotoPath = null;

        if ($request->hasFile('tumb')) {
            $fotoPath = $request->file('tumb')->store('listaVideo/fotos', 'public');
        }

        $playlist = Playlist::create([
            'nome' => $request->nome,
            'descricao' => $request->descricao,
            'autor' => $request->autor,
            'url_videos' => $request->url_videos,
            'tumb' => $fotoPath,
        ]);

        return response()->json($this->transformarTumb($playlist), 201);
    }

    public function show($id)
    {
        $playlist = Playlist::findOrFail($id);

        return response()->json($this->transformarTumb($playlist));
    }

    public function update(Request $request, $id)
    {
        $playlist = Playlist::findOrFail($id);

        $fotoPath = $playlist->getRawOriginal('tumb'); // pega o caminho real salvo no BD

        if ($request->hasFile('tumb')) {
            $fotoPath = $request->file('tumb')->store('listaVideo/fotos', 'public');
        }

        $playlist->update([
            'nome' => $request->nome,
            'descricao' => $request->descricao,
            'autor' => $request->autor,
            'url_videos' => $request->url_videos,
            'tumb' => $fotoPath,
        ]);

        return response()->json($this->transformarTumb($playlist));
    }

    public function destroy($id)
    {
        $playlist = Playlist::findOrFail($id);
        $playlist->delete();

        return response()->json(['mensagem' => 'Playlist removida com sucesso.']);
    }
}
