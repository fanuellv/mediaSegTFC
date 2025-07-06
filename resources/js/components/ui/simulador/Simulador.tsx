import { useEffect, useState } from "react";
import SimuladorPlanoForm from "./simuladorPlano";
import Cotacao from "./Cotacao";
import Resultado from "./Resultado";
import { DadosSimulacao } from "@/types/DadosSimulacao";
import axios from "axios";

interface Seguradora {
  id: number;
  nome: string;
}

export default function Simulador() {
  const [etapa, setEtapa] = useState(1);
  const [seguradoras, setSeguradoras] = useState<Seguradora[]>([]);

  const [dados, setDados] = useState<DadosSimulacao>({
    tipo: "vida",
    idade: 30,
    fumante: false,
    profissao: "normal",
    seguradora_id: 1,
    tipo_id: 1,
  });

  // Atualizador de estado parcial
  const atualizar = (novosDados: Partial<DadosSimulacao>) => {
    setDados((prev) => ({
      ...prev,
      ...novosDados,
    }));
  };

  // Carregar seguradoras uma vez
  useEffect(() => {
    const buscarSeguradoras = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/seguradoras");
        setSeguradoras(response.data);
      } catch (error) {
        console.error("Erro ao carregar seguradoras", error);
      }
    };

    buscarSeguradoras();
  }, []);

  return (
    <div className="h-full flex flex-col rounded-xl">
      {etapa === 1 && (
        <SimuladorPlanoForm
          onAvancar={() => setEtapa(2)}
          setDados={atualizar}
        />
      )}

      {etapa === 2 && (
        <Cotacao
          dados={dados}
          setDados={atualizar}
          onVoltar={() => setEtapa(1)}
          onAvancar={() => setEtapa(3)}
        />
      )}

      {etapa === 3 && (
        <Resultado
          dados={dados}
          setDados={atualizar}
          seguradoras={seguradoras}
          onVoltar={() => setEtapa(2)}
        />
      )}
    </div>
  );
}
