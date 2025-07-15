import ListSeguradora from '@/components/ui/listaSeguradoras';
import { Seguradora } from '@/types/DadosSimulacao';
import { useState } from 'react';
import Selecionada from './Selecionada';
//import Servico from './Servico';
import { router } from '@inertiajs/react';


function adquirir(seguradora: Seguradora | null) {
    if (!seguradora) return;
    router.get('/dashboard/pagamentos', { seguradora_id: seguradora.id });
}




export default function Etapa() {
    const [etapa, setEtapa] = useState(1);

    

    //const [seguradoras, setSeguradoras] = useState<Seguradora[]>([]);
    const [seguradoraSelecionada, setSeguradoraSelecionada] = useState<Seguradora | null>(null);


    return (
        <div className="flex w-full bg-white rounded-2xl p-4 h-full sm:h-[88vh] flex-col">
            {etapa === 1 && <ListSeguradora setSeguradora={setSeguradoraSelecionada} onAvancar={() => setEtapa(2)} />}

            {etapa === 2 && <Selecionada seguradora={seguradoraSelecionada} onVoltar={() => setEtapa(1)} adquirir={() => adquirir(seguradoraSelecionada)}/>}
        </div>
    );

}
