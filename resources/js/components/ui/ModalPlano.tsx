import { useState, useEffect } from 'react';

interface PlanoData {
  id: number;
  nome: string;
  descricao: string;
  valor: string;
  duracao: string;
}

interface FormData {
    nome: string;
    descricao: string;
    valor: string;
    duracao: string;
}

interface Props {
    planoEditar: PlanoData | null;
    seguradoraId: number;
    onClose: () => void;
    onSubmit: (form: FormData, id?: number | null) => void;
  }

export default function ModalSeguradora({ onClose, onSubmit, planoEditar }: Props) {
  const [form, setForm] = useState<FormData>({
    nome: planoEditar?.nome || '',
    descricao: planoEditar?.descricao || '',
    valor: planoEditar?.valor || '',
    duracao: planoEditar?.duracao || '',
  });

  useEffect(() => {
    if (planoEditar) {
      setForm({
        nome: planoEditar.nome,
        descricao: planoEditar.descricao,
        valor: planoEditar.valor,
        duracao: planoEditar.duracao,
      });
    }
  }, [planoEditar]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form, planoEditar?.id ?? null);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form
        className="bg-white p-6 rounded shadow-md w-[400px]"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-bold mb-4">{planoEditar ? 'Editar Seguradora' : 'Nova Seguradora'}</h2>

        <input
          type="text"
          name="nome"
          value={form.nome}
          onChange={handleChange}
          placeholder="Nome"
          className="mb-2 w-full p-2 border"
          required
        />
        <input
          type="text"
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          placeholder="Descricao"
          className="mb-2 w-full p-2 border"
          required
        />
        <input
          type="text"
          name="valor"
          value={form.valor}
          onChange={handleChange}
          placeholder="valor"
          className="mb-2 w-full p-2 border"
          required
        />
        
        <input
          type="text"
          name="duracao"
          value={form.duracao}
          onChange={handleChange}
          placeholder="duracao"
          className="mb-2 w-full p-2 border"
          required
        />
        

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="bg-gray-300 px-3 py-1 rounded">
            Cancelar
          </button>
          <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
