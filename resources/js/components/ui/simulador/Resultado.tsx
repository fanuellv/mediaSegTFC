import { DadosSimulacao } from '@/types/DadosSimulacao';
import axios from 'axios';
import { useEffect, useState } from 'react';

interface Seguradora {
    id: number;
    nome: string;
}

interface Props {
    dados: DadosSimulacao;
    setDados: (novos: Partial<DadosSimulacao>) => void;
    seguradoras: Seguradora[];
    onVoltar: () => void;
    onAvancar: () => void; // ⬅️ nova prop
}

export default function Resultado({ dados, setDados, seguradoras, onVoltar, onAvancar }: Props) {
    const [info, setInfo] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (dados.plano && dados.seguradora_id) {
            const seguradora = seguradoras.find((s) => s.id === dados.seguradora_id);
            const texto = `${dados.plano.nome}, da seguradora ${seguradora?.nome ?? 'Desconhecida'}, ${dados.plano.descricao}`;
            setInfo(texto);
        } else {
            setInfo('');
        }
    }, [dados, seguradoras]);

    const adquirirPlano = async () => {
        setLoading(true);
        try {
            // 1. Salvar simulação
            const payload = {
                //cliente_id: 1, // ou pegar do auth
                tipo_seguro_id: dados.tipo_id,
                valor_calculado: dados.valor,
                status: 'simulado',
                plano_id: dados.plano?.id, // ⬅️ adiciona isso

                // ✅ Inclui os dados de automóvel (mesmo que estejam vazios)
                marca_modelo: dados.marca_modelo || null,
                matricula: dados.matricula || null,
                valor_veiculo: dados.valor_veiculo || null,
                ano_veiculo: dados.ano_veiculo || null,
                tipo_uso: dados.tipo_uso || null,
                tem_franquia: dados.tem_franquia ?? false, // <- cuidado com boolean
            };
            console.log('Plano ID:', dados.plano?.id);
            console.log(payload);

            const simulacaoResponse = await axios.post('/simulacao', payload, {
                headers: {
                    Accept: 'application/json',
                },
                withCredentials: true,
            });

            const simulacao = simulacaoResponse.data;
            console.log('✅ ID da simulação retornada:', simulacao.id);

            // 2. Gerar PDF
            const gerarResponse = await axios.post(
                `/apolice/pdf/gerar/${simulacao.id}`,
                {},
                {
                    headers: {
                        Accept: 'application/json',
                    },
                    withCredentials: true,
                },
            );

            const { documento_url } = gerarResponse.data;

            // 3. Salvar URL no estado global para próximo componente (se quiser)
            setDados({
                ...dados,
                apolice_id: simulacao.id,
                documento_url,
            });

            //alert('Plano adquirido e documento gerado!');
            onAvancar();
        } catch (err) {
            console.error('❌ Erro ao adquirir plano ou gerar documento:', err);
            //alert('Erro ao adquirir o plano ou gerar o PDF.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative flex h-full w-full flex-col justify-between space-y-6 p-6">
            <div>
                <h2 className="text-lg font-bold text-gray-800">O plano selecionado tem um valor estimado de:</h2>

                <div className="mt-4 text-4xl font-extrabold text-blue-800">
                    {dados.valor?.toLocaleString('pt-AO', {
                        style: 'currency',
                        currency: 'AOA',
                    }) || 'Kz 0,00'}
                </div>

                <p className="mt-2 text-sm text-gray-500 italic">(Este valor pode variar com base em análise posterior da seguradora.)</p>

                {info && <p className="mt-4 text-sm text-gray-700">{info}</p>}
            </div>

            <div className="flex flex-col gap-4 pt-4">
                <button
                    className="w-full rounded bg-[#0153A5] p-3 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60"
                    onClick={adquirirPlano}
                    disabled={loading}
                >
                    {loading ? 'Processando...' : 'Adquirir Plano'}
                </button>

                <button className="w-full rounded bg-gray-300 p-3 font-semibold text-gray-700 transition hover:bg-gray-400" onClick={onVoltar}>
                    Nova Simulação
                </button>
            </div>
        </div>
    );
}
