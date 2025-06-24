import DefaultLayout from '@/Layouts/DefaultLayout';
import Loader from '@/components/uiMediaseg/Loader';
import { useEffect, useState } from 'react';

import Inicio from '@/components/painel/inicio';
import Sessao from '@/components/ui/navDashboard';

import { usePage } from '@inertiajs/react';

import { useForm } from '@inertiajs/react';

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
            <div className="flex h-screen w-full gap-2 overflow-hidden bg-gray-200 py-5 sm:px-10">
                {/* MENU LATERAL FIXO - DESKTOP */}
                <div className="sticky top-0 hidden h-screen w-1/4 flex-col p-4 sm:flex">
                    <div>
                        <img src="/mediaSeg.svg" alt="Logo" width={40} />
                    </div>
                    <div className="mt-10 space-y-4">
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

                {/* MENU LATERAL FIXO - MOBILE */}
                <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around bg-white px-4 py-2 shadow sm:hidden">
                    <Sessao
                        titulo="Inicio"
                        icon={TbSmartHome}
                        onClick={() => setSessaoAtiva('Inicio')}
                        classe={colorChange('Inicio')}
                        modo="mobile"
                    />
                    <Sessao
                        titulo="Seguros"
                        icon={MdOutlineSecurity}
                        onClick={() => setSessaoAtiva('Seguros')}
                        classe={colorChange('Seguros')}
                        modo="mobile"
                    />
                    <Sessao
                        titulo="Pagamentos"
                        icon={MdPayment}
                        onClick={() => setSessaoAtiva('Pagamentos')}
                        classe={colorChange('Pagamentos')}
                        modo="mobile"
                    />
                    <Sessao
                        titulo="Meus Planos"
                        icon={RiBillLine}
                        onClick={() => setSessaoAtiva('Meus Planos')}
                        classe={colorChange('Meus Planos')}
                        modo="mobile"
                    />
                    <Sessao
                        titulo="Menu"
                        icon={HiOutlineMenuAlt3}
                        onClick={() => setSessaoAtiva('Menu')}
                        classe={colorChange('Menu')}
                        modo="mobile"
                    />
                </div>

                {/* Área que divide verticalmente: Header fixo + Conteúdo com scroll */}
                <div className="flex h-screen w-full flex-col rounded-xl sm:w-3/4">
                    {/* HEADER FIXO */}
                    <header className="sticky top-0 z-10 flex items-center justify-between  px-4 py-3">
                        <h1 className="text-xl font-bold text-[#0153A5] sm:text-2xl">{sessaoAtiva}</h1>

                        <div className="flex items-center gap-4">
                            {/* Ícone de notificação */}
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-xl text-gray-600 transition hover:shadow-md">
                                <MdOutlineNotificationsActive />
                            </div>

                            {/* Foto e nome do cliente */}
                            <div className="flex items-center gap-2">
                                <div className="h-10 w-10 rounded-full bg-white shadow-inner" />
                                <p className="hidden text-sm leading-tight sm:block">
                                    Seja bem-vindo
                                    <br />
                                    <span className="font-bold">
                                        {cliente?.nome} {cliente?.sobrenome}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </header>

                    {/* CONTEÚDO COM SCROLL */}
                    <div className="flex-1 space-y-4 overflow-y-auto sm:overflow-hidden rounded-b-xl bg-gray-50 sm:bg-transparent px-4 py-4">
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
