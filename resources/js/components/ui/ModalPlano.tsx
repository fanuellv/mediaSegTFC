import { useEffect, useState } from 'react';

interface PlanoData {
    id: number;
    nome: string;
    descricao: string;
    valor: string;
    duracao: string;
    cobertura: string;
    tipo_id: number; // adiciona aqui
}

interface FormData {
    nome: string;
    descricao: string;
    valor: string;
    duracao: string;
    cobertura: string;
    tipo_id: number; // adiciona aqui
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
        cobertura: planoEditar?.cobertura || '',
        tipo_id: planoEditar?.tipo_id || 1,
    });

    const tipos = [
        { id: 1, nome: 'Vida' },
        { id: 2, nome: 'Saúde' },
        { id: 3, nome: 'Automóvel' },
    ];

    useEffect(() => {
        if (planoEditar) {
            setForm({
                nome: planoEditar.nome || '',
                descricao: planoEditar.descricao || '',
                valor: planoEditar.valor || '',
                duracao: planoEditar.duracao || '',
                cobertura: planoEditar.cobertura || '',
                tipo_id: planoEditar.tipo_id || 1,
            });
        } else {
            // evita valores undefined
            setForm({
                nome: '',
                descricao: '',
                valor: '',
                duracao: '',
                cobertura: '',
                tipo_id: 1,
            });
        }
    }, [planoEditar]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
      const target = e.target;
    
      let newValue: string | number | File;
    
      if (target instanceof HTMLInputElement && target.type === 'file' && target.files) {
        newValue = target.files[0];
      } else if (target.name === 'tipo_id') {
        newValue = Number(target.value); // para o select de tipo
      } else {
        newValue = target.value;
      }
    
      setForm((prev) => ({
        ...prev,
        [target.name]: newValue,
      }));
    }
    
    

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit(form, planoEditar?.id ?? null);
        onClose();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
            <form className="w-[400px] rounded bg-white p-6 shadow-md" onSubmit={handleSubmit} encType="multipart/form-data">
                <h2 className="mb-4 text-xl font-bold">{planoEditar ? 'Editar Seguradora' : 'Nova Seguradora'}</h2>

                <input
                    type="text"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Nome"
                    className="mb-2 w-full border p-2"
                    required
                />
                <select name="tipo_id" value={form.tipo_id} onChange={handleChange} className="mb-2 w-full border p-2" required>
                    {tipos.map((tipo) => (
                        <option key={tipo.id} value={tipo.id}>
                            {tipo.nome}
                        </option>
                    ))}
                </select>

                <input
                    type="text"
                    name="descricao"
                    value={form.descricao}
                    onChange={handleChange}
                    placeholder="Descricao"
                    className="mb-2 w-full border p-2"
                    required
                />
                <input
                    type="text"
                    name="valor"
                    value={form.valor}
                    onChange={handleChange}
                    placeholder="valor"
                    className="mb-2 w-full border p-2"
                    required
                />

                <input
                    type="text"
                    name="duracao"
                    value={form.duracao}
                    onChange={handleChange}
                    placeholder="duracao"
                    className="mb-2 w-full border p-2"
                    required
                />
                <input
                    type="text"
                    name="cobertura"
                    value={form.cobertura}
                    onChange={handleChange}
                    placeholder="cobertura"
                    className="mb-2 w-full border p-2"
                    required
                />

                <div className="flex justify-end gap-2">
                    <button type="button" onClick={onClose} className="rounded bg-gray-300 px-3 py-1">
                        Cancelar
                    </button>
                    <button type="submit" className="rounded bg-blue-600 px-3 py-1 text-white">
                        Salvar
                    </button>
                </div>
            </form>
        </div>
    );
}
