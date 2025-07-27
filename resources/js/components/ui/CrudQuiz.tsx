import { useEffect, useState } from 'react';
import axios from 'axios';

interface Quiz {
  id: number;
  pergunta: string;
  alternativas: string[]; // Assume que no backend é retornado como array
  correta: string;
}

export default function CrudQuiz() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  useEffect(() => {
    axios.get('/api/quizzes', { withCredentials: true })
      .then(res => setQuizzes(res.data))
      .catch(() => alert('Erro ao carregar quizzes'));
  }, []);

  const handleDelete = (id: number) => {
    if (!confirm('Deseja realmente apagar este quiz?')) return;

    axios.delete(`/api/quizzes/${id}`, { withCredentials: true })
      .then(() => {
        setQuizzes(prev => prev.filter(q => q.id !== id));
      })
      .catch(() => alert('Erro ao apagar quiz'));
  };

  return (
    <div className="flex w-full bg-white rounded-2xl p-4 flex-col gap-4 sm:h-[88vh]">
      <h1 className="font-bold text-black">Criar e atualizar os Quiz</h1>

      <div
        className="scrollbar-thin scrollbar-thumb-gray-300 flex-1 overflow-y-auto pr-1"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <table className="min-w-full border text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Pergunta</th>
              <th className="px-4 py-2">Alternativas</th>
              <th className="px-4 py-2">Correta</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((q) => (
              <tr key={q.id} className="border-b">
                <td className="px-4 py-2">{q.pergunta}</td>
                <td className="px-4 py-2">
                  <ul className="list-disc pl-4">
                    {q.alternativas.map((alt, i) => (
                      <li key={i}>{alt}</li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-2 font-semibold">{q.correta}</td>
                <td className="px-4 py-2 space-x-2">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded">Editar</button>
                  <button
                    onClick={() => handleDelete(q.id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Apagar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {quizzes.length === 0 && (
          <p className="text-gray-500 p-4">Nenhum quiz cadastrado.</p>
        )}
      </div>
    </div>
  );
}
