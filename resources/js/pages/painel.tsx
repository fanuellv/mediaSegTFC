// pages/painel.tsx
import LayoutAdm from '@/layouts/app-adm';
import Seguradora from '@/components/ui/seguradora';
import Plano from '@/components/ui/plano';
import CrudPlayList from '@/components/ui/CrudPlaylist';

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
                        return <div>Conteúdo dos Relatórios</div>;
                    case 'Aprender':
                        return <CrudPlayList/>
                    default:
                        return <div>Escolha uma sessão</div>;
                }
            }}
        </LayoutAdm>
    );
};

export default Painel;
