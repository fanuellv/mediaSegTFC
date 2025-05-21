import Botao from '@/components/uiMediaseg/botao';
import Value from '@/components/uiMediaseg/value';
import Cabecalho from '@/components/uiMediaseg/header';
//import { type SharedData } from '@/types';
//import { Head, Link, usePage } from '@inertiajs/react';
import { Head, Link } from '@inertiajs/react';


import { IoSchool } from "react-icons/io5";
import { TbMoodSmileFilled } from "react-icons/tb";
import { PiPersonSimpleHikeFill } from "react-icons/pi";
import { RiCustomerService2Fill } from "react-icons/ri";


import  Content from '@/components/uiMediaseg/content';
import  Rodape from '@/components/uiMediaseg/footer';

/*<header className="mb-6 w-full max-w-[335px] text-sm not-has-[nav]:hidden lg:max-w-4xl">
                    <nav className="flex items-center justify-end gap-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </nav>
                </header> */

export default function Welcome() {
    return (
        <>
            <Head title="MediaSeg">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link rel="icon" href="/public/mediaSeg.ico" type="image/x-icon" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <div className="flex min-h-screen flex-col bg-[#FDFDFC]  dark:bg-[#0a0a0a]">
                <Cabecalho/>
                <section
                    style={{backgroundImage: `url("/img/hero.svg")`}}
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

                <section style={{backgroundImage: 'url(img/heroMobile.svg)'}}
        className="block sm:hidden w-full max-w-screen h-113 bg-cover bg-no-repeat bg-center relative top-20">
        <div className="sm:px-15 sm:w-[140] w-80 px-5 space-y-5 h-full flex flex-col justify-center items-start">
            <h1 className="text-white sm:text-3xl text-2xl font-bold">
                Investir em seguro é investir em você, na sua família e na sua tranquilidade
            </h1>
            <p className="text-white text-sm">
                Na MediaSeg, protegemos o que realmente importa com planos que cabem no seu bolso e acompanham seu
                estilo de vida.
            </p>
            <Link href={route('cadastro')}>
                <Botao texto="Abrir a Minha Conta" cor="bg-white text-[#003162] font-bold" />
            </Link>
        </div>

    </section>

    
    <section className="sm:px-15 px-5 relative top-35 space-y-5 mb-10">

        <div className="space-y-5 ">
            <h1 className="text-2xl font-bold">Aqui, você encontra as melhores soluções em seguros reunidas num só lugar.
            </h1>
            <p className="text-sm">A MediaSeg desenvolveu soluções completas para ajudar você a escolher o seguro ideal, de
                acordo com o seu
                perfil e as suas necessidades.</p>
        </div>

        <div className="flex sm:flex-row flex-col bg-[#0153A5] w-full h-102 sm:h-auto py-10 px-5 items-center relative rounded-2xl">

            <div className="space-y-5 sm:w-3/4 w-full relative sm:top-0 top-45">
                <h1 className="text-xl font-bold text-white">Escolha com conhecimento, não por impulso.</h1>
                <p className="text-white text-xs sm:w-[75%] w-full">Nosso portal oferece conteúdos que te ajudam a entender os seguros e tomar
                    decisões alinhadas com sua
                    realidade.</p>
                    <Link href={route('cadastro')}>
                    <Botao texto="Começar Agora" cor="bg-white text-[#003162] font-bold" />
                    </Link>
                
            </div>
            <div className="absolute sm:right-0 top-0 sm:w-1/4 sm:h-full w-full h-50 bg-center bg-no-repeat bg-cover  rounded-r-2xl"
                style={{backgroundImage: `url('/img/livro.svg')`, 
                    minHeight: "150px",}}>
            </div>
        </div>
    </section>


    <section className="sm:px-15 px-5 relative top-35 space-y-5 bg-gray-100 py-10">
        <div className="space-y-4 p-6  rounded-lg ">
            <h1 className="text-2xl font-bold text-black">Produtos e Serviços na medida do seu sonho</h1>
            <p className="text-gray-600">Temos uma seleção completa de produtos e serviços pensados para proteger o que é
                seu e garantir tranquilidade no presente e no futuro.</p>
        </div>
        <div className="grid sm:grid-cols-2 sm:grid-rows-2 grid-cols-1 grid-rows-4 gap-4">
            <Value titulo="Consultoria Personalizada"
                descricao="Identificamos suas necessidades e sugerimos os seguros mais adequados ao seu perfil."
                link={route('consultoria')} icon={RiCustomerService2Fill} />
            <Value titulo="Educação Sobre Seguros"
                descricao="Explicamos como cada tipo de seguro funciona, suas coberturas, benefícios e importância para o seu dia a dia."
                link={route('educacao')} icon={IoSchool} />
            <Value titulo="Facilidade na Contratação"
                descricao="Atuamos como ponte entre você e as principais seguradoras de Angola." link={route('facilidade')}
                icon={TbMoodSmileFilled} />
            <Value titulo="Acompanhamento Contínuo" descricao="Oferecemos suporte em renovações, ajustes e sinistros."
                link={route('acompanhamento')} icon={ PiPersonSimpleHikeFill} />
        </div>
        <div>
            <div className="flex bg-[#0153A5] w-full py-5 px-5 items-center relative rounded-2xl ">

                <div className="space-y-5 w-3/4">
                    <h1 className="text-xl font-bold text-white">Receba conteúdos gratuitos por e-mail</h1>
                    <p className="text-white w-[75%]">Cadastre-se e receba nossos relatórios, recomendações de seguros e
                        muito mais.</p>
                    <Botao texto="Começar a receber" cor="bg-white text-[#003162] font-bold" />
                </div>
                <div className="absolute right-15 w-35 h-35 bg-center bg-no-repeat bg-cover  rounded-full "
                    style={{backgroundImage: `url('/img/email.svg')`, 
                        minHeight: "100px",}}>
                </div>
            </div>
        </div>
    </section>

    <section className="sm:px-15 px-5 py-10 relative top-35 space-y-5 ">
        <h1 className="text-2xl font-bold text-black">Os melhores conteúdos sobre Seguros</h1>
        <p>Aprenda tudo o que você precisa saber para aprofundar seus conhecimentos sobre o mercado de seguro e como
            investir com estratégia.</p>

        <div className="flex flex-col sm:flex-row gap-4 pb-10">
            <Content titulo="O Que É Um Seguro e Por Que 
Você Deve Ter Um?"  />
            <Content titulo="O Que É Um Seguro e Por Que 
Você Deve Ter Um?"  />
            <Content titulo="O Que É Um Seguro e Por Que 
Você Deve Ter Um?"  />
            <Content titulo="O Que É Um Seguro e Por Que 
Você Deve Ter Um?"  />
        </div>
    </section>
   <Rodape/>
            </div>
        </>
    );
}
