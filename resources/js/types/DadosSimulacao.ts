export interface Plano {
    id: number;
    nome: string;
    descricao?: string;     // ← opcional, caso nem todos os planos tenham descrição
    duracao?: string;       // ← idem
    valor?: string;         // ← renomeável para `preco_base`, se preferir
  
    seguradora_id: number;
    tipo_id: number;
  
    preco_base?: number;    // ← pode coexistir com "valor" até unificar os nomes
    tipo?: {
      id: number;
      nome: string;
    };
  }
  
  
  export interface DadosSimulacao {
    tipo: "vida" | "saude" | "automovel";
    idade: number;
    fumante: boolean;
    profissao: "normal" | "risco";
    seguradora_id: number;
    tipo_id: number;
  
    plano?: Plano;
    plano_id?: number; // ✅ Agora suportado para integração no backend
  
    // Campos para seguro automóvel
    ano_veiculo?: number;
    tem_franquia?: boolean;
    tipo_uso?: "pessoal" | "comercial";
  
    // Resultado
    valor?: number;
  }
  