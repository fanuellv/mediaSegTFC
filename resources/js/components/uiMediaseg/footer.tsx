import React from 'react';

import security from '@/json/smartphone-lock.json';
import alvo from '@/json/umbrella.json';
import Lottie from 'lottie-react';
import logo from '/public/img/logo.svg';

import { Link } from '@inertiajs/react';
import { AiFillInstagram } from 'react-icons/ai';
import { FaFacebookSquare } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa6';

const LandingPage: React.FC = () => {
    return (
        <div className="relative top-35 w-full max-w-screen bg-[#0153A5] py-5 sm:py-10">
            {/* Seção 1 - Header */}
            <div className="grid grid-cols-1 grid-rows-2 gap-10 px-6 sm:grid-cols-2 sm:grid-rows-1 sm:px-16">
                <div className="flex flex-col items-center space-y-5 sm:items-start">
                    <h1 className="text-2xl font-bold text-white">Começar Agora</h1>
                    <p className="w-[80%] text-center text-white sm:w-full sm:text-left">Não perca tempo, seu seguro ideal está a um clique!</p>
                    <Link href={route('cadastro')}>
                        <button className="rounded bg-white px-4 py-2 text-xs font-bold text-[#003162] sm:text-sm">Abrir a minha Conta</button>
                    </Link>
                </div>

                <div className="flex justify-center rounded sm:justify-center">
                    {/* Adicione a imagem ou o conteúdo que desejar aqui */}
                    <Lottie animationData={alvo} loop={true} className="h-78 w-78 rounded-2xl bg-white" />
                </div>
            </div>

            {/* Seção 2 - Conteúdo */}
            <div className="relative top-10 w-full bg-white px-6 py-12 sm:px-10 md:px-16">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                    {/* Coluna da logo e animação */}
                    <div className="flex flex-col items-center space-y-6 sm:items-start">
                        <img src={logo} alt="Logo" className="w-32 sm:w-40" />
                        <div className="relative h-32 w-32">
                            <Lottie animationData={security} loop={true} className="absolute h-full w-full rounded-2xl" />
                        </div>
                    </div>

                    {/* Colunas de links */}
                    <div className="flex flex-col justify-between gap-10 sm:col-span-2 sm:flex-row">
                        {[
                            {
                                titulo: 'A mediaSeg',
                                links: [
                                    { label: 'Criar Conta', rota: 'cadastro' },
                                    { label: 'Iniciar Sessão', rota: 'login' },
                                    { label: 'Aprender', rota: 'login' },
                                    { label: 'Blog', rota: 'login' },
                                ],
                            },
                            {
                                titulo: 'Nossos Serviços',
                                links: [
                                    { label: 'Consultoria Personalizada', rota: 'consultoria' },
                                    { label: 'Educação Sobre Seguros', rota: 'educacao' },
                                    { label: 'Facilidade na Contratação', rota: 'facilidade' },
                                    { label: 'Acompanhamento Contínuo', rota: 'acompanhamento' },
                                ],
                            },
                            {
                                titulo: 'Contactos',
                                links: [
                                    { label: '+244 999 000 000', rota: 'consultoria' },
                                    { label: 'Email: mediaseg.ao@gmail.com', rota: 'educacao' },
                                ],
                            },
                        ].map((secao, index) => (
                            <div key={index}>
                                <h4 className="mb-2 flex flex-col items-center font-semibold text-[#003162] sm:items-start">{secao.titulo}</h4>
                                <ul className="flex flex-col items-center space-y-2 text-sm text-gray-700 sm:items-start">
                                    {secao.links.map((link, idx) => (
                                        <li key={idx}>
                                            <Link href={route(link.rota)} className="hover:underline">
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Seção 3 - Footer */}
            <div className="relative top-10 grid h-20 w-full max-w-screen grid-cols-2 items-center bg-[#0153A5] px-6 text-white sm:px-16">
                <div className="flex items-center">
                    <p className="text-xs sm:text-sm">
                        © 2025 <strong>mediaSeg</strong>. Todos os direitos reservados.
                    </p>
                </div>

                <div className="flex items-center justify-end space-x-2">
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FaLinkedin className="w-10" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <AiFillInstagram className="w-10" />
                    </a>
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <FaFacebookSquare className="w-10" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
