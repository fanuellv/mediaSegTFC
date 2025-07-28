export interface Pergunta {
    id: number;
    quiz_id: number;
    pergunta: string;
    alternativas: string[];
    correta: string;
  }
  
  export interface Quiz {
    id: number;
    titulo: string;
    perguntas: Pergunta[];
  }
  