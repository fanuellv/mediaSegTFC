export interface Playlist {
    id: number;
    nome: string;
    autor: string;
    descricao: string;
    url_videos: string[]; // Certifique-se que o back-end retorna isso como array
  }
  
  export interface Quiz {
    id: number;
    titulo: string;
    descricao: string;
  }
  