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
    <div className="flex gap-4 overflow-x-auto pb-2 flex-nowrap"
    style={{
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // IE 10+
    }}>
      {playlists.map((playlist) => {
        const primeiroVideo = playlist.url_videos?.[0];
        const videoId = primeiroVideo ? extrairVideoId(primeiroVideo) : null;
        const thumbnail = videoId
          ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
          : null;

        return (
          <div
            key={playlist.id}
            className="relative sm:w-70 w-55 sm:h-100 h-90 flex-shrink-0 rounded overflow-hidden cursor-pointer hover:opacity-90"
            onClick={() => onSelecionar(playlist)}
          >
            {thumbnail && (
              <img
                src={thumbnail}
                alt={`Thumbnail do vídeo da playlist ${playlist.nome}`}
                className="w-full h-110 object-cover bg-center"
              />
            )}

            <div className="absolute inset-0 bg-gray-700/40 flex items-end">
              <div className="p-3">
                <p className="text-white font-bold text-base truncate">{playlist.nome}</p>
                <p className="text-white text-sm truncate">{playlist.autor}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
