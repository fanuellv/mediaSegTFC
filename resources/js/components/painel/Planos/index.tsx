import { useEffect, useState } from 'react';
import axios from 'axios';

interface Simulacao {
    id: number;
    data: string;
    plano: {
        id: number;
        nome: string;
        tipo_id: number;
        valor: number;
        descricao: string;
    };
    seguradora: {
        id: number;
        nome: string;
    };
    status?: string; // Opcional se tiver
}

export default function MeusPlanos() {
    const [planos, setPlanos] = useState<Simulacao[]>([]);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function buscar() {
            try {
                const { data } = await axios.get('/meus-planos');
                setPlanos(data);
                console.log(data);
            } catch (error) {
                console.error('Erro ao buscar os planos:', error);
            } finally {
                setCarregando(false);
            }
        }

        buscar();
    }, []);

    return (
        <div className="flex w-full flex-col gap-4 rounded-2xl bg-white p-4 sm:h-[88vh]">
            <h1 className="text-lg font-bold text-gray-800">Meus Planos</h1>

            <div
                className="scrollbar-thin scrollbar-thumb-gray-300 flex-1 overflow-y-auto pr-1"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {carregando ? (
                    <p className="text-gray-500">Carregando planos...</p>
                ) : planos.length === 0 ? (
                    <p className="text-gray-500">Nenhum plano encontrado.</p>
                ) : (
                    <table className="w-full table-auto border-collapse text-sm text-left">
                        <thead>
                            <tr className="border-b bg-gray-100 text-gray-700">
                                <th className="p-2">Nome do Plano</th>
                                <th className="p-2">Seguradora</th>
                                <th className="p-2">Status</th>
                                <th className="p-2">Data</th>
                                <th className="p-2">Valor</th>
                                <th className="p-2">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {planos.map((simulacao) => (
                                <tr key={simulacao.id} className="border-b hover:bg-gray-50">
                                    <td className="p-2 font-medium text-gray-800">
                                        {simulacao.plano?.nome ?? '---'}
                                    </td>
                                    <td className="p-2">{simulacao.seguradora?.nome ?? '---'}</td>
                                    <td className="p-2">
                                        <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                                            Ativo
                                        </span>
                                    </td>
                                    <td className="p-2">
                                        {new Date(simulacao.data).toLocaleDateString()}
                                    </td>
                                    <td className="p-2 font-semibold text-[#0153A5]">
                                        Kz {simulacao.plano?.valor?.toLocaleString('pt-AO')}
                                    </td>
                                    <td className="p-2 text-right">
                                        <button className="text-sm text-blue-600 hover:underline">
                                            Ver detalhes
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
