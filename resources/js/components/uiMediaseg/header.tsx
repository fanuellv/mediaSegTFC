import Botao from '@/components/uiMediaseg/botao';
//import { Link } from '@inertiajs/react';
import {  useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

import logo from '/public/img/logo.svg';

const menuItems = [
  {
    label: 'A MediaSeg',
    options: [
      'Consultoria Personalizada',
      'Educação Sobre Seguros',
      'Facilidade na Contratação',
      'Acompanhamento Contínuo',
    ],
    rota: [
      '/servico/consultoria-personalizada',
      '/servicos/educacao',
      '/servicos/facilidade',
      '/servicos/acompanhamento',
    ],
  },
  { label: 'Aprender', options: [], rota: [] },
  { label: 'Blog', options: [], rota: [] },
];


export default function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleClick = (label: string) => {
    if (activeMenu === label) {
      setActiveMenu(null); // Fechar se já estiver aberto
    } else {
      setActiveMenu(label); // Abrir novo menu
    }

    // Resetar timeout
    if (timeoutId) clearTimeout(timeoutId);
    const id = setTimeout(() => setActiveMenu(null), 3000);
    setTimeoutId(id);
  };

  return (
    <header className="fixed top-0 z-50 w-full h-20 bg-white shadow px-4 sm:px-16 flex items-center justify-between">
      <a href={route('home')}>
        <img src={logo} alt="Logo MediaSeg" className="h-10 sm:h-12" />
      </a>

      <nav className="hidden sm:flex space-x-8 relative">
        <ul className="flex items-center space-x-6 relative">
          {menuItems.map((item) => (
            <li key={item.label} className="relative">
              <button
                onClick={() => handleClick(item.label)}
                className="flex items-center gap-1 text-gray-800 hover:text-blue-600 transition"
                title={item.label}
              >
                <span>{item.label}</span>
                <IoIosArrowDown />
              </button>

              {activeMenu === item.label && item.options.length > 0 && (
                <ul className="absolute top-full mt-2 bg-white shadow-lg rounded-lg py-2 px-4 z-50 w-64">
                  {item.options.map((option, index) => (
                    <li key={option}>
                      <a
                        href={item.rota?.[index] || '#'}
                        title={`Ir para ${option}`}
                        className="block px-2 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded"
                      >
                        {option}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex space-x-3">
        <a href={route('cadastro')}>
          <Botao
            texto="Abrir Minha Conta"
            cor="bg-[#0153A5] text-white font-bold sm:text-base text-xs"
          />
        </a>
        <a href={route('login')} className='bg-gray-50 hover:bg-[#0153A5] rounded px-2 '>
          <Botao
            icon={FaUser}
            texto="Acessar"
            cor=" text-black hover:text-white font-medium sm:text-base text-xs"
          />
        </a>
      </div>
    </header>
  );
}
