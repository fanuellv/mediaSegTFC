import { useCallback, useEffect, useState } from 'react';
import { CgSelect } from 'react-icons/cg';
import { DadosSimulacao, Plano } from '@/types/DadosSimulacao';


interface Seguradora {
    id: number;
    nome: string;
    nif: string;
    telefone: string;
    endereco: string;
    descricao: string;
    foto: string | null;
}



interface Props {
    onAvancar: () => void;
    setDados: (novos: Partial<DadosSimulacao>) => void;
}

export default function SimuladorPlanoForm({ onAvancar, setDados }: Props) {
    const [seguradoras, setSeguradoras] = useState<Seguradora[]>([]);
    const [planos, setPlanos] = useState<Plano[]>([]);
    const [seguradoraSelecionada, setSeguradoraSelecionada] = useState('');
    const [planoSelecionado, setPlanoSelecionado] = useState('');
    const [info, setInfo] = useState('');

    const seguradoraId = Number(seguradoraSelecionada);
    const planoId = Number(planoSelecionado);

    const informacao = useCallback(() => {
        const plano = planos.find((p) => p.id === planoId);
        const seguradora = seguradoras.find((s) => s.id === seguradoraId);

        if (!plano || !seguradora) return '';

        return `${plano.nome}, da seguradora ${seguradora.nome}, ${plano.descricao}`;
    }, [planos, planoId, seguradoras, seguradoraId]);

    // Buscar seguradoras
    async function buscarSeguradoras() {
        try {
            console.log('🔍 Buscando seguradoras...');
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const response = await fetch('http://127.0.0.1:8000/seguradoras', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': token || '',
                },
            });

            if (!response.ok) {
                const erro = await response.text();
                console.error('❌ Erro na resposta:', erro);
                return;
            }

            const dados = await response.json();
            console.log('✅ Seguradoras encontradas:', dados);
            setSeguradoras(dados); // ✅ Correção aplicada aqui
        } catch (error) {
            console.error('❌ Erro ao buscar seguradoras:', error);
        }
    }

    // Carrega seguradoras ao carregar o componente
    useEffect(() => {
        buscarSeguradoras();
    }, []);

    // Buscar planos da seguradora selecionada
    useEffect(() => {
        if (!seguradoraSelecionada) {
            setPlanos([]); // limpa planos se nada estiver selecionado
            return;
        }

        const id = Number(seguradoraSelecionada);
        if (isNaN(id)) return;

        async function buscarPlanos() {
            try {
                console.log('🔍 Buscando planos para seguradora ID:', id);
                const response = await fetch(`/planos?seguradora_id=${id}`, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
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
            }
        }

        buscarPlanos();
    }, [seguradoraSelecionada]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!seguradoraId || !planoId) {
            alert('Selecione a seguradora e o plano.');
            return;
        }

        const planoSelecionadoInfo = planos.find((p) => p.id === planoId);

        if (!planoSelecionadoInfo || !planoSelecionadoInfo.tipo_id) {
            alert('Plano inválido ou sem tipo definido.');
            return;
        }

        // Mapear tipo_id numérico para string
        const tipoMapeado = {
            1: 'vida',
            2: 'saude',
            3: 'automovel',
        } as const;

        const tipoSeguro = tipoMapeado[planoSelecionadoInfo.tipo_id as keyof typeof tipoMapeado];


        if (!tipoSeguro) {
            alert('Tipo de seguro desconhecido.');
            return;
        }

        // Enviar dados para próxima etapa
        setDados({
            seguradora_id: seguradoraId,
            plano_id: planoId,
            tipo_id: planoSelecionadoInfo.tipo_id,
            tipo: tipoSeguro,
            plano: planoSelecionadoInfo,
        });

        onAvancar();

        console.log('📤 Enviando dados da simulação:');
        // Aqui você pode enviar os dados com fetch POST se quiser
    }

    function handleReset() {
        setSeguradoraSelecionada('');
        setPlanoSelecionado('');
        setInfo('');
        setPlanos([]);
    }

    useEffect(() => {
        const texto = informacao();
        setInfo(texto);
    }, [planoSelecionado, informacao]);

    return (
        <div className="h-full w-full">
            <form onSubmit={handleSubmit} className="flex h-full flex-col space-y-6">
                <h1 className="mb-4 text-lg font-bold">Contratação de Plano</h1>
                {/* Seguradora */}
                <div className="relative flex w-full flex-col gap-1">
                    <label htmlFor="seguradora" className="text-sm font-medium text-gray-700">
                        Seguradora
                    </label>
                    <select
                        id="seguradora"
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white p-3 pr-10 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        value={seguradoraSelecionada}
                        onChange={(e) => setSeguradoraSelecionada(e.target.value)}
                    >
                        <option value="" disabled>
                            Selecione a seguradora
                        </option>
                        {seguradoras.map((s) => (
                            <option key={s.id} value={s.id.toString()}>
                                {s.nome}
                            </option>
                        ))}
                    </select>
                    <CgSelect className="pointer-events-none absolute top-[38px] right-4 text-gray-500" />
                </div>

                {/* Planos */}
                <div className="relative flex w-full flex-col gap-1">
                    <label htmlFor="plano" className="text-sm font-medium text-gray-700">
                        Planos disponíveis
                    </label>
                    <select
                        id="plano"
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white p-3 pr-10 text-sm shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100"
                        value={planoSelecionado}
                        onChange={(e) => setPlanoSelecionado(e.target.value)}
                        disabled={!planos.length}
                    >
                        <option value="" disabled>
                            Selecione o plano
                        </option>
                        {planos.length === 0 && <option disabled>Nenhum plano disponível</option>}
                        {planos.map((p) => (
                            <option key={p.id} value={p.id.toString()}>
                                {p.nome}
                            </option>
                        ))}
                    </select>
                    <CgSelect className="pointer-events-none absolute top-[38px] right-4 text-gray-500" />
                </div>

                {/* Informações adicionais */}
                <div className="flex w-full flex-col gap-1">
                    <label htmlFor="info" className="text-sm font-medium text-gray-700">
                        Informações adicionais
                    </label>
                    <textarea
                        id="info"
                        placeholder="Notas adicionais"
                        className="h-20 w-full resize-none rounded-lg border border-gray-300 bg-gray-100 p-3 text-sm shadow-sm"
                        value={info}
                        onChange={(e) => setInfo(e.target.value)}
                        disabled
                    />
                </div>

                {/* Botões no final */}
                <div className="mt-auto flex w-full gap-4">
                    <button
                        type="button"
                        onClick={handleReset}
                        className="w-1/2 rounded bg-gray-200 p-3 font-semibold text-gray-700 transition hover:bg-gray-300"
                    >
                        Limpar
                    </button>
                    <button type="submit" className="w-1/2 rounded bg-[#0153A5] p-3 font-semibold text-white transition hover:bg-blue-800">
                        Simular
                    </button>
                </div>
            </form>
        </div>
    );
}
