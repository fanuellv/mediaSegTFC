import { Seguradora } from '@/types/DadosSimulacao';
import { useEffect, useState } from 'react';
interface SeguradoraData {
    id: number;
    nome: string;
    nif: string;
    telefone: string;
    endereco: string;
    descricao: string;
    foto: string | null;
}

interface Props {
    onAvancar?: () => void;
    setSeguradora?: React.Dispatch<React.SetStateAction<Seguradora | null>>;
}

export default function ListSeguradora({ onAvancar, setSeguradora }: Props) {
    const [lista, setLista] = useState<SeguradoraData[]>([]);
    const [loading, setLoading] = useState(true);

    async function buscarSeguradoras() {
        try {
            setLoading(true);
            console.log('🔍 Buscando seguradoras...');
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            
            const response = await fetch('/seguradoras', {
                method: 'GET', // Usa GET aqui, a não ser que a tua rota exija POST para listagem
                headers: {
                    Accept: 'application/json',
                    'X-CSRF-TOKEN': token || '',
                },
                credentials: 'include', //para manter autenticado
            });

            if (!response.ok) {
                const erro = await response.text();
                console.error('❌ Erro na resposta:', erro);
                return;
            }

            const dados = await response.json();
            console.log('✅ Seguradoras encontradas:', dados);
            setLista(dados);
        } catch (error) {
            console.error('❌ Erro ao buscar seguradoras:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        buscarSeguradoras();
    }, []);

    if (loading) {
        return (
            <div className="flex h-full w-full items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
            </div>
        );
    }

    return (
        <>
            {loading ? (
                <div className="flex h-full w-full items-center justify-center rounded bg-white">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
                </div>
            ) : (
                <div className="w-full overflow-x-hidden rounded bg-white">
                    <ul className="divide-y">
                        {lista.map((seguradora) => (
                            <li
                                key={seguradora.id}
                                className="flex flex-col gap-4 px-2 py-4 hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded bg-gray-100">
                                        {seguradora.foto ? (
                                            <img src={`/storage/${seguradora.foto}`} alt={seguradora.nome} className="h-full w-full object-contain" />
                                        ) : (
                                            <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">Sem imagem</div>
                                        )}
                                    </div>

                                    <div>
                                        <strong className="block text-black text-base sm:text-lg">{seguradora.nome}</strong>
                                        <span className="text-sm text-gray-600">{seguradora.descricao}</span>
                                    </div>
                                </div>

                                <div className="sm:ml-auto sm:self-center">
                                    <button
                                        onClick={() => {
                                            if (setSeguradora) setSeguradora(seguradora);
                                            if (onAvancar) onAvancar();
                                        }}
                                        className="w-full rounded bg-[#0153A5] px-4 py-2 text-sm text-white hover:bg-blue-600 sm:w-auto"
                                    >
                                        Ver mais
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}
