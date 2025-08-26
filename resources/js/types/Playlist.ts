export interface Playlist {
    id: number;
    nome: string;
    autor: string;
    descricao:string;
    tumb?: string;
    url_videos: string[]; // ou string se for 1 link apenas
  }
  