import DefaultLayout from '@/layouts/DefaultLayout';
import { useState } from 'react';
import { FaIdCard } from 'react-icons/fa';
import { IoMdPhonePortrait } from 'react-icons/io';
import { MdDateRange, MdDriveFileRenameOutline, MdOutlineMailOutline, MdOutlinePassword } from 'react-icons/md';
import logoWhite from '/public/img/logoWhite.svg';

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

export default function CriarCliente() {
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

    const [fotoPreview, setFotoPreview] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setForm((prev) => ({ ...prev, foto: file }));
            setFotoPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(form).forEach(([key, value]) => {
            if (key === 'foto' && value instanceof File) {
                formData.append('foto', value);
            } else {
                formData.append(key, value as string);
            }
        });

        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            const res = await fetch('/cliente', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': token || '',
                    Accept: 'application/json',
                },
                body: formData,
            });

            if (!res.ok) {
                const erro = await res.text();
                console.error('❌ Erro ao criar cliente:', erro);
                return;
            }

            console.log('✅ Cliente criado com sucesso!');
        } catch (err) {
            console.error('❌ Erro geral:', err);
        }
    };

    return (
        <DefaultLayout>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex min-h-screen w-full flex-col bg-white sm:flex-row">
                {/* Lado esquerdo (logo + foto) */}
                <div className="flex flex-col items-center justify-center gap-6 bg-[#0153A5] p-10 text-white sm:w-2/5">
                    <img  src={logoWhite} alt="Logo" className="w-50 sm:absolute sm:top-10 sm:left-0" />

                    <div className="flex flex-col items-center text-center">
                        <div className="h-52 w-52 overflow-hidden rounded-full bg-gray-100">
                            {fotoPreview ? (
                                <img src={fotoPreview} alt="Preview da foto" className="h-full w-full object-cover" />
                            ) : (
                                <span className="flex h-full items-center justify-center text-sm text-gray-400">Sem foto</span>
                            )}
                        </div>
                        <h2 className="mt-4 text-lg font-semibold">Adicionar foto</h2>
                        <p className="mb-2 text-sm font-light">Utilize o botão abaixo para fazer upload da sua foto</p>
                        <div>
                            <input id="foto" name="foto" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

                            <label
                                htmlFor="foto"
                                className="inline-block cursor-pointer rounded-lg bg-white px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                            >
                                +
                            </label>
                        </div>
                    </div>
                </div>

                {/* Lado direito (formulário) */}
                <div className="flex flex-col justify-center gap-6 p-10 sm:w-3/5">
                    <div >
                        <h1 className="text-2xl font-bold text-[#0153A5]">Registrar-se</h1>
                        <p className="text-sm">
                            Já tens conta? <span className="cursor-pointer text-blue-600 underline">Iniciar Sessão</span>
                        </p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className='flex gap-2'>
                            <label htmlFor="nome" className="flex items-center gap-2  font-medium">
                                <MdDriveFileRenameOutline />
                            </label>
                            <input
                                name="nome"
                                value={form.nome}
                                onChange={handleChange}
                                placeholder="Nome"
                                className="input w-full rounded border p-2 text-sm"
                            />
                        </div>

                        <div className='flex gap-2'>
                            <label htmlFor="sobrenome" className="flex items-center gap-2 text-sm font-medium">
                                <MdDriveFileRenameOutline />
                            </label>
                            <input
                                name="sobrenome"
                                value={form.sobrenome}
                                onChange={handleChange}
                                placeholder="Sobrenome"
                                className="input w-full rounded border p-2 text-sm"
                            />
                        </div>

                        <div className='flex gap-2'>
                            <label htmlFor="nome_usuario" className="flex items-center gap-2 text-sm font-medium">
                                <MdDriveFileRenameOutline />
                            </label>
                            <input
                                name="nome_usuario"
                                value={form.nome_usuario}
                                onChange={handleChange}
                                placeholder="Nome de Usuário"
                                className="input w-full rounded border p-2 text-sm"
                            />
                        </div>

                        

                        <div className='flex gap-2'>
                            <label htmlFor="dataRegistro" className="flex items-center gap-2 text-sm font-medium">
                                <MdDateRange />
                            </label>
                            <input
                                name="dataRegistro"
                                type="date"
                                value={form.dataRegistro}
                                onChange={handleChange}
                                className="input w-full rounded border p-2 text-sm"
                            />
                        </div>

                        <div className='flex gap-2'>
                            <label htmlFor="nif" className="flex items-center gap-2 text-sm font-medium">
                                <FaIdCard />
                            </label>
                            <input
                                name="nif"
                                value={form.nif}
                                onChange={handleChange}
                                placeholder="NIF"
                                className="input w-full rounded border p-2 text-sm"
                            />
                        </div>

                        <div className='flex gap-2'>
                            <label htmlFor="telefone" className="flex items-center gap-2 text-sm font-medium">
                                <IoMdPhonePortrait /> 
                            </label>
                            <input
                                name="telefone"
                                value={form.telefone}
                                onChange={handleChange}
                                placeholder="Telefone"
                                className="input w-full rounded border p-2 text-sm"
                            />
                        </div>

                        
                    </div>
                    <div className='flex gap-2'>
                            <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                                <MdOutlineMailOutline />
                            </label>
                            <input
                                name="email"
                                type="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="input w-full rounded border p-2 text-sm"
                            />
                        </div>
                    <div className='flex gap-2'>
                            <label htmlFor="senha" className="flex items-center gap-2 text-sm font-medium">
                                <MdOutlinePassword />
                            </label>
                            <input
                                name="senha"
                                type="password"
                                value={form.senha}
                                onChange={handleChange}
                                placeholder="Senha"
                                className="input w-full rounded border p-2 text-sm"
                            />
                        </div>
                    <button type="submit" className="mt-4 w-full rounded bg-[#0153A5] px-6 py-2 text-white transition hover:bg-[#013f80] sm:w-auto">
                        Criar Conta
                    </button>
                </div>
            </form>
        </DefaultLayout>
    );
}
