import { Seguradora } from '@/types/DadosSimulacao';
import { useEffect, useState } from 'react';


interface Plano {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    foto?: string | null;
}

interface Props {
    seguradora: Seguradora | null;
    adquirir: () => void;
    onVoltar: () => void;
}

export default function Selecionada({ seguradora, adquirir, onVoltar }: Props) {
    const [planos, setPlanos] = useState<Plano[]>([]);
    const [loading, setLoading] = useState(true);

    async function buscarPlanos() {
        if (!seguradora?.id) return;

        setLoading(true);

        try {
            const response = await fetch(`/planos?seguradora_id=${seguradora.id}`, {
                method: 'GET',
                headers: { Accept: 'application/json' },
            });

            if (!response.ok) {
                const erro = await response.text();
                console.error('❌ Erro na resposta dos planos:', erro);
                setPlanos([]);
                return;
            }

            const dados = await response.json();
            console.log('✅ Planos encontrados:', dados);
            setPlanos(dados);
        } catch (error) {
            console.error('❌ Erro ao buscar planos:', error);
            setPlanos([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (seguradora) buscarPlanos();
    }, [seguradora]);

    if (!seguradora) {
        return (
            <div className="p-4">
                <p className="text-red-500">Nenhuma seguradora selecionada.</p>
                <button onClick={onVoltar} className="mt-2 rounded bg-gray-300 px-4 py-2">Voltar</button>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex h-40 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="space-y-6 rounded">
            <div className="flex items-center gap-4 border-b pb-4">
                <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                    {seguradora.foto ? (
                        <img src={`/storage/${seguradora.foto}`} alt={seguradora.nome} className="h-full w-full object-contain" />
                    ) : (
                        <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">Sem imagem</div>
                    )}
                </div>
                <div>
                    <h2 className="text-xl font-bold">{seguradora.nome}</h2>
                    <p className="text-sm text-gray-600">{seguradora.descricao}</p>
                </div>
            </div>

            <div>
                <h3 className="mb-4 text-lg font-semibold">Planos disponíveis</h3>
                {planos.length === 0 ? (
                    <p className="text-gray-500">Nenhum plano cadastrado para esta seguradora.</p>
                ) : (
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                        {planos.map((plano) => (
                            <div key={plano.id} className="flex gap-4 rounded border bg-gray-50 p-4">
                                <div className="h-20 w-20 flex-shrink-0 rounded bg-gray-100 overflow-hidden">
                                    {plano.foto ? (
                                        <img src={`/storage/${plano.foto}`} alt={plano.nome} className="h-full w-full object-contain" />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">Sem imagem</div>
                                    )}
                                </div>
                                <div className="flex flex-col justify-between w-full">
                                    <div>
                                        <h4 className="text-base font-semibold">{plano.nome}</h4>
                                        <p className="text-sm text-gray-600">{plano.descricao}</p>
                                        <p className="text-sm font-semibold text-[#0153A5] mt-1">Kz {plano.preco}</p>
                                    </div>
                                    <div className="mt-2 self-end">
                                        <button
                                            onClick={adquirir}
                                            className="rounded bg-[#0153A5] px-4 py-1.5 text-sm text-white hover:bg-blue-600"
                                        >
                                            Adquirir
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="flex justify-end">
                <button onClick={onVoltar} className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300">Voltar</button>
            </div>
        </div>
    );
}
