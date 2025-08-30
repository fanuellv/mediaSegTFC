import { useState } from 'react';
import axios from 'axios';
import { BsFillPatchQuestionFill } from 'react-icons/bs';
import { FaQuestion } from 'react-icons/fa';
import { MdOutlineEmojiEvents, MdQuiz } from 'react-icons/md';
import { PiSealQuestionBold } from 'react-icons/pi';

interface Pergunta {
  id: number;
  pergunta: string;
  alternativas: string[];
  correta: string;
}

interface Quiz {
  id: number; // 👈 precisa do ID pra salvar no backend
  titulo: string;
  perguntas: Pergunta[];
}

interface Props {
  quiz: Quiz;
  onVoltar: () => void;
}

export default function QuizViewer({ quiz }: Props) {
  const [respostas, setRespostas] = useState<{ [perguntaId: number]: string }>({});
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  const icones = [FaQuestion, MdOutlineEmojiEvents, BsFillPatchQuestionFill, PiSealQuestionBold];
  const perguntaAtual = quiz.perguntas[etapaAtual];

  const handleResponder = (perguntaId: number, resposta: string) => {
    setRespostas((prev) => ({ ...prev, [perguntaId]: resposta }));
  };

  const proximaEtapa = () => {
    if (etapaAtual < quiz.perguntas.length - 1) {
      setEtapaAtual((prev) => prev + 1);
    } else {
      setMostrarResultado(true);
      registrarConclusao();
    }
  };

  // 👉 Função para registrar progresso no backend
  const registrarConclusao = async () => {
    try {
      await axios.post('/cliente-learning', {
        //cliente_id: 1, // ⚠️ substituir pelo cliente logado
        quiz_id: quiz.id,
        finalizou: true,
      });
      //console.log('✅ Quiz concluído registrado no backend');
    } catch (err) {
      console.error('❌ Erro ao registrar conclusão do quiz:', err);
    }
  };

  const calcularAcertos = () =>
    quiz.perguntas.filter((p) => respostas[p.id] === p.correta).length;

  const progresso = ((etapaAtual + 1) / quiz.perguntas.length) * 100;
  const rodapeTexto = `Etapa ${etapaAtual + 1} de ${quiz.perguntas.length}`;

  const compartilharResultado = () => {
    const texto = `Acabei de acertar ${calcularAcertos()} de ${quiz.perguntas.length} perguntas no Quiz! 💡🔥`;
    const url = window.location.href;

    if (navigator.share) {
      navigator.share({
        title: 'Resultado do Quiz',
        text: texto,
        url,
      });
    } else {
      navigator.clipboard.writeText(`${texto} Veja em: ${url}`);
      alert('Link copiado para a área de transferência!');
    }
  };

  // =========================
  // TELA FINAL DE RESULTADO
  // =========================
  if (mostrarResultado) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-6 gap-4 rounded-2xl bg-white p-4 sm:h-[88vh]">
        <MdQuiz className="text-5xl text-[#0153A5]" aria-hidden />
        <p className="text-2xl font-bold text-[#0153A5]">
          Você acertou {calcularAcertos()} de {quiz.perguntas.length} perguntas.
        </p>

        <div className="flex gap-4">
          <button
            onClick={compartilharResultado}
            className="px-4 py-2 bg-[#0153A5] text-white rounded hover:bg-blue-700"
            aria-label="Compartilhar resultado"
          >
            Compartilhar
          </button>
          <button
            onClick={() => (window.location.href = '/dashboard/aprender')}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            aria-label="Voltar para aprender"
          >
            Voltar para Aprender
          </button>
        </div>
      </div>
    );
  }

  // =========================
  // TELA DAS PERGUNTAS
  // =========================
  return (
    <div className="flex h-full flex-col gap-4 rounded-2xl text-gray-600 bg-white p-4 sm:h-[88vh] overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl sm:text-2xl font-bold text-[#0153A5]">Quiz: {quiz.titulo}</h2>
        <MdQuiz className="text-3xl sm:text-4xl text-[#0153A5]" />
      </div>

      {/* Barra de progresso */}
      <div className="w-full h-2 bg-gray-200 rounded overflow-hidden relative">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500 ease-out"
          style={{ width: `${progresso}%` }}
        ></div>
      </div>

      {/* Rodapé Etapa */}
      <div className="text-sm text-gray-600 font-medium text-right">{rodapeTexto}</div>

      {/* Pergunta e alternativas */}
      <div className="flex-1 overflow-y-auto space-y-6">
        <div className="bg-gray-50 p-4 text-gray-600 sm:p-6 rounded-xl shadow-sm">
          <p className="text-base sm:text-lg font-semibold text-gray-800 mb-4">
            {perguntaAtual.pergunta}
          </p>

          <div className="space-y-3 text-gray-600">
            {perguntaAtual.alternativas.map((alt, i) => {
              const Icon = icones[i % icones.length];
              const selecionada = respostas[perguntaAtual.id] === alt;

              return (
                <div
                  key={i}
                  onClick={() => handleResponder(perguntaAtual.id, alt)}
                  className={`flex items-center gap-3 p-3 sm:p-4 border text-gray-600 rounded-xl cursor-pointer transition-all duration-200 ${
                    selecionada
                      ? 'bg-blue-100 border-blue-600 text-blue-700 shadow'
                      : 'hover:bg-gray-100 border-gray-300'
                  }`}
                  aria-label={`Alternativa ${alt}`}
                >
                  <div className="bg-blue-200 p-2 rounded-full">
                    <Icon className="text-blue-700 text-lg" />
                  </div>
                  <span className="text-sm sm:text-base">{alt}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Navegação fixada no mobile */}
      <div className="sticky bottom-0 bg-white pt-4 pb-2 sm:static sm:pb-0 sm:pt-0">
        <div className="flex justify-between items-center gap-2">
          {etapaAtual > 0 && (
            <button
              onClick={() => setEtapaAtual(etapaAtual - 1)}
              className="w-1/2 rounded-md bg-gray-300 px-4 py-2 text-gray-800 hover:bg-gray-400"
            >
              Anterior
            </button>
          )}

          <button
            onClick={proximaEtapa}
            disabled={!respostas[perguntaAtual.id]}
            className={`w-full sm:w-1/2 ml-auto rounded-md px-4 py-2 text-white transition ${
              respostas[perguntaAtual.id]
                ? 'bg-blue-600 hover:bg-blue-700'
                : 'bg-blue-300 cursor-not-allowed'
            }`}
          >
            {etapaAtual === quiz.perguntas.length - 1 ? 'Finalizar' : 'Próxima'}
          </button>
        </div>
      </div>
    </div>
  );
}
