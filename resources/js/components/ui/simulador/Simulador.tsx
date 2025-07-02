import { useState } from "react";
import SimuladorPlanoForm from "./simuladorPlano";
import Cotacao from "./Cotacao";
import Resultado from "./Resultado";
import { DadosSimulacao } from "@/types/DadosSimulacao";

export default function Simulador() {
  const [etapa, setEtapa] = useState(1);

  const [dados, setDados] = useState<DadosSimulacao>({
    tipo: "vida",            // será ajustado com base no plano selecionado
    idade: 30,
    fumante: false,
    profissao: "normal",
    seguradora_id: 1,
    tipo_id: 1,
    // plano_id e plano serão preenchidos na etapa 1
  });

  // Função auxiliar para atualizar dados sem sobrescrever tudo
  const atualizar = (novosDados: Partial<DadosSimulacao>) => {
    setDados((prev) => ({
      ...prev,
      ...novosDados,
    }));
  };

  return (
    <div className="w-full rounded-xl">
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
          onVoltar={() => setEtapa(2)}
        />
      )}
    </div>
  );
}
