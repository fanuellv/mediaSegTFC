import { useEffect, useState } from 'react';
import { Quiz } from '@/types/Quiz';
import ModalQuiz from './ModalQuiz';

interface FormQuiz {
  titulo: string;
  perguntas: {
    pergunta: string;
    alternativas: string[];
    correta: string;
  }[];
}

export default function CrudQuiz() {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [quizEditar, setQuizEditar] = useState<Quiz | null>(null);

  useEffect(() => {
    buscarQuizzes();
  }, []);

  async function buscarQuizzes() {
    try {
      const res = await fetch('/quiz', {
        method: 'GET',
        credentials: 'include',
      });

      if (!res.ok) throw new Error('Erro ao buscar quizzes');
      const data = await res.json();
      setQuizzes(data);
    } catch (err) {
      console.error('Erro ao buscar quizzes:', err);
      alert('Erro ao carregar quizzes');
    }
  }

  async function criarQuiz(form: FormQuiz) {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    try {
      const res = await fetch('/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
          Accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(await res.text());

      console.log('✅ Quiz criado com sucesso');
      buscarQuizzes();
    } catch (err) {
      console.error('❌ Erro ao criar quiz:', err);
      alert('Erro ao criar quiz');
    }
  }

  async function atualizarQuiz(form: FormQuiz, id: number) {
    const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';

    try {
      const res = await fetch(`/quiz/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': token,
          Accept: 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(await res.text());

      console.log('✅ Quiz atualizado');
      buscarQuizzes();
    } catch (err) {
      console.error('❌ Erro ao atualizar quiz:', err);
      alert('Erro ao atualizar quiz');
    }
  }

  const handleDelete = (id: number) => {
    if (!confirm('Deseja realmente apagar este quiz?')) return;

    fetch(`/quiz/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error('Erro ao apagar quiz');
        setQuizzes(prev => prev.filter(q => q.id !== id));
      })
      .catch(() => alert('Erro ao apagar quiz'));
  };

  return (
    <div className="flex w-full bg-white rounded-2xl p-4 flex-col gap-4 sm:h-[88vh]">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-black text-2xl">Quizzes</h1>
        <button
          onClick={() => setMostrarModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Novo Quiz
        </button>
      </div>

      <div className="scrollbar-thin flex-1 overflow-y-auto pr-1">
        <table className="min-w-full border text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">Título</th>
              <th className="px-4 py-2">Perguntas</th>
              <th className="px-4 py-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {quizzes.map((q) => (
              <tr key={q.id} className="border-b">
                <td className="px-4 py-2">{q.titulo}</td>
                <td className="px-4 py-2">{q.perguntas.length} pergunta(s)</td>
                <td className="px-4 py-2 space-x-2">
                  <button
                    onClick={() => {
                      setQuizEditar(q);
                      setMostrarModal(true);
                    }}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                    Editar
                  </button>
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
          <p className="text-gray-500 p-4">Nenhum quiz encontrado.</p>
        )}
      </div>

      {mostrarModal && (
        <ModalQuiz
          onClose={() => {
            setMostrarModal(false);
            setQuizEditar(null);
          }}
          onSubmit={(form, id) => {
            if (id) {
              atualizarQuiz(form, id);
            } else {
              criarQuiz(form);
            }
            setMostrarModal(false);
          }}
          quizEditar={quizEditar}
        />
      )}
    </div>
  );
}
