import { useEffect, useState } from 'react';

interface PlanoData {
    id: number;
    nome: string;
    descricao: string;
    valor: string;
    duracao: string;
    cobertura: string;
    tipo_id: number;
    foto?: string;
}

interface FormData {
    nome: string;
    descricao: string;
    valor: string;
    duracao: string;
    cobertura: string;
    tipo_id: number;
    foto?: File | null;
}

interface Props {
    planoEditar: PlanoData | null;
    seguradoraId: number;
    onClose: () => void;
    onSubmit: (form: FormData, id?: number | null) => void;
}

export default function ModalPlano({ onClose, onSubmit, planoEditar }: Props) {
    const [form, setForm] = useState<FormData>({
        nome: '',
        descricao: '',
        valor: '',
        duracao: '',
        cobertura: '',
        tipo_id: 1,
        foto: null,
    });

    const [previewFoto, setPreviewFoto] = useState<string | null>(null);

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
                foto: null, // não carregamos o arquivo da imagem atual
            });

            if (planoEditar.foto) {
                setPreviewFoto(`/storage/${planoEditar.foto}`);
            }
        } else {
            setForm({
                nome: '',
                descricao: '',
                valor: '',
                duracao: '',
                cobertura: '',
                tipo_id: 1,
                foto: null,
            });
            setPreviewFoto(null);
        }
    }, [planoEditar]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const target = e.target;
        const { name } = target;

        if (target instanceof HTMLInputElement && target.type === 'file') {
            const file = target.files?.[0] || null;
            setForm((prev) => ({ ...prev, [name]: file }));

            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setPreviewFoto(reader.result as string);
                };
                reader.readAsDataURL(file);
            } else {
                setPreviewFoto(null);
            }
        } else if (name === 'tipo_id') {
            setForm((prev) => ({ ...prev, tipo_id: Number(target.value) }));
        } else {
            setForm((prev) => ({ ...prev, [name]: target.value }));
        }
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        onSubmit(form, planoEditar?.id ?? null);
        onClose();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <form
                className="w-[400px] rounded bg-white p-6 shadow-md"
                onSubmit={handleSubmit}
                encType="multipart/form-data"
            >
                <h2 className="mb-4 text-xl font-bold">{planoEditar ? 'Editar Plano' : 'Novo Plano'}</h2>

                <input
                    type="text"
                    name="nome"
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Nome"
                    className="mb-2 w-full border p-2"
                    required
                />

                <select
                    name="tipo_id"
                    value={form.tipo_id}
                    onChange={handleChange}
                    className="mb-2 w-full border p-2"
                    required
                >
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
                    placeholder="Descrição"
                    className="mb-2 w-full border p-2"
                    required
                />

                <input
                    type="text"
                    name="valor"
                    value={form.valor}
                    onChange={handleChange}
                    placeholder="Valor"
                    className="mb-2 w-full border p-2"
                    required
                />

                <input
                    type="text"
                    name="duracao"
                    value={form.duracao}
                    onChange={handleChange}
                    placeholder="Duração"
                    className="mb-2 w-full border p-2"
                    required
                />

                <input
                    type="text"
                    name="cobertura"
                    value={form.cobertura}
                    onChange={handleChange}
                    placeholder="Cobertura"
                    className="mb-2 w-full border p-2"
                    required
                />

                <div className="mb-4">
                    <label className="mb-1 block text-sm font-medium text-gray-700">Foto do plano</label>
                    <input
                        type="file"
                        name="foto"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full border p-2"
                    />
                    {previewFoto && (
                        <img src={previewFoto} alt="Preview" className="mt-2 h-20 w-20 rounded object-cover" />
                    )}
                </div>

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
