// components/ui/navAdmin.tsx ou navAdmin.jsx
type Props = {
    sessaoAtiva: string;
    setSessaoAtiva: (sessao: string) => void;
};

const Header: React.FC<Props> = ({ sessaoAtiva, setSessaoAtiva }) => {
    function colorChange(nomeSessao: string) {
        return sessaoAtiva === nomeSessao
            ? 'flex items-center h-full px-4 bg-white text-[#0153A5] font-bold'
            : 'flex items-center h-full px-4 text-white hover:bg-white/20 transition';
    }

    return (
        <>
            <header className="flex h-20 w-full items-center justify-between bg-[#0153A5] px-20 text-white">
                <div className="flex items-center gap-10">
                    
                    <nav className="h-20">
                        <ul className="flex h-20">
                            {['Adicionar', 'Atualizar', 'Eliminar'].map((sessao) => (
                                <li key={sessao} className={colorChange(sessao)} onClick={() => setSessaoAtiva(sessao)}>
                                    {sessao}
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                
            </header>
        </>
    );
};

export default Header;
