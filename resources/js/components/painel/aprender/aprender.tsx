import { useEffect, useState } from "react";
import axios from 'axios';

interface Playlist {
    id: number;
    titulo: string;
    autor: string;
}

interface Quiz {
    id: number;
    titulo: string;
    descricao: string;
}

export default function Aprender() {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);

    useEffect(() => {
        axios.get('/playlists').then(res => setPlaylists(res.data));
        axios.get('/quizzes').then(res => setQuizzes(res.data));
    }, []);

    return (
        <div className="flex w-full bg-white rounded-2xl p-4 flex-col gap-4 sm:h-[88vh]">
            <h1 className="font-bold text-black">Encontre os melhores Conteúdos</h1>
            <div
                className="grid grid-cols-1 gap-6 sm:grid-cols-[3fr_1fr] scrollbar-thin scrollbar-thumb-gray-300 flex-1 overflow-y-auto pr-1"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                <div className="grid grid-rows-2 gap-4">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Playlists</h2>
                        {playlists.map((p) => (
                            <div key={p.id} className="mb-4 p-3 border rounded">
                                <p className="font-bold">{p.titulo}</p>
                                <p className="text-sm text-gray-600">{p.autor}</p>
                            </div>
                        ))}
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold mb-2">Quizzes</h2>
                        {quizzes.map((q) => (
                            <div key={q.id} className="mb-4 p-3 border rounded">
                                <p className="font-bold">{q.titulo}</p>
                                <p className="text-sm text-gray-600">{q.descricao}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-gray-100 rounded-2xl p-4 shadow">
                    <h2 className="font-semibold">Continuar a ver</h2>
                    {/* Conteúdo futuro para continuar onde parou */}
                </div>
            </div>
        </div>
    );
}
