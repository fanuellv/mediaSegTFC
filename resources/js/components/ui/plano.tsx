import { useEffect, useState } from 'react';
import ModalPlano from './ModalPlano';

interface FormData {
    nome: string;
    descricao: string;
    valor: string;
    duracao: string;
    cobertura: string;
    seguradora_id?: number;
    tipo_id: number;
    foto?: File | null;
}

interface PlanoData {
    id: number;
    nome: string;
    descricao: string;
    valor: string;
    duracao: string;
    cobertura: string;
    seguradora_id?: number;
    tipo_id: number;
    foto?: string;
}

interface Seguradora {
    id: number;
    nome: string;
}

export default function Plano() {
    const [seguradoras, setSeguradoras] = useState<Seguradora[]>([]);
    const [seguradoraSelecionada, setSeguradoraSelecionada] = useState<number | null>(null);
    const [planos, setPlanos] = useState<PlanoData[]>([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [planoEditar, setPlanoEditar] = useState<PlanoData | null>(null);

    useEffect(() => {
        buscarSeguradoras();
    }, []);

    useEffect(() => {
        if (seguradoraSelecionada) {
            buscarPlanos(seguradoraSelecionada);
        }
    }, [seguradoraSelecionada]);

    async function buscarSeguradoras() {
        const res = await fetch('/seguradoras');
        const dados = await res.json();
        setSeguradoras(dados);
        if (dados.length > 0) {
            setSeguradoraSelecionada(dados[0].id);
        }
    }

    async function buscarPlanos(seguradoraId: number) {
        try {
            const res = await fetch(`/planos?seguradora_id=${seguradoraId}`);
            const dados = await res.json();
            setPlanos(dados);
        } catch (error) {
            console.error('Erro ao buscar planos:', error);
        }
    }

    async function criarPlano(form: FormData) {
        if (!seguradoraSelecionada) return;

        const formData = new FormData();
        formData.append('nome', form.nome);
        formData.append('descricao', form.descricao);
        formData.append('valor', form.valor);
        formData.append('duracao', form.duracao);
        formData.append('cobertura', form.cobertura);
        formData.append('seguradora_id', String(seguradoraSelecionada));
        formData.append('tipo_id', String(form.tipo_id));
        if (form.foto) formData.append('foto', form.foto);

        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        const res = await fetch('/planos', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': token || '',
                Accept: 'application/json',
            },
            body: formData,
        });

        if (res.ok) {
            buscarPlanos(seguradoraSelecionada);
        } else {
            console.error(await res.text());
        }
    }

    async function atualizarPlano(form: FormData, id: number) {
        if (!seguradoraSelecionada) return;

        const formData = new FormData();
        formData.append('nome', form.nome);
        formData.append('descricao', form.descricao);
        formData.append('valor', form.valor);
        formData.append('duracao', form.duracao);
        formData.append('cobertura', form.cobertura);
        formData.append('seguradora_id', String(seguradoraSelecionada));
        formData.append('tipo_id', String(form.tipo_id));
        formData.append('_method', 'PUT');
        if (form.foto) formData.append('foto', form.foto);

        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        const res = await fetch(`/planos/${id}`, {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': token || '',
                Accept: 'application/json',
            },
            body: formData,
        });

        if (res.ok) {
            buscarPlanos(seguradoraSelecionada);
        } else {
            console.error(await res.text());
        }
    }

    async function eliminarPlano(id: number) {
        if (!confirm('Deseja mesmo eliminar este plano?')) return;

        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        const res = await fetch(`/planos/${id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': token || '',
                Accept: 'application/json',
            },
        });

        if (res.ok && seguradoraSelecionada) {
            buscarPlanos(seguradoraSelecionada);
        } else {
            console.error(await res.text());
        }
    }

    function editarPlano(plano: PlanoData) {
        setPlanoEditar(plano);
        setMostrarModal(true);
    }

    return (
        <div className="px-4 py-6 md:px-12 lg:px-20">
            <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="relative w-full md:max-w-sm">
                    <select
                        value={seguradoraSelecionada || ''}
                        onChange={(e) => setSeguradoraSelecionada(Number(e.target.value))}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2 pr-10 text-sm text-gray-800 shadow-sm transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>
                            Selecione uma seguradora
                        </option>
                        {seguradoras.map((s) => (
                            <option key={s.id} value={s.id}>
                                {s.nome}
                            </option>
                        ))}
                    </select>

                    <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-500">
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                </div>

                <button
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                    onClick={() => setMostrarModal(true)}
                >
                    <span className="text-lg">＋</span>
                    Novo Plano
                </button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
                <table className="min-w-full text-left text-sm text-gray-800">
                    <thead className="bg-gray-100 text-xs font-semibold text-gray-600 uppercase">
                        <tr>
                            <th className="px-5 py-3">Foto</th>
                            <th className="px-5 py-3">Nome</th>
                            <th className="px-5 py-3">Tipo Seguro</th>
                            <th className="px-5 py-3">Descrição</th>
                            <th className="px-5 py-3">Valor</th>
                            <th className="px-5 py-3">Duração</th>
                            <th className="px-5 py-3">Cobertura</th>
                            <th className="px-5 py-3 text-center">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {planos.length > 0 ? (
                            planos.map((plano) => (
                                <tr key={plano.id}>
                                    <td className="px-5 py-4">
                                        {plano.foto ? (
                                            <img
                                                src={`/storage/${plano.foto}`}
                                                alt="foto"
                                                className="h-12 w-12 rounded object-cover"
                                            />
                                        ) : (
                                            <span className="text-gray-400">—</span>
                                        )}
                                    </td>
                                    <td className="px-5 py-4 font-medium">{plano.nome}</td>
                                    <td className="px-5 py-4">{plano.tipo_id}</td>
                                    <td className="px-5 py-4">{plano.descricao}</td>
                                    <td className="px-5 py-4">{plano.valor}</td>
                                    <td className="px-5 py-4">{plano.duracao}</td>
                                    <td className="px-5 py-4">{plano.cobertura}</td>
                                    <td className="px-5 py-4 text-center space-x-3">
                                        <button onClick={() => editarPlano(plano)} className="text-sm text-blue-600 hover:underline">
                                            Editar
                                        </button>
                                        <button onClick={() => eliminarPlano(plano.id)} className="text-sm text-red-600 hover:underline">
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={8} className="px-5 py-6 text-center text-gray-500">
                                    Nenhum plano cadastrado para esta seguradora.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {mostrarModal && seguradoraSelecionada && (
                <ModalPlano
                    planoEditar={planoEditar}
                    seguradoraId={seguradoraSelecionada}
                    onClose={() => {
                        setMostrarModal(false);
                        setPlanoEditar(null);
                    }}
                    onSubmit={(form, id) => {
                        if (id) atualizarPlano(form, id);
                        else criarPlano(form);
                    }}
                />
            )}
        </div>
    );
}
