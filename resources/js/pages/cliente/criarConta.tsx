import DefaultLayout from '@/layouts/DefaultLayout';
import { useState } from 'react';
import { FaIdCard } from 'react-icons/fa';
import { IoMdPhonePortrait } from 'react-icons/io';
import { MdDateRange, MdDriveFileRenameOutline, MdOutlineMailOutline, MdOutlinePassword } from 'react-icons/md';
import logoWhite from '/public/img/logoWhite.svg';
import { Link } from '@inertiajs/react';


interface ClienteForm {
    nome: string;
    sobrenome: string;
    nome_usuario: string;
    email: string;
    dataRegistro: string;
    nif: string;
    senha: string;
    telefone: string;
    foto?: File | null;
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
    const [errors, setErrors] = useState<Record<string, string[]>>({});


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
          if (key === 'foto') {
            if (value instanceof File) {
                formData.append('foto', value);
            }
            // não faz nada se foto for null
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
              const erro = await res.json();
              console.error('❌ Erro ao criar cliente:', erro);
              if (erro.errors) {
                  setErrors(erro.errors);
              }
              return;
          }
          

            console.log('✅ Cliente criado com sucesso!');
            window.location.href = '/iniciar-sessao';
        } catch (err) {
            console.error('❌ Erro geral:', err);
        }
    };

    return (
        <DefaultLayout>
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="flex min-h-screen w-full flex-col bg-white sm:flex-row">
                {/* Lado esquerdo (logo + foto) */}
                <div className="flex flex-col items-center justify-center gap-6 bg-[#0153A5] p-10 text-white sm:w-2/5">
                    <img src={logoWhite} alt="Logo" className="absolute sm:top-10 sm:left-0 sm:w-50 w-40 top-5 right-0" />

                    <div className="flex flex-row items-center text-center sm:flex-col gap-2">
                        <div className="h-52 w-52 overflow-hidden rounded-full bg-gray-100">
                            {fotoPreview ? (
                                <img src={fotoPreview} alt="Preview da foto" className="h-full w-full object-cover" />
                            ) : (
                                <span className="flex h-full items-center justify-center text-sm text-gray-400">Sem foto</span>
                            )}
                        </div>
                        <div className='text-left sm:text-center'>
                            <h2 className="mt-4 text-lg font-semibold">Adicionar foto</h2>
                            <p className="mb-2 sm:text-sm text-xs font-light">Utilize o botão abaixo para fazer upload da sua foto</p>
                            <div>
                                <input id="foto" name="foto" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />

                                <label
                                    htmlFor="foto"
                                    className="inline-block cursor-pointer rounded-full bg-white px-4 py-2 text-2xl font-medium text-[#0153A5] transition hover:bg-blue-400 hover:text-white"
                                >
                                    +
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Lado direito (formulário) */}
                <div className="flex flex-col justify-center gap-6 p-10 sm:w-3/5">
                    <div className="flex items-center gap-2">
                        <h1 className="text-3xl font-bold text-[#0153A5]">Registrar-se</h1>
                        <p className="text-sm text-black">
                            Já tens conta? <Link href={route('login')}><span className="cursor-pointer text-blue-500 underline">Iniciar Sessão</span></Link>
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-gray-600 sm:grid-cols-2">
                        <div className="flex gap-2">
                            <label htmlFor="nome" className="flex items-center gap-2 font-medium">
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
                        {errors.nome && <p className="text-sm text-red-500">{errors.nome[0]}</p>}


                        <div className="flex gap-2">
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
                        {errors.sobrenome && <p className="text-sm text-red-500">{errors.sobrenome[0]}</p>}

                        <div className="flex gap-2">
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
                        {errors.nome_usuario && <p className="text-sm text-red-500">{errors.nome_usuario[0]}</p>}

                        <div className="flex gap-2">
                            <label htmlFor="dataRegistro" className="flex text-gray-600 items-center gap-2 text-sm font-medium">
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
                        {errors.dataRegistro && <p className="text-sm text-red-500">{errors.dataRegistro[0]}</p>}

                        <div className="flex gap-2">
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
                        {errors.nif && <p className="text-sm text-red-500">{errors.nif[0]}</p>}


                        <div className="flex gap-2">
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
                        {errors.telefone && <p className="text-sm text-red-500">{errors.telefone[0]}</p>}

                    </div>
                    <div className="flex gap-2 text-gray-600">
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
                    {errors.email && <p className="text-sm text-red-500">{errors.email[0]}</p>}

                    <div className="flex gap-2 text-gray-600">
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
                    {errors.senha && <p className="text-sm text-red-500">{errors.senha[0]}</p>}

                    <button type="submit" className="mt-4 rounded bg-[#0153A5] px-4 py-2 font-bold text-white transition hover:bg-blue-600 sm:w-50">
                        Criar Conta
                    </button>
                </div>
            </form>
        </DefaultLayout>
    );
}
