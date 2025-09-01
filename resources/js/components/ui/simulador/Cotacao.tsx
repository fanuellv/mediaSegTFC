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
                console.error('Erro ao carregar tipos de seguro:', err);
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
            setDados({ [name]: (e.target as HTMLInputElement).checked });
        } else if (type === 'number') {
            const parsed = parseFloat(value);
            setDados({ [name]: isNaN(parsed) ? undefined : parsed });
        } else {
            setDados({ [name]: value });
        }
    };

    // -------- Dependentes --------
    const adicionarDependente = () => {
        setDados({
            dependentes: [...(dados.dependentes || []), { nome: '', idade: 0, fumante: false }],
        });
    };

    const removerDependente = (index: number) => {
        const novos = [...(dados.dependentes || [])];
        novos.splice(index, 1);
        setDados({ dependentes: novos });
    };

    const handleDependenteChange = (index: number, campo: string, valor: unknown) => {
        const novos = [...(dados.dependentes || [])];
        novos[index] = { ...novos[index], [campo]: valor };
        setDados({ dependentes: novos });
    };
    // -----------------------------

    const camposValidos = (): boolean => {
        if (!dados.plano_id) return false;

        if (tipoSelecionado === 'vida' || tipoSelecionado === 'saude') {
            return typeof dados.idade === 'number' && dados.idade > 0 && !!dados.profissao && typeof dados.fumante === 'boolean';
        }

        if (tipoSelecionado === 'automovel') {
            return typeof dados.ano_veiculo === 'number' && dados.ano_veiculo > 1900 && !!dados.tipo_uso;
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
                setErro('Nenhum plano foi selecionado.');
                return;
            }

            const payload = {
                ...dados,
                plano_id,
                ano_veiculo: dados.ano_veiculo ?? null,
                marca_modelo: dados.marca_modelo ?? null,
                matricula: dados.matricula ?? null,
                valor_veiculo: dados.valor_veiculo ?? null,
                tem_franquia: dados.tem_franquia ?? false,
                tipo_uso: dados.tipo_uso ?? null,
                dependentes: dados.dependentes ?? [],
                profissao:dados.profissao?? null,
                fumante:dados.fumante?? null,
            };
            //console.log('📤 Payload enviado:', payload);

            const response = await fetch('/simular', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                credentials: 'include',
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData?.erro || 'Erro ao simular.');
            }

            const result = await response.json();
            setDados({
                ...dados,
                valor: result.valor,
                plano: result.plano,
                apolice_id: result.apolice_id,
            });

            onAvancar();
        } catch (err: unknown) {
            console.error('Erro na simulação:', err);
            if (err instanceof Error) {
                setErro(err.message);
            } else {
                setErro('Erro inesperado.');
            }
        } finally {
            setLoadingSimulacao(false);
        }
    };

    if (loadingInicial) {
        return (
            <div className="flex h-auto items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
        );
    }

    return (
            <div className="relative flex h-full w-full flex-col">
            {loadingSimulacao && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-sm">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
            )}

            <div className="flex-1 overflow-y-auto space-y-4 p-4">
                <h2 className="text-lg font-bold text-gray-800">Preencha os dados para cotação</h2>

                {tipoSelecionado && (tipoSelecionado === 'vida' || tipoSelecionado === 'saude') && (
                    <>
                        <div className="flex flex-col text-gray-600 gap-1">
                            <label htmlFor="idade">Idade:</label>
                            <input
                                type="number"
                                id="idade"
                                name="idade"
                                value={dados.idade}
                                onChange={handleChange}
                                className="w-full rounded-lg border p-3 text-sm"
                            />
                        </div>

                        <div className="flex flex-col text-gray-600 gap-1">
                            <label htmlFor="profissao">Profissão:</label>
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

                        <div className="flex items-center text-gray-600 gap-2">
                            <input
                                type="checkbox"
                                id="fumante"
                                name="fumante"
                                checked={dados.fumante}
                                onChange={handleChange}
                                className="h-5 w-5 rounded border-gray-300 text-blue-600"
                            />
                            <label htmlFor="fumante">Fumante</label>
                        </div>

                        {/* Dependentes */}
                        <div className="mt-4  space-y-2 ">
                            <h3 className="font-semibold text-gray-700">Dependentes <span className='text-gray-400'>(Se existirem)</span></h3>

                            {(dados.dependentes || []).map((dep, index) => (
                                <div key={index} className="flex gap-2 border-b p-2 rounded-md flex-col sm:flex-row ">
                                    <div className='sm:w-1/2 flex gap-2 items-center'>
                                        <label htmlFor="">Nome</label>
                                        <input
                                        type="text"
                                        placeholder="Nome"
                                        value={dep.nome}
                                        onChange={(e) => handleDependenteChange(index, 'nome', e.target.value)}
                                        className="flex-1 rounded border p-2 text-sm w-full"
                                    />
                                    </div>
                                    <div className='flex gap-2'>
                                    <label htmlFor="">
                                    
                                    Idade {" "}
                                    <input
                                        type="number"
                                        placeholder="Idade"
                                        value={dep.idade}
                                        onChange={(e) => handleDependenteChange(index, 'idade', Number(e.target.value))}
                                        className="w-20 rounded border p-2 text-sm"
                                    />
                                    </label>
                                    <label className="flex items-center gap-1 text-sm">
                                        <input
                                            type="checkbox"
                                            checked={dep.fumante}
                                            onChange={(e) => handleDependenteChange(index, 'fumante', e.target.checked)}
                                        />
                                        Fumante
                                    </label>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => removerDependente(index)}
                                        className="ml-2.5 hover:bg-red-500 bg-blue-500 text-white rounded-2xl p-2 font-bold text-xs"
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))}

                            <button
                                type="button"
                                onClick={adicionarDependente}
                                className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
                            >
                                + Adicionar Dependente
                            </button>
                        </div>
                    </>
                )}

                {tipoSelecionado === 'automovel' && (
                    <> 
                        <div className="space-y-2">
                            <div className="flex w-full text-gray-600 gap-4">
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

                                <div className="flex w-1/2 flex-col text-gray-600 gap-1">
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
                            <div className="flex w-full text-gray-600 gap-4">
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

                                <div className="flex w-1/2 flex-col text-gray-600 gap-1">
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
                            <div className="flex items-center text-gray-600 gap-2">
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

                            <div className="flex flex-col text-gray-600 gap-1">
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

            <div className="sticky bottom-0 flex w-full gap-4 bg-white p-4 border-t">
        <button
            onClick={onVoltar}
            className="w-1/2 rounded bg-gray-300 p-3 text-sm font-semibold text-gray-800"
        >
            Voltar
        </button>
        <button
            onClick={() => (camposValidos() ? simular() : setErro('Preencha todos os campos obrigatórios'))}
            className="w-1/2 rounded bg-[#0153A5] p-3 text-sm font-semibold text-white"
        >
            {loadingSimulacao ? 'Simulando...' : 'Ver Cotação'}
        </button>
    </div>
        </div>
    );
}
