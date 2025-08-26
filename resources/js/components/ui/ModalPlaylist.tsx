import { useEffect, useState } from 'react';
import { Playlist } from '@/types/Playlist';

interface Props {
  onClose: () => void;
  onSubmit: (form: PlaylistFormData, id?: number) => void;
  playlistEditar: Playlist | null;
}

interface PlaylistFormData {
  nome: string;
  autor: string;
  descricao: string;
  tumb?: File | null;
  url_videos: string[]; // ✅ Agora corretamente um array de strings
}

export default function ModalPlaylist({ onClose, onSubmit, playlistEditar }: Props) {
  const [form, setForm] = useState<PlaylistFormData>({
    nome: '',
    autor: '',
    descricao: '',
    tumb: null,
    url_videos: [''],
  });

  useEffect(() => {
    if (playlistEditar) {
      setForm({
        nome: playlistEditar.nome,
        autor: playlistEditar.autor,
        descricao: playlistEditar.descricao,
        url_videos: playlistEditar.url_videos || [''],
      });
    }
  }, [playlistEditar]);

  const handleChange = (index: number, value: string) => {
    const linksAtualizados = [...form.url_videos];
    linksAtualizados[index] = value;
    setForm({ ...form, url_videos: linksAtualizados });
  };

  const adicionarCampo = () => {
    setForm({ ...form, url_videos: [...form.url_videos, ''] });
  };

  const removerCampo = (index: number) => {
    const novaLista = form.url_videos.filter((_, i) => i !== index);
    setForm({ ...form, url_videos: novaLista.length > 0 ? novaLista : [''] });
  };
  function handleChangeFoto(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      setForm((prev) => ({
        ...prev,
        tumb: e.target.files![0],
      }));
    }
  }
  

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dadosParaEnviar: PlaylistFormData = {
      nome: form.nome,
      autor: form.autor,
      descricao: form.descricao,
      url_videos: form.url_videos.filter(link => link.trim() !== ''), // ✅ Mantém como array
      tumb:form.tumb,
    };
    

    onSubmit(dadosParaEnviar, playlistEditar?.id);
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-lg p-6">
        <h2 className="text-xl font-semibold mb-4">
          {playlistEditar ? 'Editar Playlist' : 'Nova Playlist'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Nome</label>
            <input
              name="nome"
              value={form.nome}
              onChange={(e) => setForm({ ...form, nome: e.target.value })}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Autor</label>
            <input
              name="autor"
              value={form.autor}
              onChange={(e) => setForm({ ...form, autor: e.target.value })}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <input
              name="descricao"
              value={form.descricao}
              onChange={(e) => setForm({ ...form, descricao: e.target.value })}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Links dos Vídeos</label>
            {form.url_videos.map((link, index) => (
              <div key={index} className="flex items-center gap-2 mb-2">
                <input
                  type="url"
                  value={link}
                  onChange={(e) => handleChange(index, e.target.value)}
                  className="flex-1 border px-3 py-2 rounded"
                  placeholder="https://youtube.com/..."
                  required
                />
                <button
                  type="button"
                  onClick={() => removerCampo(index)}
                  className="text-red-600 hover:underline"
                >
                  Remover
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={adicionarCampo}
              className="text-blue-600 hover:underline text-sm"
            >
              + Adicionar outro link
            </button>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Tumb</label>
            <input type="file" name="tumb" onChange={handleChangeFoto} className="mb-4 w-full" />

          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              {playlistEditar ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
