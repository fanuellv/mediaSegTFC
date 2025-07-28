import { useEffect, useState } from 'react';
import axios from 'axios';
import { Playlist } from '@/types/Playlist';
import PlaylistsList from './PlaylistsList';
import PlaylistViewer from './PlayListViewer';
import QuizList from './QuizList'; // ✅ Certifique-se de ter esse componente
import QuizViewer from './QuizViewer'; // ✅ Certifique-se de ter esse componente
import { Quiz } from '@/types/Quiz'; // ✅ Certifique-se de ter esse tipo

export default function AprenderPlaylists() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [playlistSelecionada, setPlaylistSelecionada] = useState<Playlist | null>(null);
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [quizSelecionado, setQuizSelecionado] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get('/playlists'),
      axios.get('/quiz')
    ])
      .then(([playlistsRes, quizzesRes]) => {
        setPlaylists(playlistsRes.data);
        setQuizzes(quizzesRes.data);
      })
      .catch(err => console.error('Erro ao carregar dados:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  if (playlistSelecionada) {
    return (
      <PlaylistViewer
        playlist={playlistSelecionada}
        onVoltar={() => setPlaylistSelecionada(null)}
      />
    );
  }

  if (quizSelecionado) {
    return (
      <div className="p-4">
        
  
        <QuizViewer quiz={quizSelecionado} 
        onVoltar={() => setQuizSelecionado(null)}/>
  
      </div>
    );
  }
  

  return (
    <div className="grid md:grid-cols-2 gap-4 p-4 bg-white rounded-2xl sm:h-[88vh] overflow-y-auto">
      <div>
        <h1 className="text-xl font-bold text-black mb-2">Encontre os melhores conteúdos sobre seguros</h1>
        <PlaylistsList
          playlists={playlists}
          onSelecionar={setPlaylistSelecionada}
        />
      </div>
      <div>
        <h1 className="text-xl font-bold text-black mb-2">Responda quizzes sobre seguro</h1>
        <QuizList
          quizzes={quizzes}
          onSelecionar={setQuizSelecionado}
        />
      </div>
    </div>
  );
}
