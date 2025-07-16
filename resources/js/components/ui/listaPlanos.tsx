import { useEffect, useState } from 'react';

interface PlanoData {
    id: number;
    nome: string;
    descricao: string;
    valor: number;
    duracao: string;
    seguradora_id?: number;
    seguradora?: {
        nome: string;
        foto?: string;
    };
}

export default function ListaPlanos() {
    const [planos, setPlanos] = useState<PlanoData[]>([]);
    const [loading, setLoading] = useState(true);

    async function buscarPlanos() {
        try {
            const res = await fetch('/planos');
            const dados = await res.json();
            setPlanos(dados);
        } catch (error) {
            console.error('Erro ao buscar planos:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        buscarPlanos();
    }, []);

    if (loading) {
        return (
            <div className="flex h-40 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {planos.map((plano) => (
                <div key={plano.id} className="flex items-center gap-4 border-b bg-white p-4  hover:shadow-md space-y-4">
                    {/* Foto da seguradora (se houver) */}
                    <div className="h-15 w-15 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                        {plano.seguradora?.foto ? (
                            <img src={`/storage/${plano.seguradora.foto}`} alt={plano.seguradora.nome} className="h-full w-full object-cover" />
                        ) : (
                            <div className="flex h-full w-full items-center justify-center text-sm text-gray-400">Sem Foto</div>
                        )}
                    </div>

                    {/* Informações do plano */}
                    <div className="flex-1">
                        <h2 className="text-lg font-bold text-gray-800">{plano.nome}</h2>
                        <p className="text-xs text-gray-500">
                            {plano.descricao} • {plano.duracao}
                        </p>
                        {/* Ação */}
                        <div className='flex gap-4 mt-2'>
                        Kz {new Intl.NumberFormat('pt-AO', { maximumFractionDigits: 0 }).format(plano.valor)}

                            <button className="text-sm rounded-lg bg-[#0153A5] px-4 py-2 text-white hover:bg-blue-600">Adquirir</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
