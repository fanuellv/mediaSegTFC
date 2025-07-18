import ListSeguradora from '@/components/ui/listaSeguradoras';
import { Seguradora } from '@/types/DadosSimulacao';
import { useEffect, useState } from 'react';
import Selecionada from './Selecionada';
//import Servico from './Servico';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';

interface Plano {
    id: number;
    nome: string;
    valor: number;
    descricao: string;
    foto?: string | null;
}




export default function Etapa() {
    const [etapa, setEtapa] = useState(1);

    const [seguradoraSelecionada, setSeguradoraSelecionada] = useState<Seguradora | null>(null);
    const [planoSelecionado, setPlanoSelecionado] = useState<Plano | null>(null);

    const { props } = usePage();
    const seguradoraIdFromUrl = props.seguradora_id as number | undefined;

    useEffect(() => {
        if (seguradoraIdFromUrl) {
            fetch(`/dashboard/seguradoras/${seguradoraIdFromUrl}`)
                .then(res => res.json())
                .then(data => setSeguradoraSelecionada(data));
        }
    }, [seguradoraIdFromUrl]);


    function adquirir() {
        if (!seguradoraSelecionada || !planoSelecionado) return;

        router.get('/dashboard/pagamentos', {
            seguradora_id: seguradoraSelecionada.id,
            plano_id: planoSelecionado.id,
        });
    }
    
    return (
        <div className="flex w-full bg-white rounded-2xl p-4 h-full sm:h-[88vh] flex-col">
            {etapa === 1 && <ListSeguradora setSeguradora={setSeguradoraSelecionada} onAvancar={() => setEtapa(2)} />}

            {etapa === 2 && <Selecionada seguradora={seguradoraSelecionada} onVoltar={() => setEtapa(1)} adquirir={() => adquirir()} setPlanoSelecionado={setPlanoSelecionado} />}
        </div>
    );

}
