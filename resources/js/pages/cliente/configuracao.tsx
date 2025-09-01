import DefaultLayout from '@/layouts/DefaultLayout';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';

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
}

export default function Configuracao() {
    const [form, setForm] = useState<ClienteForm>({
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

    const [placeholders, setPlaceholders] = useState<Partial<ClienteForm>>({});
    const [fotoPreview, setFotoPreview] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});

    useEffect(() => {
        async function carregarDados() {
            try {
                const res = await fetch('/api/cliente');
                const data = await res.json();

                setPlaceholders({
                    nome: data.nome,
                    sobrenome: data.sobrenome,
                    nome_usuario: data.nome_usuario,
                    email: data.email,
                    dataRegistro: data.dataRegistro,
                    nif: data.nif,
                    telefone: data.telefone,
                });

                setFotoPreview(data.foto_url);
            } catch (err) {
                console.error('❌ Erro ao carregar dados:', err);
            }
        }

        carregarDados();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setFotoPreview(reader.result as string);
            reader.readAsDataURL(file);
            setForm((prev) => ({ ...prev, foto: file }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        const formData = new FormData();

        Object.entries(form).forEach(([key, value]) => {
            if (key === 'foto' && value instanceof File) {
                formData.append('foto', value);
            } else if (value && value !== '') {
                formData.append(key, value);
            }
        });

        formData.append('_method', 'PUT');

        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const res = await fetch('/cliente', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': token || '',
                    Accept: 'application/json',
                },
                credentials: 'same-origin',
                body: formData,
            });

            if (!res.ok) {
                const erro = await res.json();
                console.error('❌ Erro:', erro);
                if (erro.errors) setErrors(erro.errors);
                return;
            }

            console.log('Dados atualizados com sucesso!');
        } catch (err) {
            console.error('❌ Erro geral:', err);
        }
    };

    return (
        <DefaultLayout>
            <div className="flex w-full flex-col gap-4 rounded-2xl bg-white sm:h-screen text-gray-600">
                <div className="sticky top-0 left-0 flex w-full items-center justify-between bg-[#0153A5] p-4">
                    <Link href={'painel'} className="gap2 flex items-center text-white">
                        <FaArrowLeft className="text-2xl" />
                    </Link>
                    <h1 className="text-xl font-bold text-white">Configuração da Conta</h1>
                </div>

                <form onSubmit={handleSubmit} encType="multipart/form-data" className="mt-10 space-y-10 pr-4 pl-4">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_2fr]">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-800">Perfil</h2>
                            <p className="text-sm text-gray-500">Detalhes do seu perfil</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div className="space-y-4">
                                {/* NOME */}
                                <div>
                                    <label htmlFor="nome" className="block text-gray-800 font-medium capitalize">
                                        Nome
                                    </label>
                                    <input
                                        id="nome"
                                        name="nome"
                                        type="text"
                                        placeholder={placeholders.nome}
                                        onChange={handleChange}
                                        className="w-full rounded border px-3 py-2"
                                    />
                                    {errors.nome && <p className="text-sm text-red-500">{errors.nome[0]}</p>}
                                </div>

                                {/* SOBRENOME */}
                                <div>
                                    <label htmlFor="sobrenome" className="text-gray-800 block font-medium capitalize">
                                        Sobrenome
                                    </label>
                                    <input
                                        id="sobrenome"
                                        name="sobrenome"
                                        type="text"
                                        placeholder={placeholders.sobrenome}
                                        onChange={handleChange}
                                        className="w-full rounded border px-3 py-2"
                                    />
                                    {errors.sobrenome && <p className="text-sm text-red-500">{errors.sobrenome[0]}</p>}
                                </div>

                                {/* NOME DE USUÁRIO */}
                                <div>
                                    <label htmlFor="nome_usuario" className="text-gray-800 block font-medium capitalize">
                                        Nome de Usuário
                                    </label>
                                    <input
                                        id="nome_usuario"
                                        name="nome_usuario"
                                        type="text"
                                        placeholder={placeholders.nome_usuario}
                                        onChange={handleChange}
                                        className="w-full rounded border px-3 py-2"
                                    />
                                    {errors.nome_usuario && <p className="text-sm text-red-500">{errors.nome_usuario[0]}</p>}
                                </div>

                                {/* NIF */}
                                <div>
                                    <label htmlFor="nif" className="text-gray-800 block font-medium capitalize">
                                        NIF
                                    </label>
                                    <input
                                        id="nif"
                                        name="nif"
                                        type="text"
                                        placeholder={placeholders.nif}
                                        onChange={handleChange}
                                        className="w-full rounded border px-3 py-2"
                                        disabled
                                    />
                                    {errors.nif && <p className="text-sm text-red-500">{errors.nif[0]}</p>}
                                </div>

                                {/* EMAIL */}
                                <div>
                                    <label htmlFor="email" className="text-gray-800 block font-medium capitalize">
                                        Email
                                    </label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder={placeholders.email}
                                        onChange={handleChange}
                                        className="w-full rounded border px-3 py-2"
                                    />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email[0]}</p>}
                                </div>
                            </div>

                            {/* FOTO */}
                            <div className="flex flex-col items-center justify-center gap-4">
                                <div className="h-52 w-52 overflow-hidden rounded-full bg-gray-100 shadow">
                                    {fotoPreview ? (
                                        <img src={fotoPreview} alt="Foto atual" className="h-full w-full object-cover" />
                                    ) : (
                                        <span className="flex h-full items-center justify-center text-sm text-gray-400">Sem foto</span>
                                    )}
                                </div>

                                <div className="text-center">
                                    <h2 className="text-sm text-gray-800 font-semibold">Alterar foto</h2>
                                    <p className="text-xs text-gray-500">Use o botão abaixo para upload</p>
                                    <div>
                                        <input id="foto" name="foto" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                                        <label
                                            htmlFor="foto"
                                            className="mt-2 inline-block cursor-pointer rounded-full bg-[#0153A5] px-4 py-2 text-white hover:bg-blue-700"
                                        >
                                            +
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* OUTRAS INFORMAÇÕES */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_2fr]">
                        <div>
                            <h2 className="text-lg text-gray-800 font-semibold">Outras Informações</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="telefone" className="block font-medium">
                                    Telefone
                                </label>
                                <input
                                    id="telefone"
                                    name="telefone"
                                    type="text"
                                    placeholder={placeholders.telefone}
                                    onChange={handleChange}
                                    className="w-full rounded border px-3 py-2"
                                />
                            </div>
                            <div>
                                <label htmlFor="dataRegistro" className=" text-gray-800 block font-medium">
                                    Data de Registro
                                </label>
                                <input
                                    id="dataRegistro"
                                    name="dataRegistro"
                                    type="date"
                                    defaultValue={placeholders.dataRegistro?.split('T')[0]}
                                    onChange={handleChange}
                                    className="w-full rounded border px-3 py-2"
                                />
                            </div>
                        </div>
                    </div>

                    {/* SENHA */}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-[1fr_2fr]">
                        <div>
                            <h2 className="text-lg font-semibold">Palavra-Passe</h2>
                        </div>
                        <div>
                            <label htmlFor="senha" className="text-gray-800 block font-medium">
                                Palavra-Passe
                            </label>
                            <input
                                id="senha"
                                name="senha"
                                type="password"
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                                placeholder="Digite nova palavra-passe"
                                disabled
                            />
                        </div>
                    </div>

                    {/* BOTÕES */}
                    <div className="mb-10 flex justify-center gap-4 pt-4">
                        <button type="submit" className="w-full rounded-lg bg-[#0153A5] px-6 py-2 font-bold text-white hover:bg-blue-700 sm:w-3/5">
                            Atualizar
                        </button>
                    </div>
                </form>
            </div>
        </DefaultLayout>
    );
}
