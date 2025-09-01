import React, { useEffect, useState } from "react";
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
        const getJSON = async (url: string) => {
          const res = await fetch(url, { credentials: "include" });
          if (!res.ok) throw new Error(`Erro ao buscar ${url}`);
          return res.json();
        };

        const [
          clientes,
          simulacao,
          simulacaoTipo,
          seguradora,
          playlist,
          quiz,
          planos,
          videos,
          jogos,
        ] = await Promise.all([
          getJSON("/totalClientes"),
          getJSON("/totalSimulacao"),
          getJSON("/totalSimulacaoTipo"),
          getJSON("/totalSeguradora"),
          getJSON("/totalPlaylist"),
          getJSON("/totalQuiz"),
          getJSON("/total/por-seguradora"),
          getJSON("/learning/total-videos"),
          getJSON("/learning/total-quizzes"),
        ]);

        setDados({
          totalClientes: clientes.total_clientes,
          totalSimulacao: simulacao.total_simulacao,
          totalSeguradora: seguradora.total_seguradora,
          totalPlaylist: playlist.total_playlist,
          totalQuiz: quiz.total_quiz,
        });

        if (planos.status === "success") {
          setPlanosPorSeguradora(planos.data);
        }

        if (simulacaoTipo.status === "success") {
          setTotalTipo(simulacaoTipo.data);
        }

        if (videos.total_videos_assistidos !== undefined) {
          setTotalVideos(videos.total_videos_assistidos);
        }

        if (jogos.total_quizzes_jogadas !== undefined) {
          setTotalQuizzes(jogos.total_quizzes_jogadas);
        }
      } catch (error) {
        console.error("Erro ao buscar relatório:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTotais();
  }, []);

  if (loading) return <div className="flex h-full items-center justify-center">
  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
</div>;

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
                  <Cell
                    key={`cell-${index}`}
                    fill={["#4F46E5", "#EC4899", "#F59E0B", "#10B981", "#3B82F6"][index % 5]}
                  />
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
