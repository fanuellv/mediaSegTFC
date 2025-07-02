import { DadosSimulacao } from "@/types/DadosSimulacao";

interface Props {
  dados: DadosSimulacao;
  onVoltar: () => void;
}

export default function Resultado({ dados, onVoltar }: Props) {
  return (
    <div className="space-y-4 text-center">
      <h2 className="text-xl font-bold text-green-600">Cotação Realizada com Sucesso!</h2>

      <p className="text-gray-700">
        O plano selecionado tem um valor estimado de:
      </p>

      <div className="text-4xl font-extrabold text-blue-800">
        {dados.valor?.toLocaleString("pt-AO", {
          style: "currency",
          currency: "AOA",
        }) || "Kz 0,00"}
      </div>

      <p className="text-sm text-gray-500 italic">
        (Este valor pode variar com base em análise posterior da seguradora.)
      </p>

      <div className="flex flex-col gap-4 mt-6">
        <button
          className="w-full rounded bg-blue-600 p-3 font-semibold text-white transition hover:bg-blue-700"
          onClick={() => alert("Plano adquirido com sucesso!")}
        >
          Adquirir Plano
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
