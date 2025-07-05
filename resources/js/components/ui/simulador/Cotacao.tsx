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
        <div className="space-y-4 h-full w-full">
            {/* 🔵 Overlay spinner durante a simulação */}
            {loadingSimulacao && (
                <div className="absolute w-full h-full inset-0 z-10 flex items-center justify-center bg-white backdrop-blur-sm">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                </div>
            )}

            <h2 className="text-lg font-bold">Preencha os dados para cotação</h2>

            {tipoSelecionado && (tipoSelecionado === 'vida' || tipoSelecionado === 'saude') && (
                <>
                    <label>Idade:</label>
                    <input type="number" name="idade" value={dados.idade} onChange={handleChange} className="w-full rounded border p-2" />

                    <label>Profissão:</label>
                    <select name="profissao" value={dados.profissao} onChange={handleChange} className="w-full rounded border p-2">
                        <option value="normal">Normal</option>
                        <option value="risco">De risco</option>
                    </select>

                    <label>
                        <input type="checkbox" name="fumante" checked={dados.fumante} onChange={handleChange} className="mr-2" />
                        Fumante
                    </label>
                </>
            )}

            {tipoSelecionado === 'automovel' && (
                <>
                    <label>Ano do veículo:</label>
                    <input
                        type="number"
                        name="ano_veiculo"
                        value={dados.ano_veiculo || ''}
                        onChange={handleChange}
                        className="w-full rounded border p-2"
                    />

                    <label>Tem franquia:</label>
                    <input type="checkbox" name="tem_franquia" checked={dados.tem_franquia || false} onChange={handleChange} className="ml-2" />

                    <label>Tipo de uso:</label>
                    <select name="tipo_uso" value={dados.tipo_uso || ''} onChange={handleChange} className="w-full rounded border p-2">
                        <option value="">Selecione</option>
                        <option value="pessoal">Pessoal</option>
                        <option value="comercial">Comercial</option>
                    </select>
                </>
            )}

            {erro && <div className="text-red-600">{erro}</div>}

            <div className="mt-auto flex w-full gap-4 pt-4">
                <button onClick={onVoltar} className="w-1/2 rounded bg-gray-300 p-2 hover:bg-gray-400" disabled={loadingSimulacao}>
                    Voltar
                </button>
                <button onClick={simular} disabled={loadingSimulacao} className="w-1/2 rounded bg-blue-600 p-2 text-white hover:bg-blue-700">
                    {loadingSimulacao ? 'Simulando...' : 'Ver Cotação'}
                </button>
            </div>
        </div>
    );
}
