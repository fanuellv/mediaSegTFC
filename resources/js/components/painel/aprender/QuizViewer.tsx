import { useState } from 'react';
import { Quiz } from '@/types/Quiz';

interface Props {
  quiz: Quiz;
  onVoltar: () => void;
}

export default function QuizViewer({ quiz, onVoltar }: Props) {
  const [respostas, setRespostas] = useState<{ [perguntaId: number]: string }>({});
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const handleResponder = (perguntaId: number, alternativa: string) => {
    setRespostas({ ...respostas, [perguntaId]: alternativa });
  };

  const calcularAcertos = () => {
    return quiz.perguntas.filter((p) => respostas[p.id] === p.correta).length;
  };

  return (
    <div className="flex flex-col h-full gap-4 rounded-2xl bg-white p-4 sm:h-[88vh]">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-xl font-bold">{quiz.titulo}</h1>
        <button
          onClick={onVoltar}
          className="bg-[#0153A5] text-white p-2 font-bold hover:underline rounded"
        >
          ← Voltar
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6">
        {quiz.perguntas.map((pergunta, index) => (
          <div key={pergunta.id} className="bg-gray-50 p-4 rounded shadow">
            <p className="font-medium mb-2">
              {index + 1}. {pergunta.pergunta}
            </p>

            <div className="space-y-2">
              {pergunta.alternativas.map((alt, i) => (
                <label
                  key={i}
                  className={`block cursor-pointer p-2 border rounded ${
                    respostas[pergunta.id] === alt
                      ? 'border-[#0153A5] bg-blue-50'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <input
                    type="radio"
                    name={`pergunta-${pergunta.id}`}
                    value={alt}
                    className="mr-2"
                    checked={respostas[pergunta.id] === alt}
                    onChange={() => handleResponder(pergunta.id, alt)}
                  />
                  {alt}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        {!mostrarResultado ? (
          <button
            onClick={() => setMostrarResultado(true)}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Finalizar Quiz
          </button>
        ) : (
          <p className="text-lg font-bold text-green-700">
            Você acertou {calcularAcertos()} de {quiz.perguntas.length} perguntas.
          </p>
        )}
      </div>
    </div>
  );
}
