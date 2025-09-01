import { useEffect, useState, useCallback } from 'react';
import { router, usePage } from '@inertiajs/react';

interface Plano {
  id: number;
  nome: string;
  valor: number;
  descricao: string;
  foto?: string | null;
}

interface Seguradora {
  id: number;
  nome: string;
  descricao: string;
  foto?: string | null;
}

export default function SelecionadaPorRota() {
  const { props, url } = usePage();
  const seguradoraId = props.seguradora_id as number | undefined;

  const [seguradora, setSeguradora] = useState<Seguradora | null>(null);
  const [planos, setPlanos] = useState<Plano[]>([]);
  const [loading, setLoading] = useState(true);

  const buscarSeguradora = useCallback(async () => {
    if (!seguradoraId) return;
    try {
      const res = await fetch(`/dashboard/seguradoras/${seguradoraId}`);
      if (!res.ok) throw new Error('Erro ao buscar seguradora');
      const data = await res.json();
      setSeguradora(data);
    } catch (e) {
      console.error('Erro ao buscar seguradora:', e);
    }
  }, [seguradoraId]);

  const buscarPlanos = useCallback(async () => {
    if (!seguradoraId) return;
    try {
      const res = await fetch(`/planos?seguradora_id=${seguradoraId}`);
      if (!res.ok) throw new Error('Erro ao buscar planos');
      const data = await res.json();
      setPlanos(data);
    } catch (e) {
      console.error('Erro ao buscar planos:', e);
    } finally {
      setLoading(false);
    }
  }, [seguradoraId]);

  useEffect(() => {
    if (url.includes('/dashboard/seguros/seguradora')) {
      buscarSeguradora();
      buscarPlanos();
    }
  }, [buscarSeguradora, buscarPlanos, url]);

  function adquirir(plano: Plano) {
    router.get('/dashboard/pagamentos', {
      seguradora_id: seguradoraId,
      plano_id: plano.id,
    });
  }

  function voltar() {
    router.get('/dashboard/seguros');
  }

  if (loading || !seguradora) {
    return (
      <div className="flex h-40 items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="w-full h-full space-y-6 bg-white rounded-2xl p-4">
      <div className="flex items-center gap-4 border-b pb-4">
        <div className="h-20 w-20 overflow-hidden rounded bg-gray-100">
          {seguradora.foto ? (
            <img src={`/storage/${seguradora.foto}`} alt={seguradora.nome} className="h-full w-full object-contain" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">Sem imagem</div>
          )}
        </div>
        <div>
          <h2 className="text-xl font-bold">{seguradora.nome}</h2>
          <p className="text-sm text-gray-600">{seguradora.descricao}</p>
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg text-black font-semibold">Planos disponíveis</h3>
        {planos.length === 0 ? (
          <p className="text-gray-500">Nenhum plano cadastrado para esta seguradora.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
            {planos.map((plano) => (
              <div key={plano.id} className="flex gap-4 rounded border-gray-50 bg-gray-100 p-4">
                <div className="h-20 w-20 overflow-hidden rounded bg-gray-100">
                  {plano.foto ? (
                    <img src={`/storage/${plano.foto}`} alt={plano.nome} className="h-full w-full object-contain" />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">Sem imagem</div>
                  )}
                </div>
                <div className="flex w-full flex-col justify-between">
                  <div>
                    <h4 className="text-base font-semibold">{plano.nome}</h4>
                    <p className="text-sm text-gray-600">{plano.descricao}</p>
                    <p className="mt-1 text-sm font-semibold text-[#0153A5]">
                      Kz {new Intl.NumberFormat('pt-AO', { minimumFractionDigits: 2 }).format(plano.valor)}
                    </p>
                  </div>
                  <div className="mt-2 self-end">
                    <button
                      onClick={() => adquirir(plano)}
                      className="rounded bg-[#0153A5] px-4 py-1.5 text-sm text-white hover:bg-blue-600"
                    >
                      Adquirir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto mb-0 flex gap-4  ">
        <button onClick={voltar} className="rounded bg-gray-200 px-4 py-2 text-sm hover:text-white hover:bg-[#0153A5]">
          Voltar
        </button>
      </div>
    </div>
  );
}
