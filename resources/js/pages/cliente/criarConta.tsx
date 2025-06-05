import DefaultLayout from '@/Layouts/DefaultLayout';
import Loader from '@/components/uiMediaseg/Loader';
import { useEffect, useState } from 'react';

import logo from '/public/img/logoWhite.svg';
import user from '/public/img/user.svg';

import { useForm } from '@inertiajs/react';

import { Link } from '@inertiajs/react';
import { FaPlus } from 'react-icons/fa6';

interface ClienteForm {
    nome: string;
    sobrenome: string;
    nome_usuario: string;
    email: string;
    dataRegistro: string;
    nif: string;
    senha: string;
    telefone: string;
    foto: File | null;
    [key: string]: string | File | null;
}

export default function CreateAccount() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const { data, setData, post, processing, errors } = useForm<ClienteForm>({
        nome: '',
        sobrenome: '',
        nome_usuario: '',
        email: '',
        dataRegistro: '',
        nif: '',
        senha: '',
        telefone: '',
        foto: null,
    });

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setData('foto', file);
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/cliente', {
            forceFormData: true,
        });
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
                {/* Lado esquerdo - Foto */}
                <div className="flex h-full w-2/5 flex-col items-center space-y-6 bg-[#0153A5] p-10 text-white">
                    <img src={logo} alt="Logo" className="h-auto w-48 max-w-full" />
                    <div className="flex h-80 w-80 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                        <img src={imagePreview || user} alt="Preview" className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-col items-center space-y-3">
                        <label htmlFor="fileUpload" className="text-2xl font-bold">
                            Adicione a sua Foto
                        </label>
                        <span className="w-60 text-center text-sm font-extralight">
                            Utilize o botão abaixo para fazer o upload da sua fotografia de perfil
                        </span>
                        <label
                            htmlFor="fileUpload"
                            className="flex h-15 w-15 cursor-pointer items-center rounded-full bg-white p-2 text-2xl font-bold text-[#0153A5]"
                        >
                            <FaPlus />
                        </label>
                        <input type="file" id="fileUpload" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    </div>
                </div>

                {/* Lado direito - Formulário */}
                <div className="flex h-screen w-3/5 flex-col justify-center space-y-4 px-20 text-gray-700">
                    <div className="mb-10">
                        <h1 className="text-3xl font-bold text-[#0153A5]">Registrar-se</h1>
                        <p className="pt-2 text-sm">
                            Já tens conta?{' '}
                            <Link href={route('iniciar')} className="text-blue-400 underline">
                                Iniciar Sessão
                            </Link>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex w-full gap-4">
                            <div className="w-1/2">
                                <input
                                    id="nome"
                                    value={data.nome}
                                    onChange={(e) => setData('nome', e.target.value)}
                                    type="text"
                                    className="w-full rounded border-b border-b-gray-300 px-4 py-2"
                                    placeholder="Nome"
                                />
                                {errors.nome && <p className="mt-1 text-sm text-red-500">{errors.nome}</p>}
                            </div>
                            <div className="w-1/2">
                                <input
                                    id="sobrenome"
                                    value={data.sobrenome}
                                    onChange={(e) => setData('sobrenome', e.target.value)}
                                    type="text"
                                    className="w-full rounded border-b border-b-gray-300 px-4 py-2"
                                    placeholder="Sobrenome"
                                />
                                {errors.sobrenome && <p className="mt-1 text-sm text-red-500">{errors.sobrenome}</p>}
                            </div>
                        </div>

                        <div>
                            <input
                                id="nome_usuario"
                                value={data.nome_usuario}
                                onChange={(e) => setData('nome_usuario', e.target.value)}
                                type="text"
                                className="w-full rounded border-b border-b-gray-300 px-4 py-2"
                                placeholder="Nome de usuário"
                            />
                            {errors.nome_usuario && <p className="mt-1 text-sm text-red-500">{errors.nome_usuario}</p>}
                        </div>

                        <div>
                            <input
                                id="nif"
                                value={data.nif}
                                onChange={(e) => setData('nif', e.target.value)}
                                type="text"
                                className="w-full rounded border-b border-b-gray-300 px-4 py-2"
                                placeholder="NIF ou Nº BI"
                            />
                            {errors.nif && <p className="mt-1 text-sm text-red-500">{errors.nif}</p>}
                        </div>

                        <div>
                            <input
                                id="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                type="email"
                                className="w-full rounded border-b border-b-gray-300 px-4 py-2"
                                placeholder="Email"
                            />
                            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                        </div>

                        <div className="flex w-full gap-4">
                            <div className="w-1/2">
                                <input
                                    id="telefone"
                                    value={data.telefone}
                                    onChange={(e) => setData('telefone', e.target.value)}
                                    type="tel"
                                    className="w-full rounded border-b border-b-gray-300 px-4 py-2"
                                    placeholder="Telefone"
                                />
                                {errors.telefone && <p className="mt-1 text-sm text-red-500">{errors.telefone}</p>}
                            </div>

                            <div className="w-1/2">
                                <label htmlFor="dataRegistro" className="mb-1 block text-sm">
                                    Data de Nascimento
                                </label>
                                <input
                                    id="dataRegistro"
                                    value={data.dataRegistro}
                                    onChange={(e) => setData('dataRegistro', e.target.value)}
                                    type="date"
                                    className="w-full rounded border-b border-b-gray-300 px-4 py-2"
                                />
                                {errors.dataRegistro && <p className="mt-1 text-sm text-red-500">{errors.dataRegistro}</p>}
                            </div>
                        </div>

                        <div>
                            <input
                                id="senha"
                                value={data.senha}
                                onChange={(e) => setData('senha', e.target.value)}
                                type="password"
                                className="w-full rounded border-b border-b-gray-300 px-4 py-2"
                                placeholder="Palavra-passe"
                            />
                            {errors.senha && <p className="mt-1 text-sm text-red-500">{errors.senha}</p>}
                        </div>

                        <div className="flex items-center space-x-2">
                            <input type="checkbox" id="remember" />
                            <label htmlFor="remember" className="text-xs text-gray-600">
                                Ao criar uma conta devo concordar com os <span className="text-blue-400 underline">termos de serviço</span> e{' '}
                                <span className="text-blue-400 underline">políticas de uso</span>.
                            </label>
                        </div>

                        <div className="flex gap-4">
                            <button type="submit" disabled={processing} className="rounded bg-[#0153A5] px-4 py-2 font-semibold text-white">
                                Criar Conta
                            </button>
                            <Link href={route('home')}>
                                <button type="button" className="rounded bg-gray-200 px-4 py-2 font-semibold text-[#0153A5]">
                                    Voltar
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </DefaultLayout>
    );
}
