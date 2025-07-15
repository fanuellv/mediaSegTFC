import { useState } from 'react';
import ListSeguradora from '@/components/ui/listaSeguradoras';
import Servico from './Servico';
import Selecionada from './Selecionada';
import { Seguradora } from '@/types/DadosSimulacao';


export default function Etapa() {
    const [etapa, setEtapa] = useState(1);

    const [dados, setDados] = useState({});
    const [seguradoras, setSeguradoras] = useState<Seguradora[]>([]);

    const atualizar = (novosDados: Partial<Seguradora>) => {
            setDados((prev) => ({
                ...prev,
                ...novosDados,
            }));
        };

    return (
        <div className="flex h-full flex-col rounded-xl">
            {etapa === 1 && (
                <ListSeguradora
                    onAvancar={() => setEtapa(2)}
                    setDados={atualizar}
                    setSeguradoras={setSeguradoras}
                />
            )}

            {etapa === 2 && (
                <Selecionada
                    dados={dados}
                    setDados={atualizar}
                    onVoltar={() => setEtapa(1)}
                    onAvancar={() => setEtapa(3)}
                />
            )}

            {etapa === 3 && (
                <Servico
                    dados={dados}
                    setDados={atualizar}
                    seguradoras={seguradoras}
                    onVoltar={() => setEtapa(2)}
                    onAvancar={() => setEtapa(4)}
                />
            )}
        </div>
    );
}
