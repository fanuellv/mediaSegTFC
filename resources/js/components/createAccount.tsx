import React, { useState } from 'react';
import logo from '/public/img/logoWhite.svg';
import user from '/public/img/user.svg';



import { BsTelephone } from 'react-icons/bs';
import { CgMail } from 'react-icons/cg';
import { FaRegUser } from 'react-icons/fa';
import { FaIdCard, FaPlus } from 'react-icons/fa6';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { TbLockPassword } from "react-icons/tb";
import { Link } from '@inertiajs/react';

const CreateAccount: React.FC = () => {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="flex h-screen w-full">
            {/* Seção de Conteúdo */}
            <div className="flex h-full w-2/5 flex-col items-center space-y-6 bg-[#0153A5] p-10 text-white">
                <img src={logo} alt="" style={{ width: '200px', height: 'auto', maxWidth: '100%' }} />
                <div className="flex h-80 w-80 items-center justify-center overflow-hidden rounded-full bg-gray-200">
                    {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="h-full w-full object-cover" />
                    ) : (
                        <img src={user} alt="Preview" className="h-full w-full object-cover" />
                    )}
                </div>
                <form className="flex flex-col items-center space-y-3">
                    <label htmlFor="fileUpload" className="text-2xl font-bold">
                        Adicione a sua Foto
                    </label>
                    <input type="file" id="fileUpload" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    <span className="w-60 text-center text-sm font-extralight">
                        Utilize o botão a baixo para fazer o upload da sua fotgráfia de perfil
                    </span>
                    <label
                        htmlFor="fileUpload"
                        className="flex h-15 w-15 cursor-pointer items-center rounded-full bg-white p-2 text-2xl font-bold text-[#0153A5]"
                    >
                        <FaPlus className="relative w-15" />
                    </label>
                </form>
            </div>

            {/* Seção de cadastro */}
            <div className="flex h-screen w-3/5 flex-col justify-center space-y-4 px-20  text-gray-700">
                <div className="mb-10 flex items-center space-x-2">
                    <h1 className="text-3xl font-bold text-[#0153A5]">Registrar-se</h1>
                    <p className="pt-2 text-sm">
                        Já tens Conta? <a className="text-blue-400 underline" href={route('iniciar')}>Iniciar Sessão</a>
                    </p>
                </div>
                <form action="" className="space-y-4">
                    <div className="flex w-full gap-4">
                        <div className="flex w-1/2 items-center">
                            <input type="text" className="w-full rounded border-b border-b-gray-300 px-4 py-2" placeholder="Nome" />
                            <span className="absolute right-115 text-gray-400">
                                <MdDriveFileRenameOutline />
                            </span>
                        </div>
                        <div className="flex w-1/2 items-center">
                            <input type="text" className="w-full rounded border-b border-b-gray-300 px-4 py-2" placeholder="Sobrenome" />
                            <span className="absolute right-25 text-gray-400">
                                <MdDriveFileRenameOutline />
                            </span>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input type="text" className="w-full rounded border-b border-b-gray-300 px-4 py-2" placeholder="Nome de usuário" />
                        <span className="absolute right-25 text-gray-400">
                            <FaRegUser />
                        </span>
                    </div>
                    <div className="flex items-center">
                        <input type="text" className="w-full rounded border-b border-b-gray-300 px-4 py-2" placeholder="NIF ou Nº BI" />
                        <span className="absolute right-25 text-gray-400">
                            <FaIdCard />
                        </span>
                    </div>
                    <div className="flex items-center">
                        <input type="email" className="w-full rounded border-b border-b-gray-300 px-4 py-2" placeholder="Email" />
                        <span className="absolute right-25 text-gray-400">
                            <CgMail />
                        </span>
                    </div>
                    <div className="flex w-full gap-4">
                        <div className="flex w-1/2 items-center">
                            <input type="tel" className="w-full rounded border-b border-b-gray-300 px-4 py-2" placeholder="Telefone" />
                            <span className="absolute right-115 text-gray-400">
                                <BsTelephone />
                            </span>
                        </div>

                        <div className="flex w-1/2 items-center">
                            <label htmlFor="" className="w-1/2">
                                Data de Nascimento
                            </label>
                            <div className="w-1/2">
                                <input type="date" className="w- rounded border-b border-b-gray-300 px-4 py-2" placeholder="Data Nascimento" />
                                <span className="absolute right-65 text-gray-400"></span>
                            </div>
                        </div>
                    </div>

                    <div className='flex items-center'>
                        <input type="password" className="w-full rounded border-b border-b-gray-300 px-4 py-2" placeholder="Palavra-passe" />
                        <span className="absolute right-25 text-gray-400"><TbLockPassword /></span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <input type="checkbox" id="remember" />
                        <label htmlFor="remember" className="text-xs text-gray-600">
                            Ao criar uma conta devo concordar com os <span className="text-blue-400 underline">termos de serviço</span> e{' '}
                            <span className="text-blue-400 underline">politicas de uso</span>.
                        </label>
                    </div>
                    <div className='flex gap-4'>
                    <button type="submit" className="rounded bg-[#0153A5] px-4 py-2 font-semibold text-white">
                        Criar Conta
                    </button>
                    <Link href={route('home')}>
                    <button type="button" className="rounded bg-gray-200 px-4 py-2 font-semibold text-[#0153A5]">Voltar</button>
                    </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAccount;
