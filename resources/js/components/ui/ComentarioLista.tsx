import { useEffect, useState } from 'react';

interface Comentario {
  id: number;
  mensagem: string;
  cliente: {
    nome: string;
    sobrenome: string;
  };
  created_at: string;
}

export default function ComentariosLista() {
  const [comentarios, setComentarios] = useState<Comentario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchComentarios() {
      try {
        const response = await fetch('/comentarios');
        const data = await response.json();
        setComentarios(data);
      } catch (error) {
        console.error('Erro ao carregar comentários:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchComentarios();
  }, []);

  if (loading) {
    return (
        <div className="flex h-40 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
        </div>
    );
}

  return (
    <div className="space-y-4">
      
      {comentarios.length === 0 ? (
        <p className="text-sm text-gray-500">Nenhum comentário disponível.</p>
      ) : (
        <ul className="space-y-2">
          {comentarios.map((comentario) => (
            <li
              key={comentario.id}
              className="rounded border bg-white p-4 shadow-sm"
            >
              <p className="text-sm text-gray-800">{comentario.mensagem}</p>
              <p className="mt-2 text-xs text-gray-500">
                — {comentario.cliente?.nome} {comentario.cliente?.sobrenome} •{' '}
                {new Date(comentario.created_at).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
