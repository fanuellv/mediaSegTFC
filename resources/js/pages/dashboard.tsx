import Inicio from '@/components/painel/inicio';
import Sessao from '@/components/ui/navDashboard';

import { usePage } from '@inertiajs/react';
import { useState } from 'react';
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

    return (
        <div className="flex h-screen w-full overflow-y-hidden bg-gray-200 px-10 py-5 gap-2">
            <div className="w-1/4 space-y-12">
                <div>
                    <img src="/mediaSeg.svg" alt="" width={40} />
                </div>
                <div className="space-y-5 pr-10">
                    <Sessao titulo="Inicio" icon={TbSmartHome} onClick={() => setSessaoAtiva('Inicio')} classe={colorChange('Inicio')}/>
                    <Sessao titulo="Seguros" icon={MdOutlineSecurity} onClick={() => setSessaoAtiva('Seguros')} classe={colorChange('Seguros')}/>
                    <Sessao titulo="Pagamentos" icon={MdPayment} onClick={() => setSessaoAtiva('Pagamentos')} classe={colorChange('Pagamentos')}/>
                    <Sessao titulo="Meus Planos" icon={RiBillLine} onClick={() => setSessaoAtiva('Meus Planos')} classe={colorChange('Meus Planos')}/>
                    <Sessao titulo="Aprender" icon={MdOutlineSchool} onClick={() => setSessaoAtiva('Aprender')} classe={colorChange('Aprender')}/>
                    <Sessao titulo="Menu" icon={HiOutlineMenuAlt3} onClick={() => setSessaoAtiva('Menu')} classe={colorChange('Menu')}/>
                </div>
                <div>
                    <button onClick={handleLogout} type="submit" className="flex h-12 w-12 items-center justify-center rounded-full bg-white p-2">
                        <RiLogoutCircleLine className="text-2xl text-gray-400" />
                    </button>
                </div>
            </div>
            <div className="w-3/4 space-y-4">
                <header className="flex items-center justify-between gap-6">
                    <h1 className="text-2xl text-[#0153A5] font-bold">
                        {sessaoAtiva === 'Inicio' && <div>Início</div>}
                        {sessaoAtiva === 'Seguros' && <div>Seguros</div>}
                        {sessaoAtiva === 'Pagamentos' && <div>Pagamentos</div>}
                        {sessaoAtiva === 'Meus Planos' && <div>Meus Planos</div>}
                        {sessaoAtiva === 'Aprender' && <div>Aprender</div>}
                        {sessaoAtiva === 'Menu' && <div>Menu</div>}
                    </h1>
                    <div className="flex gap-4">
                        <div className="flex items-center">
                            <CiSearch className="absolute right-158 text-gray-500" />
                            <input type="text" className="h-10 w-100 rounded bg-gray-100 px-10 text-gray-500" placeholder="pesquisar sobre seguros" />
                        </div>
                        <div className="text-1xl flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-600">
                            <MdOutlineNotificationsActive />
                        </div>
                        <div className="flex gap-2">
                            <div className="h-10 w-10 rounded-full bg-white"></div>
                            <p className="text-sm">
                                Seja bem-vindo <br />
                                <span className="font-bold">
                                    {cliente?.nome} {cliente?.sobrenome}
                                </span>
                            </p>
                        </div>
                    </div>
                </header>
                <div className="rounded">
                    {sessaoAtiva === 'Inicio' && <Inicio />}
                    {sessaoAtiva === 'Seguros' && <div>Conteúdo dos Seguros</div>}
                    {sessaoAtiva === 'Pagamentos' && <div>Conteúdo dos Pagamentos</div>}
                    {sessaoAtiva === 'Meus Planos' && <div>Conteúdo dos Planos</div>}
                    {sessaoAtiva === 'Aprender' && <div>Conteúdo de Aprendizado</div>}
                    {sessaoAtiva === 'Menu' && <div>Outros conteúdos do Menu</div>}
                </div>
            </div>
        </div>
    );
}
