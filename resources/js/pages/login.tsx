import React from 'react';

import hero from '/public/img/heroLogin.svg';
import logoWhite from '/public/img/logoWhite.svg';

import { FaRegUser } from 'react-icons/fa';
import { TbLockPassword } from 'react-icons/tb';

const Login: React.FC = () => {
    return (
        <div className="flex w-full h-screen">
            {/* Seção de Conteúdo */}
            <div className="flex flex-col justify-center w-3/5 space-y-6 bg-[#0153A5] p-10 text-white">
                <img src={logoWhite} alt="" style={{ width: '200px', height: 'auto', maxWidth: '100%' }} />
                <img src={hero} alt="" style={{ width: '300px', height: 'auto', maxWidth: '100%' }} />
                <h1 className="text-2xl font-bold">Bem-Vindo</h1>
                <p className='text-xs font-light mb-10'>A MediaSeg! Explore nossa coleção selecionada de conteúdo voltado a seguros e descubra uma realidade ainda não explorada.</p>
            </div>

            {/* Seção de Login */}
            <div className="flex w-2/5 flex-col justify-center space-y-6 bg-white p-10">
                <h1 className="text-2xl font-bold text-[#0153A5]">Iniciar Sessão</h1>
                <p className="text-sm">
                    Não tens Conta?{' '}
                    <a href={route('cadastro')} className="font-semibold text-[#0153A5] underline">
                        Criar uma conta
                    </a>
                </p>

                <form className="space-y-4">
                    <div className="flex items-center">
                        <input type="text" className="w-full rounded border-b border-b-gray-300 px-4 py-2" placeholder="Nome do Usuário | NIF" />
                        <span className="absolute right-15 text-gray-400">
                            <FaRegUser />
                        </span>
                    </div>

                    <div className="flex items-center">
                        <input type="password" className="w-full rounded border-b border-b-gray-300 px-4 py-2" placeholder="Palavra-passe" />
                        <span className="absolute right-15 text-gray-400">
                            <TbLockPassword />
                        </span>
                    </div>

                    <div className="flex justify-between mt-5">
                        <button type="submit" className=" rounded bg-[#0153A5] px-4 py-2 font-semibold text-white">
                            Iniciar Sessão
                        </button>
                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember" className="text-xs text-gray-600">
                                Lembrar Palavra-passe
                            </label>
                        </div>
                    </div>
                    <a href="#" className='font-light text-xs text-blue-400 underline'>Esqueci-me da Palavra-passe</a>
                </form>
            </div>
        </div>
    );
};

export default Login;
