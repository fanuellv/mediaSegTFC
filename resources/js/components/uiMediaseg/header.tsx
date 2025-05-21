import { IoIosArrowDown } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { Link } from '@inertiajs/react';
import Botao from '@/components/uiMediaseg/botao';

import logo from "/public/img/logo.svg";


const Header: React.FC = () => {
  return (
    <header className="fixed z-50 flex h-20 w-full max-w-screen items-center justify-between bg-white px-5 shadow sm:px-15">
      <img src={logo} alt="Logo" />
      <nav className="relative hidden sm:right-40 sm:flex">
        <ul className="flex items-center space-x-4">
          {['A MediaSeg', 'Aprender', 'Blog'].map((item) => (
            <li key={item} className="flex items-center space-x-1">
              <a href="#" className="flex items-center">
                <span>{item}</span>
                <IoIosArrowDown />
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex space-x-4">
        <Link href={route('cadastro')}>
          <Botao texto="Abrir Minha Conta" cor="bg-[#0153A5] text-white font-bold sm:text-1xl text-xs" />
        </Link>

        <Botao icon={FaUser} texto="Acessar" cor="bg-white text-black font-medium sm:text-1xl text-xs" renderModal={true} />
      </div>
    </header>
  );
};

export default Header;
