import { DadosSimulacao } from "@/types/DadosSimulacao";
import { useEffect, useState } from "react";
import axios from "axios";

interface Seguradora {
  id: number;
  nome: string;
}

interface Props {
  dados: DadosSimulacao;
  setDados: (novos: Partial<DadosSimulacao>) => void;
  seguradoras: Seguradora[];
  onVoltar: () => void;
  onAvancar: () => void; // ⬅️ nova prop
}

export default function Resultado({
  dados,
  setDados,
  seguradoras,
  onVoltar,
  onAvancar,
}: Props) {
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (dados.plano && dados.seguradora_id) {
      const seguradora = seguradoras.find((s) => s.id === dados.seguradora_id);
      const texto = `${dados.plano.nome}, da seguradora ${seguradora?.nome ?? "Desconhecida"}, ${dados.plano.descricao}`;
      setInfo(texto);
    } else {
      setInfo("");
    }
  }, [dados, seguradoras]);

  const adquirirPlano = async () => {
    setLoading(true);
    try {
      const payload = {
        cliente_id: 1, // ou auth ID real
        tipo_seguro_id: dados.tipo_id,
        valor_calculado: dados.valor,
        status: "simulado", // ou outro valor apropriado
      };

      await axios.post("http://127.0.0.1:8000/simulacao", payload, {
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      });

      alert("Plano adquirido com sucesso!");
      onAvancar(); // ⬅️ avança para página de sucesso/download

      // Reset opcional
      setDados({
        idade: 0,
        fumante: false,
        profissao: "normal",
        seguradora_id: 0,
        tipo_id: 0,
        plano: undefined,
        plano_id: undefined,
        ano_veiculo: undefined,
        tem_franquia: undefined,
        tipo_uso: undefined,
        valor: undefined,
      });
    } catch (err) {
      console.error("❌ Erro ao salvar simulação:", err);
      alert("Erro ao adquirir plano.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col justify-between space-y-6 p-6">
      <div>
        <h2 className="text-lg font-bold text-gray-800">
          O plano selecionado tem um valor estimado de:
        </h2>

        <div className="mt-4 text-4xl font-extrabold text-blue-800">
          {dados.valor?.toLocaleString("pt-AO", {
            style: "currency",
            currency: "AOA",
          }) || "Kz 0,00"}
        </div>

        <p className="mt-2 text-sm italic text-gray-500">
          (Este valor pode variar com base em análise posterior da seguradora.)
        </p>

        {info && <p className="mt-4 text-sm text-gray-700">{info}</p>}
      </div>

      <div className="flex flex-col gap-4 pt-4">
        <button
          className="w-full rounded bg-[#0153A5] p-3 font-semibold text-white transition hover:bg-blue-500 disabled:opacity-60"
          onClick={adquirirPlano}
          disabled={loading}
        >
          {loading ? "Processando..." : "Adquirir Plano"}
        </button>

        <button
          className="w-full rounded bg-gray-300 p-3 font-semibold text-gray-700 transition hover:bg-gray-400"
          onClick={onVoltar}
        >
          Nova Simulação
        </button>
      </div>
    </div>
  );
}
