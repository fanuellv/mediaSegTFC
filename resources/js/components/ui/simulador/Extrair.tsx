import { DadosSimulacao } from "@/types/DadosSimulacao";
import { useState } from "react";

interface Props {
  dados: DadosSimulacao;
  onVoltar: () => void;
}

export default function Extrair({ dados, onVoltar }: Props) {
  const [carregando, setCarregando] = useState(false);

  const extrairDocumento = async () => {
    try {
      setCarregando(true);

      const response = await fetch(`http://127.0.0.1:8000/apolice/pdf/${dados.simulacao_id}`, {
        method: "GET",
        headers: {
          Accept: "application/pdf",
        },
      });
      

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "apolice-fatura.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();

    } catch (err) {
      console.error("❌ Erro ao gerar PDF:", err);
      alert("Erro ao gerar o documento.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="relative flex h-full w-full flex-col justify-between space-y-6 p-6">
      <div className="text-center space-y-2">
        <h2 className="text-xl font-bold text-gray-800">Documento Pronto</h2>
        <p className="text-sm text-gray-500">
          Clique abaixo para extrair a Apólice e Fatura.
        </p>
      </div>

      <div className="flex flex-col gap-4 pt-4">
        <button
          className="w-full rounded bg-[#0153A5] p-3 font-semibold text-white transition hover:bg-blue-500"
          onClick={extrairDocumento}
          disabled={carregando}
        >
          {carregando ? "Gerando PDF..." : "Extrair Apólice e Fatura"}
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
