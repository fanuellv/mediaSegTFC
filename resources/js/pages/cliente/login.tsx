import DefaultLayout from '@/Layouts/DefaultLayout';
import Loader from '@/components/uiMediaseg/Loader';
import { useForm } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';

import hero from '/public/img/heroLogin.svg';
import logoWhite from '/public/img/logoWhite.svg';

import { FaRegUser } from 'react-icons/fa';
import { TbLockPassword } from 'react-icons/tb';

const Login: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        nif: '',
        senha: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/login'); // Rota definida no Laravel
    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timeout);
    }, []);

    if (loading) return <Loader />;

    return (
        <DefaultLayout>
            <div className="flex h-screen w-full">
                {/* Seção de Conteúdo */}
                <div className="flex w-3/5 flex-col justify-center space-y-6 bg-[#0153A5] p-10 text-white">
                    <img src={logoWhite} alt="" style={{ width: '200px', height: 'auto', maxWidth: '100%' }} />
                    <img src={hero} alt="" style={{ width: '300px', height: 'auto', maxWidth: '100%' }} />
                    <h1 className="text-2xl font-bold">Bem-Vindo</h1>
                    <p className="mb-10 text-xs font-light">
                        A MediaSeg! Explore nossa coleção selecionada de conteúdo voltado a seguros e descubra uma realidade ainda não explorada.
                    </p>
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

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={data.nif}
                                onChange={(e) => setData('nif', e.target.value)}
                                className="w-full rounded border-b border-b-gray-300 px-4 py-2"
                                placeholder="Nome do Usuário | NIF"
                            />
                            {errors.nif && <div className="text-red-500">{errors.nif}</div>}
                            <span className="absolute right-15 text-gray-400">
                                <FaRegUser />
                            </span>
                        </div>

                        <div className="flex items-center">
                            <input
                                type="password"
                                value={data.senha}
                                onChange={(e) => setData('senha', e.target.value)}
                                className="w-full rounded border-b border-b-gray-300 px-4 py-2"
                                placeholder="Palavra-passe"
                            />
                            {errors.senha && <div className="text-red-500">{errors.senha}</div>}
                            <span className="absolute right-15 text-gray-400">
                                <TbLockPassword />
                            </span>
                        </div>

                        <div className="mt-5 flex justify-between">
                            <button type="submit" disabled={processing} className="rounded bg-[#0153A5] px-4 py-2 font-semibold text-white">
                                Iniciar Sessão
                            </button>
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember" className="text-xs text-gray-600">
                                    Lembrar Palavra-passe
                                </label>
                            </div>
                        </div>
                        <a href="#" className="text-xs font-light text-blue-400 underline">
                            Esqueci-me da Palavra-passe
                        </a>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default Login;
