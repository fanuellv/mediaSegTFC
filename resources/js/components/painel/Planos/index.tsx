import axios from 'axios';
import { useEffect, useState } from 'react';

interface Plano {
    id: number;
    nome: string;
    tipo_id: number;
    valor: number;
    descricao: string;
    seguradora?: {
        id: number;
        nome: string;
    };
}

interface Apolice {
    id: number;
    data_inicio: string;
    data_fim: string;
    valor_total: number;
    plano: Plano;
}

interface Resumo {
    total: number;
    ativos: number;
    investido: number;
}

export default function Index() {
    const [apolices, setApolices] = useState<Apolice[]>([]);
    const [resumo, setResumo] = useState<Resumo>({ total: 0, ativos: 0, investido: 0 });
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function buscar() {
            try {
                const { data } = await axios.get('/meus-planos');
                setApolices(data.apolices);
                setResumo(data.resumo);
            } catch (error) {
                console.error('Erro ao buscar os planos:', error);
            } finally {
                setCarregando(false);
            }
        }

        buscar();
    }, []);

    function abrirPdf(id: number) {
        window.open(`/apolice/pdf/${id}`, '_blank');
        console.log(apolices);
    }

    return (
        <div className="flex h-full w-full flex-col gap-4 overflow-hidden rounded-2xl bg-white p-4 sm:h-[88vh]">
            <h1 className="text-lg font-bold text-gray-800">Meus Planos</h1>

            <div
                className="scrollbar-thin scrollbar-thumb-gray-300 h-4/5 flex-1 overflow-y-auto pr-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {carregando ? (
                    <div className="flex h-full w-full items-center justify-center rounded bg-white">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                    </div>
                ) : apolices.length === 0 ? (
                    <p className="text-gray-500">Nenhum plano encontrado.</p>
                ) : (
                    <div className="max-h-[60vh] overflow-auto">
                        <table className="w-full table-auto border-collapse text-left text-sm">
                            <thead className="sticky top-0 z-10 bg-white shadow-sm">
                                <tr className="border-b bg-gray-100 text-gray-700">
                                    <th className="p-2">Nome do Plano</th>
                                    <th className="p-2">Seguradora</th>
                                    <th className="hidden p-2 sm:block">Status</th>
                                    <th className="p-2">Válido até</th>
                                    <th className="hidden p-2 sm:block">Valor</th>
                                    <th className="p-2">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {apolices.map((apolice) => {
                                    const ativo = new Date(apolice.data_inicio) <= new Date() && new Date(apolice.data_fim) >= new Date();
                                    return (
                                        <tr key={apolice.id} className="border-b hover:bg-gray-50">
                                            <td className="p-2 font-medium text-gray-800">{apolice.plano?.nome ?? '---'}</td>
                                            <td className="p-2 text-gray-600">{apolice.plano?.seguradora?.nome ?? '---'}</td>
                                            <td className="hidden p-2 sm:block text-gray-600">
                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs font-semibold ${ativo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}
                                                >
                                                    {ativo ? 'Ativo' : 'Expirado'}
                                                </span>
                                            </td>
                                            <td className="p-2 text-gray-600">{new Date(apolice.data_fim).toLocaleDateString()}</td>
                                            <td className="hidden p-2 font-semibold text-[#0153A5] sm:block">
                                                Kz{' '}
                                                {apolice.valor_total?.toLocaleString('pt-AO', {
                                                    minimumFractionDigits: 2,
                                                })}
                                            </td>
                                            <td className="p-2">
                                                <button onClick={() => abrirPdf(apolice.id)} className="text-sm text-blue-600 hover:underline">
                                                    Ver detalhes
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Resumo */}
            <div className="mb-15 h-1/5 w-full rounded-2xl bg-gradient-to-bl from-[#1C8BF9] to-[#0153A5] p-4 text-white sm:mb-0">
                <h1 className="mb-2 text-lg font-bold">Resumo Meus Planos</h1>
                <div className="flex items-center justify-between gap-4 sm:flex-row">
                    <div className="flex flex-col items-center">
                        <span className="text-[10px] sm:text-sm">Planos Ativos</span>
                        <span className="text-[8px] font-bold sm:text-2xl">{resumo.ativos}</span>
                    </div>

                    <div className="w-full sm:w-1/2">
                        <span className="mb-1 block text-center text-[10px] sm:text-sm">Progresso</span>
                        <div className="h-4 w-full overflow-hidden rounded-full bg-white">
                            <div
                                className="h-full rounded-full bg-green-300"
                                style={{ width: `${(resumo.ativos / resumo.total) * 100 || 0}%` }}
                            ></div>
                        </div>
                        <span className="mt-1 block text-center text-xs">{((resumo.ativos / resumo.total) * 100 || 0).toFixed(0)}%</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <span className="text-[10px] sm:text-sm">Investimento Total</span>
                        <span className="text-[8px] font-bold sm:text-2xl">
                            Kz {resumo.investido.toLocaleString('pt-AO', { minimumFractionDigits: 2 })}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
