import { Playlist } from '@/types/Playlist';
import { useState } from 'react';

interface Props {
    playlist: Playlist;
    onVoltar: () => void;
}

export default function PlaylistViewer({ playlist, onVoltar }: Props) {
    const [videoAtualIndex, setVideoAtualIndex] = useState(0);

    const videoId = extrairVideoId(playlist.url_videos[videoAtualIndex]);

    function extrairVideoId(url: string): string | null {
        const match = url.match(/(?:youtu\.be\/|v=)([^&]+)/);
        return match ? match[1] : null;
    }

    return (
        <div className="flex h-full w-full flex-col gap-4 rounded-2xl bg-white p-4 sm:h-[88vh]">
            {/* Área principal com vídeo e lista lateral */}
            <div className="flex flex-1 sm:flex-row flex-col gap-4 overflow-hidden">
                {/* Vídeo principal */}
                <div className="flex-1 overflow-hidden rounded-lg bg-black">
                    {videoId ? (
                        <iframe src={`https://www.youtube.com/embed/${videoId}`} className="h-full w-full" title="YouTube player" allowFullScreen />
                    ) : (
                        <p className="p-4 text-red">Vídeo inválido</p>
                    )}
                </div>

                {/* Outros vídeos */}
                <div className="sm:w-1/4 w-full space-y-2 overflow-y-auto">
                    <h3 className="mb-2 text-lg font-semibold">Lista de Vídeos</h3>

                    <div className='flex sm:flex-col'>
                    {playlist.url_videos.map((url, index) => {
                        const videoId = extrairVideoId(url);
                        const thumbnail = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;

                        return (
                            <button
                                key={index}
                                onClick={() => setVideoAtualIndex(index)}
                                className={`w-full overflow-hidden rounded border text-left ${
                                    index === videoAtualIndex ? 'border-[#0153A5]' : 'hover:shadow'
                                }`}
                            >
                                {thumbnail && <img src={thumbnail} alt={`Vídeo ${index + 1}`} className="h-20 w-full object-cover" />}
                                <div className="p-2">
                                    <p className="text-sm font-medium">Aula {index + 1}</p>
                                    <p className="truncate text-xs text-gray-500">{url}</p>
                                </div>
                            </button>
                        );
                    })}
                    </div>
                </div>
            </div>

            {/* Informações da playlist */}
            <div className="mb-20 sm:mb-0 rounded bg-gray-100 p-4">
                <div className="mb-2 flex items-center justify-between">
                    <h2 className="text-xl font-semibold first-letter:uppercase">{playlist.nome}</h2>
                    <button onClick={onVoltar} className="bg-[#0153A5] text-white p-2 font-bold hover:underline rounded ">
                        ← Voltar
                    </button>
                </div>
                <p className="text-sm text-gray-700">@{playlist.autor}</p>
                <p className="mt-2 text-sm text-gray-600">{playlist.descricao}</p>
            </div>
        </div>
    );
}
