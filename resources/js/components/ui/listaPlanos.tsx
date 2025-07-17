import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react'; // ou 'inertiajs/inertia' se for essa a sua versão

interface PlanoData {
    id: number;
    nome: string;
    descricao: string;
    valor: number;
    duracao: string;
    seguradora_id?: number;
    foto?: string;
    seguradora?: {
        nome: string;
        foto?: string;
    };
}

export default function ListaPlanos() {
    const [planos, setPlanos] = useState<PlanoData[]>([]);
    const [loading, setLoading] = useState(true);

    function adquirir(plano: PlanoData) {
        if (!plano || !plano.seguradora_id) {
            alert('Este plano não está associado a uma seguradora.');
            return;
        }

        router.get('/dashboard/pagamentos', {
            seguradora_id: plano.seguradora_id,
            plano_id: plano.id,
        });
    }

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
                <div key={plano.id} className="flex items-center gap-4 border-b bg-white p-4 hover:shadow-md space-y-4">
                    {/* Foto da seguradora (se houver) */}
                    <div className="h-15 w-15 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                        {plano.foto ? (
                            <img
                                src={`/storage/${plano.foto}`}
                                alt={`Imagem do plano ${plano.nome}`}
                                className="h-full w-full object-cover"
                            />
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

                        <div className="flex gap-4 mt-2">
                            <p className="text-[#0153A5] font-bold">
                                Kz {new Intl.NumberFormat('pt-AO', { minimumFractionDigits: 2 }).format(plano.valor)}
                            </p>

                            <button
                                onClick={() => adquirir(plano)}
                                className="text-sm rounded-lg bg-[#0153A5] px-4 py-2 text-white hover:bg-blue-600"
                            >
                                Adquirir
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
