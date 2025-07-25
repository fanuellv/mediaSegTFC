import { useEffect, useState } from 'react';
import axios from 'axios';

interface Notificacao {
    id: number;
    titulo: string;
    cliente:string
    mensagem: string;
    created_at: string;
    lida:boolean;
}

interface Props {
    onFechar: () => void;
}

export default function ModalNotificacoes({ onFechar }: Props) {
    const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
    const [loading, setLoading] = useState(true);

    const marcarComoLida = async (id: number) => {
        try {
            await axios.patch(`/notificacoes/${id}/marcar-lida`, {}, { withCredentials: true });
    
            // Atualiza localmente
            setNotificacoes((prev) =>
                prev.map((n) => (n.id === id ? { ...n, lida: true } : n))
            );
        } catch (err) {
            console.log('Erro ao marcar como lida.');
            console.log(err);
        }
    };
    

    useEffect(() => {
        axios.get('/notificacoes', { withCredentials: true })
            .then((res) => {
                setNotificacoes(res.data);
            })
            .catch(() => {
                alert('Erro ao carregar notificações');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div className="fixed inset-0 z-5 flex items-center justify-center bg-[rgba(0,0,0,0.4)]">


            <div className="w-[90%] max-w-md rounded-lg bg-white p-4 shadow-lg">
                <div className="flex justify-between items-center border-b pb-2 mb-4">
                    <h2 className="text-lg font-bold">Minhas Notificações</h2>
                    <button onClick={onFechar} className="text-black font-bold text-xl">&times;</button>
                </div>

                {loading ? (
                    <p>Carregando...</p>
                ) : notificacoes.length === 0 ? (
                    <p className="text-gray-500">Nenhuma notificação encontrada.</p>
                ) : (
                    <ul className="space-y-3 max-h-[300px] overflow-y-auto">
                        {notificacoes.map((n) => (
                            <li key={n.id} className="rounded border p-3 shadow-sm">
                                <h3 className="font-semibold">{n.titulo}</h3>
                                <p className="text-sm text-gray-600">{n.mensagem}</p>
                                <p className="text-xs text-gray-400 mt-1">
                                    {new Date(n.created_at).toLocaleString('pt-AO')}
                                </p>
                                
                                {!n.lida && (
            <button
                className="mt-2 text-sm text-blue-600 underline hover:text-blue-800"
                onClick={() => marcarComoLida(n.id)}
            >
                Marcar como lida
            </button>
        )}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
