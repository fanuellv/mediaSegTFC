import React, { useEffect, useState } from "react";
import axios from "axios";

interface Totais {
  totalClientes?: number;
  totalSimulacao?: number;
  totalSeguradora?: number;
  totalPlaylist?: number;
  totalQuiz?: number;
}

interface PlanoPorSeguradora {
  seguradora: string;
  total_planos: number;
}

interface TotalTipo {
  tipo: string; // <- ajustado para bater com o retorno da API
  total: number;
}

const Relatorio: React.FC = () => {
  const [dados, setDados] = useState<Totais | null>(null);
  const [planosPorSeguradora, setPlanosPorSeguradora] = useState<PlanoPorSeguradora[]>([]);
  const [totalTipo, setTotalTipo] = useState<TotalTipo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTotais = async () => {
      try {
        const response = await axios.get("/totalClientes", { withCredentials: true });
        const responseSimulacao = await axios.get("/totalSimulacao", { withCredentials: true });
        const responseSimulacaoTipo = await axios.get("/totalSimulacaoTipo", { withCredentials: true });
        const responseSeguradora = await axios.get("/totalSeguradora", { withCredentials: true });
        const responsePlaylist = await axios.get("/totalPlaylist", { withCredentials: true });
        const responseQuiz = await axios.get("/totalQuiz", { withCredentials: true });
        const responsePlanos = await axios.get("/total/por-seguradora", { withCredentials: true });

        console.log("Resposta da API:", {
          clientes: response.data,
          simulacoes: responseSimulacao.data,
          simulacaoTipo: responseSimulacaoTipo.data,
          seguradoras: responseSeguradora.data,
          planos: responsePlanos.data,
          playlist: responsePlaylist.data,
          quiz: responseQuiz.data,
        });

        setDados({
          totalClientes: response.data.total_clientes,
          totalSimulacao: responseSimulacao.data.total_simulacao,
          totalSeguradora: responseSeguradora.data.total_seguradora,
          totalPlaylist: responsePlaylist.data.total_playlist,
          totalQuiz: responseQuiz.data.total_quiz,
        });

        if (responsePlanos.data.status === "success") {
          setPlanosPorSeguradora(responsePlanos.data.data);
        }

        if (responseSimulacaoTipo.data.status === "success") {
          setTotalTipo(responseSimulacaoTipo.data.data); // <- agora vai pro estado certo
        }
      } catch (error) {
        console.error("Erro ao buscar relatório:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotais();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Relatório</h1>

      {dados ? (
        <div className="bg-white rounded-lg shadow-md p-4">
          <p className="text-lg text-black">
            <strong>Total de Clientes: {dados.totalClientes}</strong>
          </p>
          <p className="text-lg text-black">
            <strong>Total de Simulações: {dados.totalSimulacao}</strong>
          </p>

          <h2 className="text-lg font-semibold mt-4">📊 Simulação por Tipo</h2>
          <ul className="list-disc pl-5">
            {totalTipo.length > 0 ? (
              totalTipo.map((item, index) => (
                <li key={index} className="text-black">
                  {item.tipo}: <strong>{item.total}</strong>
                </li>
              ))
            ) : (
              <li className="text-gray-500">Nenhuma simulação encontrada</li>
            )}
          </ul>

          <p className="text-lg text-black mt-4">
            <strong>Total de Seguradoras: {dados.totalSeguradora}</strong>
          </p>

          <h2 className="text-lg font-semibold mt-4">📊 Planos por Seguradora</h2>
          <ul className="list-disc pl-5">
            {planosPorSeguradora.length > 0 ? (
              planosPorSeguradora.map((item, index) => (
                <li key={index} className="text-black">
                  {item.seguradora}: <strong>{item.total_planos}</strong>
                </li>
              ))
            ) : (
              <li className="text-gray-500">Nenhum plano encontrado</li>
            )}
          </ul>
          <p className="text-lg text-black mt-4">
            <strong>Total de PlayList: {dados.totalPlaylist}</strong>
          </p>
          <p className="text-lg text-black mt-4">
            <strong>Total de Quiz: {dados.totalQuiz}</strong>
          </p>

        </div>
      ) : (
        <p>Nenhum dado encontrado.</p>
      )}
    </div>
  );
};

export default Relatorio;
