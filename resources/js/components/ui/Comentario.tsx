import { router } from '@inertiajs/react';
import { useState } from 'react';

interface ComentarioModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ComentarioModal({ isOpen, onClose }: ComentarioModalProps) {
    const [mensagem, setMensagem] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        router.post(
            '/comentarios',
            { mensagem },
            {
                onSuccess: () => {
                    setFeedback('Comentário enviado com sucesso!');
                    setMensagem('');
                    setTimeout(() => {
                        setFeedback('');
                        onClose(); // fecha o modal após enviar
                    }, 1500);
                },
                onError: (errors: Partial<Record<string, string>>) => {
                    setFeedback(errors.mensagem || 'Erro ao enviar comentário.');
                },
            },
        );
        onClose(); // fecha o modal após enviar
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-all duration-300">
            <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-xl">
                {/* Cabeçalho */}
                <div className="mb-4 flex items-center justify-between border-b pb-2">
                    <h2 className="text-lg font-semibold text-gray-800">🗨️ Deixe um Comentário</h2>
                    <button
                        onClick={onClose}
                        className="text-2xl font-bold text-gray-400 transition-colors hover:text-red-500"
                        aria-label="Fechar modal"
                    >
                        &times;
                    </button>
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    {feedback && <p className="rounded border border-green-200 bg-green-50 p-2 text-sm text-green-700">{feedback}</p>}

                    <textarea
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        placeholder="Escreva sua experiência aqui..."
                        className="w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-3 text-sm text-gray-800 shadow-inner outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                        rows={4}
                    />

                    {/* Botões */}
                    <div className="flex justify-end gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="rounded-md bg-[#0153A5] px-4 py-2 text-sm text-white transition hover:bg-blue-700">
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
