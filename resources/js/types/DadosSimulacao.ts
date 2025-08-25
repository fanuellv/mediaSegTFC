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
export interface Seguradora {
  id: number;
  nome: string;
  nif: string;
  telefone: string;
  endereco: string;
  descricao: string;
  foto: string | null;
  }
  
  export interface Dependente {
    nome: string;
    idade: number;
    fumante: boolean;
  }
  export interface DadosSimulacao {
    tipo: "vida" | "saude" | "automovel";
    idade: number;
    fumante: boolean;
    profissao?: "normal" | "risco";
    seguradora_id: number;
    tipo_id: number;
  
    plano?: Plano;
    plano_id?: number; // ✅ Agora suportado para integração no backend
    
    cliente_id?: number;
    
    
    dependentes?: Dependente[]; 
  
    // Resultado
    valor?: number;

    simulacao_id?: number;

    apolice_id?: number;

    documento_url?:string;

    // Automóvel
  ano_veiculo?: number;
  tem_franquia?: boolean;
  tipo_uso?: "pessoal" | "comercial";
  marca_modelo?: string;
  valor_veiculo?: number;
  matricula?: string;
  }
  