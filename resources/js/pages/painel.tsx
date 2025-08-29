// pages/painel.tsx
import LayoutAdm from '@/layouts/app-adm';
import Seguradora from '@/components/ui/seguradora';
import Plano from '@/components/ui/plano';
import CrudPlayList from '@/components/ui/CrudPlaylist';
import CrudQuiz from '@/components/ui/CrudQuiz';
import Relatorio from '@/components/Relatorio';

const Painel: React.FC = () => {
    return (
        <LayoutAdm>
            {(sessaoAtiva:string) => {
                switch (sessaoAtiva) {
                    case 'Seguradoras':
                        return <Seguradora />;
                    case 'Planos':
                        return <Plano/>;
                    case 'Relatórios':
                        return <Relatorio/>;
                    case 'PlayList':
                        return <CrudPlayList/>
                    case 'Quiz':
                        return <CrudQuiz/>
                    default:
                        return <div>Escolha uma sessão</div>;
                }
            }}
        </LayoutAdm>
    );
};

export default Painel;
