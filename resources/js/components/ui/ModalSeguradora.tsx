import { useState } from 'react';

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
  onSubmit: (form: FormData) => void;
}

export default function ModalSeguradora({ onClose, onSubmit }: Props) {
    const [form, setForm] = useState<FormData>({
        nome: '',
  nif: '',
  telefone: '',
  endereco: '',
  descricao: '',
  foto: null,
      });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <form
        className="bg-white p-6 rounded shadow-md w-[400px]"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-bold mb-4">Nova Seguradora</h2>

        <input type="text" name="nome" onChange={handleChange} placeholder="Nome" className="mb-2 w-full p-2 border" required />
        <input type="text" name="nif" onChange={handleChange} placeholder="NIF" className="mb-2 w-full p-2 border" required />
        <input type="text" name="telefone" onChange={handleChange} placeholder="Telefone" className="mb-2 w-full p-2 border" required />
        
        <input type="text" name="endereco" onChange={handleChange} placeholder="Endereço" className="mb-2 w-full p-2 border" required />
<input type='text' name="descricao" onChange={handleChange} placeholder="Descrição" className="mb-2 w-full p-2 border" required />
<input type="file" name="foto" onChange={handleChange} className="mb-4 w-full" />
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="bg-gray-300 px-3 py-1 rounded">Cancelar</button>
          <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Salvar</button>
        </div>
      </form>
    </div>
  );
}
