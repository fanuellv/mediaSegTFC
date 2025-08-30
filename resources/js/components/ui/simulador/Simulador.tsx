import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import SimuladorPlanoForm from './simuladorPlano';
import Cotacao from './Cotacao';
import Resultado from './Resultado';
import Extrair from './Extrair';
import { DadosSimulacao } from '@/types/DadosSimulacao';
import axios from 'axios';

interface Seguradora {
    id: number;
    nome: string;
}

export default function Simulador() {
    const { props } = usePage();
    const seguradoraIdRecebida = props.seguradora_id as number | undefined;

    const [etapa, setEtapa] = useState(1);
    const [seguradoras, setSeguradoras] = useState<Seguradora[]>([]);

    const [dados, setDados] = useState<DadosSimulacao>({
        tipo: 'vida',
        idade: 30,
        fumante: false,
        profissao: 'normal',
        seguradora_id: seguradoraIdRecebida ?? 1, 
        tipo_id: 1,
    });

    const atualizar = (novosDados: Partial<DadosSimulacao>) => {
        setDados((prev) => ({ ...prev, ...novosDados }));
    };

    useEffect(() => {
        const buscarSeguradoras = async () => {
            try {
                const response = await axios.get('/seguradoras');
                setSeguradoras(response.data);
            } catch (error) {
                console.error('Erro ao carregar seguradoras', error);
            }
        };

        buscarSeguradoras();
    }, []);

    return (
        <div className="flex h-full flex-col rounded-xl">
            {etapa === 1 && <SimuladorPlanoForm onAvancar={() => setEtapa(2)} setDados={atualizar} />}
            {etapa === 2 && <Cotacao dados={dados} setDados={atualizar} onVoltar={() => setEtapa(1)} onAvancar={() => setEtapa(3)} />}
            {etapa === 3 && <Resultado dados={dados} setDados={atualizar} seguradoras={seguradoras} onVoltar={() => setEtapa(2)} onAvancar={() => setEtapa(4)} />}
            {etapa === 4 && <Extrair dados={dados} onVoltar={() => setEtapa(1)} />}
        </div>
    );
}
