import { useEffect, useState } from 'react';
import axios from 'axios';
import PlaylistsList from './PlaylistsList';
import PlaylistViewer from './PlayListViewer';
import { Playlist } from '@/types/Playlist';

export default function Aprender() {
  const [loadingInicial, setLoadingInicial] = useState(true);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [playlistSelecionada, setPlaylistSelecionada] = useState<Playlist | null>(null);

  useEffect(() => {
    axios.get('/playlists').then(res => {
      setPlaylists(res.data);
      setLoadingInicial(false);
    });
  }, []);

  if (playlistSelecionada) {
    return (
      <PlaylistViewer
        playlist={playlistSelecionada}
        onVoltar={() => setPlaylistSelecionada(null)}
      />
    );
  }

  if (loadingInicial) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex w-full h-full flex-col gap-4 rounded-2xl bg-white p-4 sm:h-[88vh]">
      <h1 className="font-bold text-black text-xl">Encontre os melhores conteúdos</h1>
      <div className="overflow-y-auto flex pr-2">
        <PlaylistsList
          playlists={playlists}
          onSelecionar={setPlaylistSelecionada}
        />
      </div>
    </div>
  );
}
