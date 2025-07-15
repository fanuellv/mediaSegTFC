import { DadosSimulacao } from '@/types/DadosSimulacao';
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

// 👇 Função para pegar cookie do navegador
function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return decodeURIComponent(parts.pop()!.split(';').shift()!);
    return '';
}

export default function Cotacao({ dados, setDados, onVoltar, onAvancar }: Props) {
    const [erro, setErro] = useState<string | null>(null);
    const [loadingInicial, setLoadingInicial] = useState(true);
    const [loadingSimulacao, setLoadingSimulacao] = useState(false);
    const [tipos, setTipos] = useState<TipoSeguro[]>([]);

    useEffect(() => {
        async function carregarTipos() {
            try {
                const response = await fetch('/tipos-seguro');
                const data = await response.json();
                setTipos(data);
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
        } else if (type === 'number') {
            const parsed = parseFloat(value);
            setDados({ [name]: isNaN(parsed) ? undefined : parsed });
        } else {
            setDados({ [name]: value });
        }
    };

    const camposValidos = (): boolean => {
        if (!dados.plano_id) return false;

        if (tipoSelecionado === 'vida' || tipoSelecionado === 'saude') {
            return typeof dados.idade === 'number' && dados.idade > 0 && !!dados.profissao && typeof dados.fumante === 'boolean';
        }

        if (tipoSelecionado === 'automovel') {
            return (
                typeof dados.ano_veiculo === 'number' && dados.ano_veiculo > 1900 && !!dados.tipo_uso // `tem_franquia` é opcional
            );
        }

        return false;
    };

    const simular = async () => {
        setErro(null);
        setLoadingSimulacao(true);

        try {
            const csrfToken = getCookie('XSRF-TOKEN');
            const plano_id = dados.plano?.id || dados.plano_id;

            if (!plano_id) {
                setErro('❌ Nenhum plano foi selecionado.');
                return;
            }

            const payload = {
                ...dados,
                plano_id,

                // Garantir que os dados são enviados corretamente
                ano_veiculo: dados.ano_veiculo ?? null,
                marca_modelo: dados.marca_modelo ?? null,
                matricula: dados.matricula ?? null,
                valor_veiculo: dados.valor_veiculo ?? null,
                tem_franquia: dados.tem_franquia ?? false,
                tipo_uso: dados.tipo_uso ?? null,
            };
            console.log('📤 Payload enviado:', payload);

            const response = await fetch('/simular', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'same-origin',
                body: JSON.stringify(payload),
            });
            console.log('📤 Payload enviado:', JSON.stringify(payload, null, 2));

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.erro || 'Erro ao simular.');
            }

            const result = await response.json();
            setDados({
                ...dados,
                valor: result.valor,
                plano: result.plano,
                apolice_id: result.apolice_id, // <-- ADICIONA ISTO

                // Garantir que os campos de automóvel vão junto
                ano_veiculo: dados.ano_veiculo,
                tem_franquia: dados.tem_franquia,
                tipo_uso: dados.tipo_uso,
                marca_modelo: dados.marca_modelo,
                valor_veiculo: dados.valor_veiculo,
                matricula: dados.matricula,
            });
            console.log(dados);
            

            onAvancar();
        } catch (err: unknown) {
            console.error('❌ Erro na simulação:', err);

            if (err instanceof Error) {
                setErro(err.message);
            } else {
                setErro('Erro inesperado.');
            }
        }
    };

    if (loadingInicial) {
        return (
            <div className="flex h-40 items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="relative flex h-full w-full flex-col justify-between space-y-4 p-4">
            {loadingSimulacao && (
                <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
                </div>
            )}

            <div className="space-y-4">
                <h2 className="text-lg font-bold text-gray-800">Preencha os dados para cotação</h2>

                {tipoSelecionado && (tipoSelecionado === 'vida' || tipoSelecionado === 'saude') && (
                    <>
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
                                className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>

                        <div className="flex flex-col gap-1">
                            <label htmlFor="profissao" className="text-sm font-medium text-gray-700">
                                Profissão:
                            </label>
                            <select
                                id="profissao"
                                name="profissao"
                                value={dados.profissao}
                                onChange={handleChange}
                                required
                                className="w-full appearance-none rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="normal">Normal</option>
                                <option value="risco">De risco</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="fumante"
                                name="fumante"
                                checked={dados.fumante}
                                onChange={handleChange}
                                required
                                className="h-5 w-5 rounded border-gray-300 text-blue-600"
                            />
                            <label htmlFor="fumante" className="text-sm font-medium text-gray-700">
                                Fumante
                            </label>
                        </div>
                    </>
                )}

                {tipoSelecionado === 'automovel' && (
                    <>
                        <div className="space-y-2">
                            <div className="flex w-full gap-4">
                                <div className="flex w-1/2 flex-col gap-1">
                                    <label htmlFor="ano_veiculo" className="text-sm font-medium text-gray-700">
                                        Ano do veículo:
                                    </label>
                                    <input
                                        type="number"
                                        id="ano_veiculo"
                                        name="ano_veiculo"
                                        value={dados.ano_veiculo}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex w-1/2 flex-col gap-1">
                                    <label htmlFor="marca_modelo" className="text-sm font-medium text-gray-700">
                                        Marca / Modelo:
                                    </label>
                                    <input
                                        type="text"
                                        id="marca_modelo"
                                        name="marca_modelo"
                                        value={dados.marca_modelo}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="flex w-full gap-4">
                                <div className="flex w-1/2 flex-col gap-1">
                                    <label htmlFor="matricula" className="text-sm font-medium text-gray-700">
                                        Matrícula:
                                    </label>
                                    <input
                                        type="text"
                                        id="matricula"
                                        name="matricula"
                                        value={dados.matricula}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>

                                <div className="flex w-1/2 flex-col gap-1">
                                    <label htmlFor="valor_veiculo" className="text-sm font-medium text-gray-700">
                                        Valor do veículo (Kz):
                                    </label>
                                    <input
                                        type="number"
                                        id="valor_veiculo"
                                        name="valor_veiculo"
                                        value={dados.valor_veiculo}
                                        onChange={handleChange}
                                        required
                                        className="w-full rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="tem_franquia"
                                    name="tem_franquia"
                                    checked={dados.tem_franquia}
                                    onChange={handleChange}
                                    required
                                    className="h-5 w-5 rounded border-gray-300 text-blue-600"
                                />
                                <label htmlFor="tem_franquia" className="text-sm font-medium text-gray-700">
                                    Tem franquia <span className="text-xs text-gray-500">(Escolher franquia reduz o preço do seguro.)</span>
                                </label>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label htmlFor="tipo_uso" className="text-sm font-medium text-gray-700">
                                    Tipo de uso:
                                </label>
                                <select
                                    id="tipo_uso"
                                    name="tipo_uso"
                                    value={dados.tipo_uso}
                                    onChange={handleChange}
                                    required
                                    className="w-full appearance-none rounded-lg border border-gray-300 p-3 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Selecione</option>
                                    <option value="pessoal">Pessoal</option>
                                    <option value="comercial">Comercial</option>
                                </select>
                            </div>
                        </div>
                    </>
                )}

                {erro && <div className="text-sm font-medium text-red-600">{erro}</div>}
            </div>

            <div className="flex w-full gap-4 pt-4">
                <button
                    onClick={onVoltar}
                    disabled={loadingSimulacao}
                    className="w-1/2 rounded bg-gray-300 p-3 text-sm font-semibold text-gray-800 hover:bg-gray-400 disabled:opacity-50"
                >
                    Voltar
                </button>
                <button
                    onClick={() => {
                        if (camposValidos()) {
                            simular();
                        } else {
                            setErro('Preencha todos os campos obrigatórios antes de continuar.');
                        }
                    }}
                    disabled={loadingSimulacao}
                    className="w-1/2 rounded bg-[#0153A5] p-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                >
                    {loadingSimulacao ? 'Simulando...' : 'Ver Cotação'}
                </button>
            </div>
        </div>
    );
}
