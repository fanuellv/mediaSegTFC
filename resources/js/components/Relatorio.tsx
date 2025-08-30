import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";

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
  tipo: string;
  total: number;
}

const Relatorio: React.FC = () => {
  const [dados, setDados] = useState<Totais | null>(null);
  const [planosPorSeguradora, setPlanosPorSeguradora] = useState<PlanoPorSeguradora[]>([]);
  const [totalVideos, setTotalVideos] = useState<number>(0);
  const [totalQuizzes, setTotalQuizzes] = useState<number>(0);
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
        const responseVideo = await axios.get("/learning/total-videos", { withCredentials: true });
        const responseJogo = await axios.get("/learning/total-quizzes", { withCredentials: true });

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
          setTotalTipo(responseSimulacaoTipo.data.data);
        }

        if (responseVideo.data.total_videos_assistidos !== undefined) {
          setTotalVideos(responseVideo.data.total_videos_assistidos);
        }

        if (responseJogo.data.total_quizzes_jogadas !== undefined) {
          setTotalQuizzes(responseJogo.data.total_quizzes_jogadas);
        }
      } catch (error) {
        console.error("Erro ao buscar relatório:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotais();
  }, []);

  if (loading) return <p>Carregando...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Cards resumo */}
      <Card className="bg-blue-100">
        <CardHeader>
          <CardTitle>Clientes</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-blue-700">
          {dados?.totalClientes}
        </CardContent>
      </Card>

      <Card className="bg-pink-100">
        <CardHeader>
          <CardTitle>Simulações</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-pink-700">
          {dados?.totalSimulacao}
        </CardContent>
      </Card>

      <Card className="bg-purple-100">
        <CardHeader>
          <CardTitle>Playlists</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-purple-700">
          {dados?.totalPlaylist}
        </CardContent>
      </Card>

      <Card className="bg-yellow-100">
        <CardHeader>
          <CardTitle>Quizzes</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-yellow-700">
          {dados?.totalQuiz}
        </CardContent>
      </Card>

      {/* Gráfico Pizza - Planos por seguradora */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Planos por Seguradora</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer>
            <PieChart>
              <Pie
                data={planosPorSeguradora}
                dataKey="total_planos"
                nameKey="seguradora"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {planosPorSeguradora.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={["#4F46E5", "#EC4899", "#F59E0B", "#10B981", "#3B82F6"][index % 5]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Gráfico Barras - Simulação por Tipo */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Simulações por Tipo</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer>
            <BarChart data={totalTipo}>
              <XAxis dataKey="tipo" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#6366F1" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Vídeos e Quizzes */}
      <Card>
        <CardHeader>
          <CardTitle>Vídeos Assistidos</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-green-600">
          {totalVideos}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quizzes Finalizados</CardTitle>
        </CardHeader>
        <CardContent className="text-3xl font-bold text-red-600">
          {totalQuizzes}
        </CardContent>
      </Card>
    </div>
  );
};

export default Relatorio;
