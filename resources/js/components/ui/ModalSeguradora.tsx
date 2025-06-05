import { useState, useEffect } from 'react';

interface SeguradoraData {
  id: number;
  nome: string;
  nif: string;
  telefone: string;
  endereco: string;
  descricao: string;
  foto: string | null;
}

interface FormData {
  nome: string;
  nif: string;
  telefone: string;
  endereco: string;
  descricao: string;
  foto: File | null;
}

interface Props {
  onClose: () => void;
  onSubmit: (form: FormData, id?: number | null) => void;
  seguradoraEditar?: SeguradoraData | null;
}

export default function ModalSeguradora({ onClose, onSubmit, seguradoraEditar }: Props) {
  const [form, setForm] = useState<FormData>({
    nome: seguradoraEditar?.nome || '',
    nif: seguradoraEditar?.nif || '',
    telefone: seguradoraEditar?.telefone || '',
    endereco: seguradoraEditar?.endereco || '',
    descricao: seguradoraEditar?.descricao || '',
    foto: null,
  });

  useEffect(() => {
    if (seguradoraEditar) {
      setForm({
        nome: seguradoraEditar.nome,
        nif: seguradoraEditar.nif,
        telefone: seguradoraEditar.telefone,
        endereco: seguradoraEditar.endereco,
        descricao: seguradoraEditar.descricao,
        foto: null, // resetar foto no editar, pois arquivo não vem da API
      });
    }
  }, [seguradoraEditar]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form, seguradoraEditar?.id ?? null);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form
        className="bg-white p-6 rounded shadow-md w-[400px]"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-bold mb-4">{seguradoraEditar ? 'Editar Seguradora' : 'Nova Seguradora'}</h2>

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
          name="nif"
          value={form.nif}
          onChange={handleChange}
          placeholder="NIF"
          className="mb-2 w-full p-2 border"
          required
        />
        <input
          type="text"
          name="telefone"
          value={form.telefone}
          onChange={handleChange}
          placeholder="Telefone"
          className="mb-2 w-full p-2 border"
          required
        />
        <input
          type="text"
          name="endereco"
          value={form.endereco}
          onChange={handleChange}
          placeholder="Endereço"
          className="mb-2 w-full p-2 border"
          required
        />
        <input
          type="text"
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          placeholder="Descrição"
          className="mb-2 w-full p-2 border"
          required
        />
        <input type="file" name="foto" onChange={handleChange} className="mb-4 w-full" />

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
