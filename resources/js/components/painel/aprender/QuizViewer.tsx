import { useState } from 'react';

interface Pergunta {
  id: number;
  pergunta: string;
  alternativas: string[];
  correta: string;
}

interface Quiz {
  titulo: string;
  perguntas: Pergunta[];
}

interface Props {
  quiz: Quiz;
  onVoltar?: () => void;
}

export default function QuizViewer({ quiz }: Props) {
  const [respostas, setRespostas] = useState<{ [perguntaId: number]: string }>({});
  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [etapaAtual, setEtapaAtual] = useState(0); // começa na primeira pergunta

  const perguntaAtual = quiz.perguntas[etapaAtual];

  const handleResponder = (perguntaId: number, alternativa: string) => {
    setRespostas({ ...respostas, [perguntaId]: alternativa });
  };

  const calcularAcertos = () => {
    return quiz.perguntas.filter((p) => respostas[p.id] === p.correta).length;
  };

  const progresso = ((etapaAtual + 1) / quiz.perguntas.length) * 100;
const Rodape = `Etapa ${etapaAtual + 1} de ${quiz.perguntas.length}`;

return (
  <div className="flex flex-col h-full gap-4 rounded-2xl bg-white p-4 sm:h-[88vh]">

    {/* Barra de progresso */}
    <div className="relative top-45 w-full h-1 bg-gray-200 rounded overflow-hidden mb-2">
      <div
        className="h-full bg-blue-600 transition-all duration-300"
        style={{ width: `${progresso}%` }}
      ></div>
    </div>

    {/* Texto do rodapé indicando a etapa */}
    <div className="relative top-32 text-sm text-gray-600 mb-4 font-medium">
      {Rodape}
    </div>

      {/* Pergunta atual */}
      <div className="flex-1 overflow-y-auto space-y-6">
        <div className=" rounded shadow">
          <p className="text-lg font-bold mb-2">
             {perguntaAtual.pergunta}
          </p>
          <h1 className=" mb-15 truncate">Quiz {quiz.titulo}</h1>

          <div className="space-y-2">
            {perguntaAtual.alternativas.map((alt, i) => (
              <label
                key={i}
                className={`block cursor-pointer p-2 border rounded ${
                  respostas[perguntaAtual.id] === alt
                    ? 'border-[#0153A5] bg-blue-50'
                    : 'hover:bg-gray-100'
                }`}
              >
                <input
                  type="radio"
                  name={`pergunta-${perguntaAtual.id}`}
                  value={alt}
                  className="mr-2"
                  checked={respostas[perguntaAtual.id] === alt}
                  onChange={() => handleResponder(perguntaAtual.id, alt)}
                />
                {alt}
                
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Navegação */}
      <div className="mt-4 flex justify-between items-center">
        {etapaAtual > 0 && (
          <button
            onClick={() => setEtapaAtual(etapaAtual - 1)}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Anterior
          </button>
        )}

        {etapaAtual < quiz.perguntas.length - 1 && (
          <button
            onClick={() => setEtapaAtual(etapaAtual + 1)}
            className="ml-auto px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            disabled={!respostas[perguntaAtual.id]}
          >
            Próxima
          </button>
        )}

        {etapaAtual === quiz.perguntas.length - 1 && !mostrarResultado && (
          <button
            onClick={() => setMostrarResultado(true)}
            className="ml-auto px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            disabled={!respostas[perguntaAtual.id]}
          >
            Finalizar Quiz
          </button>
        )}
      </div>

      {mostrarResultado && (
        <div className="text-center mt-4">
          <p className="text-lg font-bold text-green-700">
            Você acertou {calcularAcertos()} de {quiz.perguntas.length} perguntas.
          </p>
        </div>
      )}
    </div>
  );
}
