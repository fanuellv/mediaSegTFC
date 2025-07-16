import { FaHome, FaPhoneAlt } from "react-icons/fa";
import { MdOutlineSecurity, MdOutlineAccountBalanceWallet } from "react-icons/md";
import { CiMoneyCheck1 } from "react-icons/ci";
import { GrConfigure } from "react-icons/gr";

export default function Menu() {
    return (
        <div className="flex w-full h-full flex-col gap-4 rounded-2xl bg-white p-4 sm:h-[88vh]">
            <h1 className="text-lg font-bold text-gray-800">Menu</h1>

            <div
                className=" sm:text-3xl scrollbar-thin scrollbar-thumb-gray-300 flex-1 overflow-y-auto pr-1"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                <ul className="flex flex-col gap-2 ">
                    <MenuItem  icon={<FaHome />} label="Início" />
                    <MenuItem icon={<MdOutlineSecurity />} label="Seguradoras" />
                    <MenuItem icon={<CiMoneyCheck1 />} label="Pagamentos" />
                    <MenuItem icon={<MdOutlineAccountBalanceWallet />} label="Meus Planos" />
                </ul>

                <h2 className="mt-6 text-sm font-semibold text-gray-600">Outras Opções</h2>
                <ul className="mt-2 flex flex-col gap-2">
                    <MenuItem icon={<FaPhoneAlt />} label="Contactos" />
                    <MenuItem icon={<GrConfigure />} label="Configurações" />
                </ul>
            </div>
        </div>
    );
}

function MenuItem({ icon, label }: { icon: React.ReactNode; label: string }) {
    return (
        <li className="flex items-center gap-3 rounded-md px-3 py-2 text-sm sm:text-1xl text-gray-700 hover:bg-blue-50 hover:text-blue-600 cursor-pointer">
            <span className="text-lg">{icon}</span>
            <span>{label}</span>
        </li>
    );
}
