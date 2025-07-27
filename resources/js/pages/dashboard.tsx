import Loader from '@/components/uiMediaseg/Loader';
import DefaultLayout from '@/layouts/DefaultLayout.jsx';
import { useEffect, useState } from 'react';

import axios from 'axios';

import Inicio from '@/components/painel/inicio';
import Sessao from '@/components/ui/navDashboard';

import { router, useForm, usePage } from '@inertiajs/react';

import IndexAprender from '@/components/painel/aprender';
import Menu from '@/components/painel/Menu/Index';
import Pagamento from '@/components/painel/Pagamento';
import Index from '@/components/painel/Planos';
import Etapa from '@/components/painel/Servico/Etapa';

import SelecionadaPorRota from '@/components/painel/Servico/SelecionadaPorRota';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { MdOutlineNotificationsActive, MdOutlineSchool, MdOutlineSecurity, MdPayment } from 'react-icons/md';
import { RiBillLine, RiLogoutCircleLine } from 'react-icons/ri';
import { TbSmartHome } from 'react-icons/tb';

import ModalNotificacoes from '../components/ui/NotificacoesCliente';

interface Cliente {
    nome: string;
    sobrenome: string;
    email: string;
    foto?: string | null;
}

interface PageProps {
    cliente: Cliente;
    aba: string;
    [key: string]: unknown;
}

interface Notificacao {
    id: number;
    titulo: string;
    cliente: string;
    mensagem: string;
    created_at: string;
    lida: boolean;
}

export default function Dashboard() {
    const [mostrarModal, setMostrarModal] = useState(false);

    const [quantidadeNaoLidas, setQuantidadeNaoLidas] = useState(0);

useEffect(() => {
    axios.get('/notificacoes', { withCredentials: true })
        .then((res) => {
            const todas = res.data;
            const naoLidas = todas.filter((n: Notificacao) => !n.lida).length;
            setQuantidadeNaoLidas(naoLidas);
        })
        .catch(() => {
            console.error('Erro ao buscar notificações');
        });
}, []);


    const { url } = usePage();
    const { props } = usePage<PageProps>();
    const cliente = props.cliente;
    const sessaoAtiva = props.aba;

    const { post } = useForm();
    const [loading, setLoading] = useState(true);

    function handleLogout() {
        post(route('logout'));
    }

    function colorChange(nomeSessao: string) {
        return sessaoAtiva === nomeSessao ? 'text-[#0153A5] font-bold bg-white/40 rounded' : 'text-gray-400';
    }

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timeout);
    }, []);

    if (loading) return <Loader />;

    return (
        <DefaultLayout>
            <div className="flex h-screen w-full gap-2 overflow-hidden bg-gray-200 py-5 sm:px-10">
                {/* MENU LATERAL - DESKTOP */}
                <div className="sticky top-0 hidden h-screen w-1/4 flex-col p-4 sm:flex">
                    <img src="/mediaSeg.svg" alt="Logo" width={40} />
                    <div className="mt-10 space-y-4">
                        <Sessao
                            titulo="Inicio"
                            icon={TbSmartHome}
                            onClick={() => router.visit(route('dashboard.inicio'))}
                            classe={colorChange('Inicio')}
                        />
                        <Sessao
                            titulo="Seguros"
                            icon={MdOutlineSecurity}
                            onClick={() => router.visit(route('dashboard.seguros'))}
                            classe={colorChange('Seguros')}
                        />
                        <Sessao
                            titulo="Pagamentos"
                            icon={MdPayment}
                            onClick={() => router.visit(route('dashboard.pagamentos'))}
                            classe={colorChange('Pagamentos')}
                        />
                        <Sessao
                            titulo="Meus Planos"
                            icon={RiBillLine}
                            onClick={() => router.visit(route('dashboard.planos'))}
                            classe={colorChange('Meus Planos')}
                        />
                        <Sessao
                            titulo="Aprender"
                            icon={MdOutlineSchool}
                            onClick={() => router.visit(route('dashboard.aprender'))}
                            classe={colorChange('Aprender')}
                        />
                        <Sessao
                            titulo="Menu"
                            icon={HiOutlineMenuAlt3}
                            onClick={() => router.visit(route('dashboard.menu'))}
                            classe={colorChange('Menu')}
                        />
                    </div>
                    <div className="mt-10">
                        <button onClick={handleLogout} className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-2">
                            <RiLogoutCircleLine className="text-2xl text-gray-400" />
                        </button>
                    </div>
                </div>

                {/* MENU LATERAL - MOBILE */}
                <div className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-around bg-white px-4 py-2 shadow sm:hidden">
                    <Sessao
                        titulo="Inicio"
                        icon={TbSmartHome}
                        onClick={() => router.visit(route('dashboard.inicio'))}
                        classe={colorChange('Inicio')}
                        modo="mobile"
                    />
                    <Sessao
                        titulo="Seguros"
                        icon={MdOutlineSecurity}
                        onClick={() => router.visit(route('dashboard.seguros'))}
                        classe={colorChange('Seguros')}
                        modo="mobile"
                    />
                    <Sessao
                        titulo="Pagamentos"
                        icon={MdPayment}
                        onClick={() => router.visit(route('dashboard.pagamentos'))}
                        classe={colorChange('Pagamentos')}
                        modo="mobile"
                    />
                    <Sessao
                        titulo="Meus Planos"
                        icon={RiBillLine}
                        onClick={() => router.visit(route('dashboard.planos'))}
                        classe={colorChange('Meus Planos')}
                        modo="mobile"
                    />
                    <Sessao
                        titulo="Menu"
                        icon={HiOutlineMenuAlt3}
                        onClick={() => router.visit(route('dashboard.menu'))}
                        classe={colorChange('Menu')}
                        modo="mobile"
                    />
                </div>

                {/* CONTEÚDO PRINCIPAL */}
                <div className="flex h-screen w-full flex-col rounded-xl sm:w-3/4">
                    {/* HEADER FIXO */}
                    <header className="sticky top-0 z-10 flex items-center justify-between px-4 py-3">
                        <h1 className="text-xl font-bold text-[#0153A5] sm:text-2xl">{sessaoAtiva}</h1>
                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <div
                                    onClick={() => setMostrarModal(true)}
                                    className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#0153A5] text-xl text-white"
                                >
                                    <MdOutlineNotificationsActive />
                                </div>
                                {quantidadeNaoLidas > 0 && (
                                    <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                                        {quantidadeNaoLidas}
                                    </div>
                                )}

                                {mostrarModal && <ModalNotificacoes onFechar={() => setMostrarModal(false)} />}
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="borde-[#0153a5] ounded-full h-10 w-10 flex-shrink-0 overflow-hidden rounded-full border-2 border-[#0153A5] bg-gray-100 shadow-inner">
                                    {cliente.foto ? (
                                        <img src={`/storage/${cliente.foto}`} alt={cliente.nome} className="h-full w-full object-cover" />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-sm text-gray-500">Sem imagem</div>
                                    )}
                                </div>
                                <p className="hidden text-sm sm:block">
                                    Seja bem-vindo
                                    <br />
                                    <span className="font-bold">
                                        {cliente?.nome} {cliente?.sobrenome}
                                    </span>
                                </p>
                            </div>
                        </div>
                    </header>

                    {/* CONTEÚDO COM BASE NA ABA */}
                    <div className="flex-1 space-y-4 overflow-y-auto rounded-b-xl bg-gray-50 px-4 py-4 sm:overflow-hidden sm:bg-transparent">
                        {sessaoAtiva === 'Inicio' && <Inicio />}
                        {sessaoAtiva === 'Seguros' && (
                            <>
                                {/* Exibe o componente Etapa apenas na rota /dashboard/seguros */}
                                {url === '/dashboard/seguros' && <Etapa />}

                                {/* Exibe o componente SelecionadaPorRota se a URL começar com /dashboard/seguros/seguradora 
        Isso inclui URLs como /dashboard/seguros/seguradora?seguradora_id=1 */}
                                {url.startsWith('/dashboard/seguros/seguradora') && <SelecionadaPorRota />}
                            </>
                        )}

                        {sessaoAtiva === 'Pagamentos' && <Pagamento />}
                        {sessaoAtiva === 'Meus Planos' && <Index />}
                        {sessaoAtiva === 'Aprender' && <IndexAprender />}
                        {sessaoAtiva === 'Menu' && <Menu />}
                    </div>
                </div>
            </div>
        </DefaultLayout>
    );
}
