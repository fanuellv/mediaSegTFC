import { useEffect, useState } from 'react';
import { Seguradora } from '@/types/DadosSimulacao';

interface Plano {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
}

interface Props {
    seguradora: Seguradora | null;
    onVoltar: () => void;
    onAvancar: () => void;
}

export default function Selecionada({ seguradora, onVoltar, onAvancar }: Props) {
    const [planos, setPlanos] = useState<Plano[]>([]);
    const [loading, setLoading] = useState(true);

    async function buscarPlanos() {
        if (!seguradora?.id) return;
    
        setLoading(true); // <-- ADICIONADO AQUI
        
        try {
            const id = seguradora.id;
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
    

    useEffect(() => {
        if (seguradora) {
            buscarPlanos();
        }
    }, [seguradora]);

    if (!seguradora) {
        return (
            <div className="p-4">
                <p className="text-red-500">Nenhuma seguradora selecionada.</p>
                <button onClick={onVoltar} className="mt-2 px-4 py-2 bg-gray-300 rounded">
                    Voltar
                </button>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4 bg-white rounded">
            <div className="flex items-center gap-4">
                {seguradora.foto ? (
                    <img src={`/storage/${seguradora.foto}`} alt={seguradora.nome} className="h-20 w-20 rounded" />
                ) : (
                    <div className="h-20 w-20 bg-gray-200 flex items-center justify-center rounded text-sm">Sem imagem</div>
                )}
                <div>
                    <h2 className="text-xl font-bold">{seguradora.nome}</h2>
                    <p className="text-sm text-gray-600">{seguradora.descricao}</p>
                </div>
            </div>

            <div>
                <h3 className="text-lg font-semibold mb-2">Planos disponíveis</h3>
                {loading ? (
                    <p>Carregando planos...</p>
                ) : planos.length === 0 ? (
                    <p className="text-gray-500">Nenhum plano cadastrado para esta seguradora.</p>
                ) : (
                    <ul className="space-y-2">
                        {planos.map((plano) => (
                            <li key={plano.id} className="border p-3 rounded bg-gray-50">
                                <strong>{plano.nome}</strong>
                                <p className="text-sm text-gray-600">{plano.descricao}</p>
                                <p className="text-sm font-semibold text-[#0153A5]">Kz {plano.preco}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div className="flex justify-between mt-4">
                <button onClick={onVoltar} className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300">Voltar</button>
                <button onClick={onAvancar} className="px-4 py-2 text-sm bg-[#0153A5] text-white rounded hover:bg-blue-600">Avançar</button>
            </div>
        </div>
    );
}
