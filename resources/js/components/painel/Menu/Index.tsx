import { CiLogout, CiMoneyCheck1 } from 'react-icons/ci';
import { FaHome, FaPhoneAlt } from 'react-icons/fa';
import { GrConfigure } from 'react-icons/gr';
import { MdOutlineAccountBalanceWallet, MdOutlineSecurity } from 'react-icons/md';
import { GiGiftOfKnowledge } from "react-icons/gi";

import { Link, router } from '@inertiajs/react';
import { route } from 'ziggy-js';

export default function Menu() {
    return (
        <div className="flex h-full w-full flex-col gap-4 rounded-2xl bg-white p-4 sm:h-[88vh]">
            <h1 className="text-lg font-bold text-gray-800">Menu</h1>

            <div
                className="scrollbar-thin scrollbar-thumb-gray-300 flex-1 overflow-y-auto pr-1 sm:text-3xl"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                <ul className="flex flex-col gap-4">
                    <MenuItem icon={<FaHome />} label="Início" url="dashboard.inicio" />
                    <MenuItem icon={<MdOutlineSecurity />} label="Seguradoras" url="dashboard.seguros" />
                    <MenuItem icon={<CiMoneyCheck1 />} label="Pagamentos" url="dashboard.pagamentos" />
                    <MenuItem icon={<MdOutlineAccountBalanceWallet />} label="Meus Planos" url="dashboard.planos" />
                    <MenuItem icon={<GiGiftOfKnowledge />} label="Aprender" url="dashboard.aprender" />
                </ul>

                <h2 className="mt-6 text-sm font-semibold text-gray-600 mb-5">Outras Opções</h2>
                <ul className="mt-2 flex flex-col gap-4">
                    <MenuItem icon={<FaPhoneAlt />} label="Contactos" url="dashboard.pagamentos" />
                    <MenuItem icon={<GrConfigure />} label="Configurações" url="cliente.configuracao" />
                    <MenuItemLogout icon={<CiLogout />} label="Terminar Sessão" />
                </ul>
            </div>
        </div>
    );
}

function MenuItem({ icon, label, url }: { icon: React.ReactNode; label: string; url: string }) {
    return (
        <Link href={route(url)}>
            <li className="sm:text-1xl flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-lg text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                <span className="text-lg">{icon}</span>
                <span>{label}</span>
            </li>
        </Link>
    );
}
function MenuItemLogout({ icon, label }: { icon: React.ReactNode; label: string }) {
    const handleLogout = (e: React.MouseEvent) => {
        e.preventDefault();
        router.post(route('logout'));
    };

    return (
        <li
            onClick={handleLogout}
            className="sm:text-1xl flex cursor-pointer items-center gap-3 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        >
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
        </li>
    );
}
