import DefaultLayout from '@/Layouts/DefaultLayout';
import Loader from '@/components/uiMediaseg/Loader';
import { useEffect, useState } from 'react';

import Inicio from '@/components/painel/inicio';
import Sessao from '@/components/ui/navDashboard';

import { usePage } from '@inertiajs/react';

import { useForm } from '@inertiajs/react';

import { CiSearch } from 'react-icons/ci';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { MdOutlineNotificationsActive, MdOutlineSchool, MdOutlineSecurity, MdPayment } from 'react-icons/md';
import { RiBillLine, RiLogoutCircleLine } from 'react-icons/ri';
import { TbSmartHome } from 'react-icons/tb';

interface Cliente {
    nome: string;
    sobrenome: string;
    email: string;
    // adicione outros campos se quiser, como `id`, `sobrenome`, etc.
}

interface PageProps {
    cliente: Cliente;
    [key: string]: unknown; // <- isso permite outras props
}

export default function Dashboard() {
    const [sessaoAtiva, setSessaoAtiva] = useState('Inicio');

    const { props } = usePage<PageProps>();
    const cliente = props.cliente;

    const { post } = useForm();

    function handleLogout() {
        post(route('logout'));
    }
    function colorChange(nomeSessao: string) {
        return sessaoAtiva === nomeSessao
            ? 'text-[#0153A5] font-bold bg-white/40 rounded' // Sessão ativa
            : 'text-gray-400'; // Sessões inativas
    }
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timeout);
    }, []);

    if (loading) return <Loader />;

    return (
        <DefaultLayout>
            <div className="flex h-screen w-full gap-2 overflow-hidden bg-gray-200 px-10 py-5">
                {/* MENU LATERAL FIXO */}
                <div className="sticky top-0 h-screen w-1/4 space-y-12">
                    <div>
                        <img src="/mediaSeg.svg" alt="" width={40} />
                    </div>
                    <div className="space-y-5 pr-10">
                        <Sessao titulo="Inicio" icon={TbSmartHome} onClick={() => setSessaoAtiva('Inicio')} classe={colorChange('Inicio')} />
                        <Sessao titulo="Seguros" icon={MdOutlineSecurity} onClick={() => setSessaoAtiva('Seguros')} classe={colorChange('Seguros')} />
                        <Sessao
                            titulo="Pagamentos"
                            icon={MdPayment}
                            onClick={() => setSessaoAtiva('Pagamentos')}
                            classe={colorChange('Pagamentos')}
                        />
                        <Sessao
                            titulo="Meus Planos"
                            icon={RiBillLine}
                            onClick={() => setSessaoAtiva('Meus Planos')}
                            classe={colorChange('Meus Planos')}
                        />
                        <Sessao
                            titulo="Aprender"
                            icon={MdOutlineSchool}
                            onClick={() => setSessaoAtiva('Aprender')}
                            classe={colorChange('Aprender')}
                        />
                        <Sessao titulo="Menu" icon={HiOutlineMenuAlt3} onClick={() => setSessaoAtiva('Menu')} classe={colorChange('Menu')} />
                    </div>
                    <div>
                        <button onClick={handleLogout} className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-2">
                            <RiLogoutCircleLine className="text-2xl text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* Área que divide verticalmente: Header fixo + Conteúdo com scroll */}
                <div className="flex h-screen w-3/4 flex-col pr-4">
                    {/* HEADER FIXO */}
                    <header className="sticky z-20 flex flex-shrink-0 items-center justify-between gap-6 bg-gray-200 px-4 py-2">
                        <h1 className="text-2xl font-bold text-[#0153A5]">{sessaoAtiva}</h1>
                        <div className="flex gap-4">
                            <div className="relative flex items-center">
                                <CiSearch className="absolute left-3 text-gray-500" />
                                <input
                                    type="text"
                                    className="h-10 w-100 rounded bg-gray-100 pr-4 pl-10 text-gray-500"
                                    placeholder="pesquisar sobre seguros"
                                />
                            </div>
                            <div className="text-1xl flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600">
                                <MdOutlineNotificationsActive />
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-10 w-10 rounded-full bg-white" />
                                <p className="text-sm leading-tight">
                                    Seja bem-vindo <br />
                                    <span className="font-bold">
                                        {cliente?.nome} {cliente?.sobrenome}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </header>

                    {/* CONTEÚDO COM SCROLL */}
                    <div className="flex-1 space-y-4 overflow-y-hidden px-4">
                        {sessaoAtiva === 'Inicio' && <Inicio />}
                        {sessaoAtiva === 'Seguros' && <div>Conteúdo dos Seguros</div>}
                        {sessaoAtiva === 'Pagamentos' && <div>Conteúdo dos Pagamentos</div>}
                        {sessaoAtiva === 'Meus Planos' && <div>Conteúdo dos Planos</div>}
                        {sessaoAtiva === 'Aprender' && <div>Conteúdo de Aprendizado</div>}
                        {sessaoAtiva === 'Menu' && <div>Outros conteúdos do Menu</div>}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
