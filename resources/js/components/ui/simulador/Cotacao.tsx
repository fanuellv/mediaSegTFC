import { DadosSimulacao } from '@/types/DadosSimulacao';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface TipoSeguro {
    id: number;
    nome: 'Vida' | 'Saude' | 'Automovel';
}

interface Props {
    dados: DadosSimulacao;
    setDados: (novos: Partial<DadosSimulacao>) => void;
    onVoltar: () => void;
    onAvancar: () => void;
}

export default function Cotacao({ dados, setDados, onVoltar, onAvancar }: Props) {
    const [erro, setErro] = useState<string | null>(null);
    const [loadingInicial, setLoadingInicial] = useState(true);
    const [loadingSimulacao, setLoadingSimulacao] = useState(false);
    const [tipos, setTipos] = useState<TipoSeguro[]>([]);

    useEffect(() => {
        async function carregarTipos() {
            try {
                const response = await axios.get('http://127.0.0.1:8000/tipos-seguro');
                setTipos(response.data);
            } catch (err) {
                console.error('❌ Erro ao carregar tipos de seguro:', err);
            } finally {
                setLoadingInicial(false);
            }
        }

        carregarTipos();
    }, []);

    const tipoSelecionado = tipos.find((t) => t.id === dados.tipo_id)?.nome.toLowerCase() as DadosSimulacao['tipo'];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setDados({ [name]: checked });
        } else {
            setDados({
                [name]: ['idade', 'seguradora_id', 'tipo_id', 'ano_veiculo'].includes(name) ? parseInt(value) : value,
            });
        }
    };

    const simular = async () => {
        setErro(null);
        setLoadingSimulacao(true);

        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            const plano_id = dados.plano?.id || dados.plano_id;

            if (!plano_id) {
                setErro('❌ Nenhum plano foi selecionado.');
                return;
            }

            const payload = {
                ...dados,
                plano_id,
            };

            const response = await axios.post('http://127.0.0.1:8000/simular', payload, {
                headers: {
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': token || '',
                },
                withCredentials: true, // 🔴 ESSENCIAL para enviar os cookies da sessão
            });

            const { valor, plano } = response.data;
            setDados({ ...dados, valor, plano });
            onAvancar();
        } catch (err: unknown) {
            console.error('❌ Erro na simulação:', err);
            if (axios.isAxiosError(err)) {
                setErro(err.response?.data?.erro || 'Erro ao simular.');
            } else {
                setErro('Erro inesperado.');
            }
        } finally {
            setLoadingSimulacao(false);
        }
    };

    // 🔵 Spinner durante o carregamento inicial
    if (loadingInicial) {
        return (
            <div className="flex h-40 items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="relative flex h-full w-full flex-col justify-between space-y-4 p-4">
            {/* 🔵 Overlay spinner durante a simulação */}
            {loadingSimulacao && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                </div>
            )}

            <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-800">Preencha os dados para cotação</h2>

                {tipoSelecionado && (tipoSelecionado === 'vida' || tipoSelecionado === 'saude') && (
                    <>
                        {/* Idade */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="idade" className="text-sm font-medium text-gray-700">
                                Idade:
                            </label>
                            <input
                                type="number"
                                id="idade"
                                name="idade"
                                value={dados.idade}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Profissão */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="profissao" className="text-sm font-medium text-gray-700">
                                Profissão:
                            </label>
                            <select
                                id="profissao"
                                name="profissao"
                                value={dados.profissao}
                                onChange={handleChange}
                                className="w-full appearance-none rounded-lg border border-gray-300 bg-white p-3 pr-10 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                            >
                                <option value="normal">Normal</option>
                                <option value="risco">De risco</option>
                            </select>
                        </div>

                        {/* Fumante */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="fumante"
                                name="fumante"
                                checked={dados.fumante}
                                onChange={handleChange}
                                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="fumante" className="text-sm font-medium text-gray-700">
                                Fumante
                            </label>
                        </div>
                    </>
                )}

                {tipoSelecionado === 'automovel' && (
                    <>
                        {/* Ano do veículo */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="ano_veiculo" className="text-sm font-medium text-gray-700">
                                Ano do veículo:
                            </label>
                            <input
                                type="number"
                                id="ano_veiculo"
                                name="ano_veiculo"
                                value={dados.ano_veiculo || ''}
                                onChange={handleChange}
                                className="w-full rounded-lg border border-gray-300 bg-white p-3 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                            />
                        </div>

                        {/* Tem franquia */}
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="tem_franquia"
                                name="tem_franquia"
                                checked={dados.tem_franquia || false}
                                onChange={handleChange}
                                className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <label htmlFor="tem_franquia" className="text-sm font-medium text-gray-700">
                                Tem franquia
                            </label>
                        </div>

                        {/* Tipo de uso */}
                        <div className="flex flex-col gap-1">
                            <label htmlFor="tipo_uso" className="text-sm font-medium text-gray-700">
                                Tipo de uso:
                            </label>
                            <select
                                id="tipo_uso"
                                name="tipo_uso"
                                value={dados.tipo_uso || ''}
                                onChange={handleChange}
                                className="w-full appearance-none rounded-lg border border-gray-300 bg-white p-3 pr-10 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                            >
                                <option value="">Selecione</option>
                                <option value="pessoal">Pessoal</option>
                                <option value="comercial">Comercial</option>
                            </select>
                        </div>
                    </>
                )}

                {/* Mensagem de erro */}
                {erro && <div className="text-sm font-medium text-red-600">{erro}</div>}
            </div>

            {/* Botões de ação */}
            <div className="flex w-full gap-4 pt-4">
                <button
                    onClick={onVoltar}
                    disabled={loadingSimulacao}
                    className="w-1/2 rounded bg-gray-300 p-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-400 disabled:opacity-50"
                >
                    Voltar
                </button>
                <button
                    onClick={simular}
                    disabled={loadingSimulacao}
                    className="w-1/2 rounded bg-[#0153A5] p-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                    {loadingSimulacao ? 'Simulando...' : 'Ver Cotação'}
                </button>
            </div>
        </div>
    );
}
