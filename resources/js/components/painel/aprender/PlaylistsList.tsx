import { Playlist } from '@/types/Playlist';

interface Props {
  playlists: Playlist[];
  onSelecionar: (playlist: Playlist) => void;
}

function extrairVideoId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|v=)([^&]+)/);
  return match ? match[1] : null;
}

export default function PlaylistsList({ playlists, onSelecionar }: Props) {
  return (
    <div className='flex gap-4'>
      {playlists.map((playlist) => {
        const primeiroVideo = playlist.url_videos?.[0];
        const videoId = primeiroVideo ? extrairVideoId(primeiroVideo) : null;
        const thumbnail = videoId
          ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
          : null;

        return (
            <div
            key={playlist.id}
            className="relative w-70 rounded overflow-hidden mb-3 cursor-pointer hover:opacity-90"
            onClick={() => onSelecionar(playlist)}
          >
            {thumbnail && (
              <img
                src={thumbnail}
                alt="Thumbnail"
                className="w-full h-100 object-cover bg-center"
              />
            )}
          
            {/* Camada escura sobre a imagem */}
            <div className="absolute inset-0 bg-gray-700/40 flex items-end">
              <div className="p-3">
                <p className="text-white font-bold text-lg">{playlist.nome}</p>
                <p className="text-white text-sm">{playlist.autor}</p>
              </div>
            </div>
          </div>
          
        );
      })}
    </div>
  );
}
