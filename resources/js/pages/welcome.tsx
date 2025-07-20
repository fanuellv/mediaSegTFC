import { useEffect, useState } from 'react';
import DefaultLayout from '@/layouts/DefaultLayout';
import Loader from '@/components/uiMediaseg/Loader';

import Botao from '@/components/uiMediaseg/botao';
import Cabecalho from '@/components/uiMediaseg/header';
import Value from '@/components/uiMediaseg/value';
import NovoEmail from '@/components/ui/NovoEmail';
//import { type SharedData } from '@/types';
//import { Head, Link, usePage } from '@inertiajs/react';
import { Head, Link } from '@inertiajs/react';



import { IoSchool } from 'react-icons/io5';
import { PiPersonSimpleHikeFill } from 'react-icons/pi';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { TbMoodSmileFilled } from 'react-icons/tb';

//import Content from '@/components/uiMediaseg/content';
import Rodape from '@/components/uiMediaseg/footer';

export default function Welcome() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timeout);
    }, []);

    if (loading) return <Loader />;

    return (
        <>
            <Head title="MediaSeg">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link rel="icon" href="/public/mediaSeg.ico" type="image/x-icon" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <DefaultLayout>
                <div className="flex min-h-screen flex-col bg-white">
                    <Cabecalho />
                    <section
                        style={{ backgroundImage: `url("/img/hero.svg")` }}
                        className="bg-container relative top-20 hidden h-113 w-full bg-center bg-no-repeat sm:block"
                    >
                        <div className="flex h-full flex-col items-start justify-center space-y-5 px-15">
                            <h1 className="w-140 text-3xl font-bold text-white">
                                Investir em seguro é investir em você, na sua família e na sua tranquilidade
                            </h1>
                            <p className="w-140 text-sm text-white">
                                Na MediaSeg, protegemos o que realmente importa com planos que cabem no seu bolso e acompanham seu estilo de vida.
                            </p>
                            <Link href={route('cadastro')}>
                                <Botao texto="Abrir a Minha Conta" cor="bg-white text-[#003162] font-bold" />
                            </Link>
                        </div>
                    </section>

                    <section
                        style={{ backgroundImage: 'url(img/heroMobile.svg)' }}
                        className="relative top-20 block h-113 w-full max-w-screen bg-cover bg-center bg-no-repeat sm:hidden"
                    >
                        <div className="flex h-full w-80 flex-col items-start justify-center space-y-5 px-5 sm:w-[140] sm:px-15">
                            <h1 className="text-2xl font-bold text-white sm:text-3xl">
                                Investir em seguro é investir em você, na sua família e na sua tranquilidade
                            </h1>
                            <p className="text-sm text-white">
                                Na MediaSeg, protegemos o que realmente importa com planos que cabem no seu bolso e acompanham seu estilo de vida.
                            </p>
                            <Link href={route('cadastro')}>
                                <Botao texto="Abrir a Minha Conta" cor="bg-white text-[#003162] font-bold" />
                            </Link>
                        </div>
                    </section>

                    <section className="relative top-35 mb-10 space-y-5 px-5 sm:px-15">
                        <div className="space-y-5">
                            <h1 className="text-2xl font-bold">Aqui, você encontra as melhores soluções em seguros reunidas num só lugar.</h1>
                            <p className="text-sm">
                                A MediaSeg desenvolveu soluções completas para ajudar você a escolher o seguro ideal, de acordo com o seu perfil e as
                                suas necessidades.
                            </p>
                        </div>

                        <div className="relative flex h-102 w-full flex-col items-center rounded-2xl bg-[#0153A5] px-5 py-10 sm:h-auto sm:flex-row">
                            <div className="relative top-45 w-full space-y-5 sm:top-0 sm:w-3/4">
                                <h1 className="text-xl font-bold text-white">Escolha com conhecimento, não por impulso.</h1>
                                <p className="w-full text-xs text-white sm:w-[75%]">
                                    Nosso portal oferece conteúdos que te ajudam a entender os seguros e tomar decisões alinhadas com sua realidade.
                                </p>
                                <Link href={route('cadastro')}>
                                    <Botao texto="Começar Agora" cor="bg-white text-[#003162] font-bold" />
                                </Link>
                            </div>
                            <div
                                className="absolute top-0 h-50 w-full rounded-r-2xl bg-cover bg-center bg-no-repeat sm:right-0 sm:h-full sm:w-1/4"
                                style={{ backgroundImage: `url('/img/livro.svg')`, minHeight: '150px' }}
                            ></div>
                        </div>
                    </section>

                    <section className="relative top-35 space-y-5 bg-gray-100 px-5 py-10 sm:px-15">
                        <div className="space-y-4 rounded-lg p-6">
                            <h1 className="text-2xl font-bold text-black">Produtos e Serviços na medida do seu sonho</h1>
                            <p className="text-gray-600">
                                Temos uma seleção completa de produtos e serviços pensados para proteger o que é seu e garantir tranquilidade no
                                presente e no futuro.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 grid-rows-4 gap-4 sm:grid-cols-2 sm:grid-rows-2">
                            <Value
                                titulo="Consultoria Personalizada"
                                descricao="Identificamos suas necessidades e sugerimos os seguros mais adequados ao seu perfil."
                                link={route('consultoria')}
                                icon={RiCustomerService2Fill}
                            />
                            <Value
                                titulo="Educação Sobre Seguros"
                                descricao="Explicamos como cada tipo de seguro funciona, suas coberturas, benefícios e importância para o seu dia a dia."
                                link={route('educacao')}
                                icon={IoSchool}
                            />
                            <Value
                                titulo="Facilidade na Contratação"
                                descricao="Atuamos como ponte entre você e as principais seguradoras de Angola."
                                link={route('facilidade')}
                                icon={TbMoodSmileFilled}
                            />
                            <Value
                                titulo="Acompanhamento Contínuo"
                                descricao="Oferecemos suporte em renovações, ajustes e sinistros."
                                link={route('acompanhamento')}
                                icon={PiPersonSimpleHikeFill}
                            />
                        </div>
                        <div>
                            <div className="relative flex w-full items-center rounded-2xl bg-[#0153A5] px-5 py-5">
                                <div className="w-3/4 space-y-5">
                                    <h1 className="text-xl font-bold text-white">Receba conteúdos gratuitos por e-mail</h1>
                                    <p className="w-[75%] text-white">
                                        Cadastre-se e receba nossos relatórios, recomendações de seguros e muito mais.
                                    </p>
                                    <NovoEmail/>
                                </div>
                                <div
                                    className="absolute right-15 h-35 w-35 rounded-full bg-cover bg-center bg-no-repeat"
                                    style={{ backgroundImage: `url('/img/email.svg')`, minHeight: '100px' }}
                                ></div>
                            </div>
                        </div>
                    </section>

                    
                    <Rodape />
                </div>
            </DefaultLayout>
        </>
    );
}
