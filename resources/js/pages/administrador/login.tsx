import { usePage } from '@inertiajs/react';
import React from 'react';

import { useForm } from '@inertiajs/react';

const Login: React.FC = () => {
    const { props } = usePage();
    const flashError = props.errors?.nome_usuario;
    const { data, setData, post, processing, errors } = useForm({
        nome_usuario: '',
        senha: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/login'); // Rota definida no Laravel
    };
    return (
        <div className="flex h-screen flex-col items-center justify-center space-y-8">
            <img src="/mediaSeg.svg" alt="" width={50} height={50} />
            <form onSubmit={handleSubmit} action="" className="flex w-2/7 flex-col items-center space-y-4">
                <input
                    value={data.nome_usuario}
                    onChange={(e) => setData('nome_usuario', e.target.value)}
                    className="w-full rounded border border-gray-200 p-2"
                    type="text"
                    placeholder="Nome do utilizador"
                />
                {errors.nome_usuario && <div className="text-red-500">{errors.nome_usuario}</div>}
                {flashError && <div className="text-center text-sm text-red-500">{flashError}</div>}
                <input
                    value={data.senha}
                    onChange={(e) => setData('senha', e.target.value)}
                    className="w-full rounded border border-gray-200 p-2"
                    type="password"
                    placeholder="Digite a Senha"
                />
                {errors.senha && <div className="text-red-500">{errors.senha}</div>}
                <button disabled={processing} className="w-full rounded bg-[#0153A5] p-3 font-bold text-white" type="submit">
                    Iniciar Sessão
                </button>
                <span>
                    <a href="">Recuperar</a>
                </span>
            </form>
        </div>
    );
};

export default Login;
