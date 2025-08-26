import { useEffect, useState } from 'react';
import ModalPlaylist from './ModalPlaylist';
import { Playlist } from '@/types/Playlist';

interface PlaylistFormData {
  nome: string;
  autor: string;
  descricao: string;
  tumb?: File|null;
  url_videos: string[]; 
}

export default function CrudPlayList() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [playlistEditar, setPlaylistEditar] = useState<Playlist | null>(null);

  useEffect(() => {
    buscarPlaylists();
  }, []);

  async function buscarPlaylists() {
    try {
      const res = await fetch('/playlists', {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Erro ao buscar playlists');
      const data = await res.json();
      setPlaylists(data);
    } catch (err) {
      console.error('Erro ao buscar playlists:', err);
      alert('Erro ao carregar playlists');
    }
  }

  async function criarPlaylist(form: PlaylistFormData) {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
  
    const formData = new FormData();
    formData.append('nome', form.nome);
    formData.append('autor', form.autor);
    formData.append('descricao', form.descricao);
    form.url_videos.forEach((link, i) => {
      formData.append(`url_videos[${i}]`, link);
    });
    if (form.tumb) {
      formData.append('tumb', form.tumb);
    }
  
    try {
      const res = await fetch('/playlists', {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': token,
          Accept: 'application/json',
        },
        credentials: 'include',
        body: formData,
      });
  
      if (!res.ok) throw new Error(await res.text());
  
      console.log('✅ Playlist criada com sucesso');
      buscarPlaylists();
    } catch (err) {
      console.error('❌ Erro ao criar playlist:', err);
      alert('Erro ao criar playlist');
    }
  }
  
  async function atualizarPlaylist(form: PlaylistFormData, id: number) {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
  
    const formData = new FormData();
    formData.append('nome', form.nome);
    formData.append('autor', form.autor);
    formData.append('descricao', form.descricao);
    form.url_videos.forEach((link, i) => {
      formData.append(`url_videos[${i}]`, link);
    });
    if (form.tumb) {
      formData.append('tumb', form.tumb);
    }
  
    try {
      const res = await fetch(`/playlists/${id}`, {
        method: 'POST', // 👈 Laravel espera POST + _method=PUT
        headers: {
          'X-CSRF-TOKEN': token,
          Accept: 'application/json',
        },
        credentials: 'include',
        body: (() => {
          formData.append('_method', 'PUT');
          return formData;
        })(),
      });
  
      if (!res.ok) throw new Error(await res.text());
  
      console.log('✅ Playlist atualizada');
      buscarPlaylists();
    } catch (err) {
      console.error('❌ Erro ao atualizar playlist:', err);
      alert('Erro ao atualizar playlist');
    }
  }
  

  const handleDelete = (id: number) => {
    if (!confirm('Deseja realmente apagar esta playlist?')) return;

    fetch(`/playlists/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao apagar playlist');
        setPlaylists(prev => prev.filter(p => p.id !== id));
      })
      .catch(() => alert('Erro ao apagar playlist'));
  };

  return (
    <div className="flex w-full bg-white rounded-2xl p-4 flex-col gap-4 sm:h-[88vh]">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-black text-2xl">Playlists</h1>
        <button
          onClick={() => setMostrarModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Nova Playlist
        </button>
      </div>

      <div
        className="scrollbar-thin scrollbar-thumb-gray-300 flex-1 overflow-y-auto pr-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <table className="min-w-full border text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Nome</th>
              <th className="px-4 py-2">Autor</th>
              <th className="px-4 py-2">Descrição</th>
              <th className="px-4 py-2">Links</th>
              <th className="px-4 py-2">Tumb</th>
              <th className="px-4 py-2">Ações</th>
              
            </tr>
          </thead>
          <tbody>
            {playlists.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="px-4 py-2">{p.nome}</td>
                <td className="px-4 py-2">{p.autor}</td>
                <td className="px-4 py-2">{p.descricao}</td>
                <td className="px-4 py-2">
                  {p.url_videos?.length > 0 ? (
                    <a
                      href={p.url_videos[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Ver
                    </a>
                  ) : (
                    <span className="text-gray-400 italic">Sem link</span>
                  )}
                </td>
                <td className="px-4 py-3">
              {p.tumb && (
                <img
                  src={`/storage/${p.tumb}`}
                  className="h-12 w-12 rounded-full object-cover border"
                  
                />
              )}
                  
                </td>

                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => {
                      setPlaylistEditar(p);
                      setMostrarModal(true);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {playlists.length === 0 && (
          <p className="text-gray-500 p-4">Nenhuma playlist encontrada.</p>
        )}
      </div>

      {mostrarModal && (
        <ModalPlaylist
          onClose={() => {
            setMostrarModal(false);
            setPlaylistEditar(null);
          }}
          onSubmit={(form, id) => {
            if (id) {
              atualizarPlaylist(form, id);
            } else {
              criarPlaylist(form);
            }
            setMostrarModal(false);
          }}
          playlistEditar={playlistEditar}
        />
      )}
    </div>
  );
}
