import { useEffect, useState } from 'react';
import { Quiz } from '@/types/Quiz';

interface Props {
  onClose: () => void;
  onSubmit: (form: QuizFormData, id?: number) => void;
  quizEditar: Quiz | null;
}

interface QuizFormData {
  titulo: string;
  perguntas: PerguntaFormData[];
}

interface PerguntaFormData {
  pergunta: string;
  alternativas: string[];
  correta: string;
}

export default function ModalQuiz({ onClose, onSubmit, quizEditar }: Props) {
  const [form, setForm] = useState<QuizFormData>({
    titulo: '',
    perguntas: [
      {
        pergunta: '',
        alternativas: ['', '', '', ''],
        correta: '',
      },
    ],
  });

  useEffect(() => {
    if (quizEditar) {
      const perguntasConvertidas = quizEditar.perguntas.map(p => ({
        pergunta: p.pergunta,
        alternativas: p.alternativas,
        correta: p.correta,
      }));

      setForm({
        titulo: quizEditar.titulo,
        perguntas: perguntasConvertidas,
      });
    }
  }, [quizEditar]);

  const handlePerguntaChange = (index: number, field: keyof PerguntaFormData, value: any) => {
    const novas = [...form.perguntas];
    novas[index][field] = value;
    setForm({ ...form, perguntas: novas });
  };

  const handleAlternativaChange = (perguntaIdx: number, altIdx: number, value: string) => {
    const novas = [...form.perguntas];
    novas[perguntaIdx].alternativas[altIdx] = value;
    setForm({ ...form, perguntas: novas });
  };

  const adicionarPergunta = () => {
    setForm({
      ...form,
      perguntas: [
        ...form.perguntas,
        { pergunta: '', alternativas: ['', '', '', ''], correta: '' },
      ],
    });
  };

  const removerPergunta = (index: number) => {
    const novas = form.perguntas.filter((_, i) => i !== index);
    setForm({ ...form, perguntas: novas.length ? novas : [{ pergunta: '', alternativas: ['', '', '', ''], correta: '' }] });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const dadosParaEnviar: QuizFormData = {
      titulo: form.titulo.trim(),
      perguntas: form.perguntas.map(p => ({
        pergunta: p.pergunta.trim(),
        alternativas: p.alternativas.map(a => a.trim()).filter(Boolean),
        correta: p.correta,
      })),
    };

    onSubmit(dadosParaEnviar, quizEditar?.id);
  };

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">
          {quizEditar ? 'Editar Quiz' : 'Novo Quiz'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Título do Quiz</label>
            <input
              value={form.titulo}
              onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          {form.perguntas.map((pergunta, index) => (
            <div key={index} className="border p-4 rounded-lg space-y-3 relative bg-gray-50">
              <button
                type="button"
                onClick={() => removerPergunta(index)}
                className="absolute top-2 right-2 text-red-600 text-xs"
              >
                Remover
              </button>

              <div>
                <label className="block text-sm font-medium mb-1">Pergunta {index + 1}</label>
                <input
                  value={pergunta.pergunta}
                  onChange={(e) => handlePerguntaChange(index, 'pergunta', e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>

              {pergunta.alternativas.map((alt, i) => (
                <div key={i}>
                  <input
                    value={alt}
                    placeholder={`Alternativa ${i + 1}`}
                    onChange={(e) => handleAlternativaChange(index, i, e.target.value)}
                    className="w-full border px-3 py-2 rounded mb-2"
                    required
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium mb-1">Alternativa correta</label>
                <select
                  value={pergunta.correta}
                  onChange={(e) => handlePerguntaChange(index, 'correta', e.target.value)}
                  className="w-full border px-3 py-2 rounded"
                  required
                >
                  <option value="">Selecione</option>
                  {pergunta.alternativas.map((alt, i) => (
                    <option key={i} value={alt}>
                      {alt || `Alternativa ${i + 1}`}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))}

          <button
            type="button"
            onClick={adicionarPergunta}
            className="text-blue-600 hover:underline text-sm"
          >
            + Adicionar nova pergunta
          </button>

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
              {quizEditar ? 'Atualizar' : 'Criar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
