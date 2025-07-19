import React, { useEffect, useState } from 'react';

import hero from '/public/img/heroLogin.svg';
import logoWhite from '/public/img/logoWhite.svg';

import { useForm } from '@inertiajs/react';
import { FaRegUser } from 'react-icons/fa';
import { TbLockPassword } from 'react-icons/tb';
import Loader from './loader';

const LoginModal: React.FC = () => {
    const { data, setData, post, processing, errors } = useForm({
        nif: '',
        senha: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Enviando login com:', data);

        post('/login', {
            onError: (errors) => {
                console.log('❌ Erros:', errors);
            },
        });
    };

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 1500);

        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
        console.log('CSRF Token:', token);

        return () => clearTimeout(timeout);
    }, []);

    if (loading) return <Loader />;
    return (
        <div className="flex flex-col sm:flex-row w-full min-h-screen">
  {/* Seção de Conteúdo */}
  <div className="flex flex-col justify-center items-center bg-[#0153A5] text-white p-6 sm:w-3/5 space-y-6">
    <img src={logoWhite} alt="Logo" className="w-40 sm:w-52" />
    <img src={hero} alt="Hero" className="w-64 sm:w-80" />
    <div className="text-center sm:text-left max-w-md">
      <h1 className="text-xl sm:text-2xl font-bold">Bem-Vindo</h1>
      <p className="mt-2 text-sm font-light">
        A MediaSeg! Explore nossa coleção selecionada de conteúdo voltado a seguros e descubra uma realidade ainda não explorada.
      </p>
    </div>
  </div>

  {/* Seção de Login */}
  <div className="flex flex-col justify-center bg-white p-8 sm:p-12 w-full sm:w-2/5 space-y-6">
    <h1 className="text-xl sm:text-2xl font-bold text-[#0153A5]">Iniciar Sessão</h1>
    <p className="text-sm">
      Não tens Conta?{' '}
      <a href={route('cadastro')} className="font-semibold text-[#0153A5] underline">
        Criar uma conta
      </a>
    </p>

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Campo NIF */}
      <div className="relative">
        <input
          type="text"
          value={data.nif}
          onChange={(e) => setData('nif', e.target.value)}
          className="w-full rounded border border-gray-300 px-4 py-2 pr-10 text-sm"
          placeholder="Nome do Usuário | NIF"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <FaRegUser />
        </span>
        {errors.nif && <p className="text-xs text-red-500 mt-1">{errors.nif}</p>}
      </div>

      {/* Campo Senha */}
      <div className="relative">
        <input
          type="password"
          value={data.senha}
          onChange={(e) => setData('senha', e.target.value)}
          className="w-full rounded border border-gray-300 px-4 py-2 pr-10 text-sm"
          placeholder="Palavra-passe"
        />
        <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <TbLockPassword />
        </span>
        {errors.senha && <p className="text-xs text-red-500 mt-1">{errors.senha}</p>}
      </div>

      {/* Ações */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
        <button
          type="submit"
          disabled={processing}
          className="rounded bg-[#0153A5] px-4 py-2 font-semibold text-white hover:bg-blue-700 transition"
        >
          Iniciar Sessão
        </button>

        <div className="flex items-center space-x-2">
          <input type="checkbox" id="remember" />
          <label htmlFor="remember" className="text-xs text-gray-600">Lembrar Palavra-passe</label>
        </div>
      </div>

      <a href="#" className="text-xs font-light text-blue-500 underline">
        Esqueci-me da Palavra-passe
      </a>
    </form>
  </div>
</div>

    );
};

export default LoginModal;
