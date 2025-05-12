<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" @class(['dark' => ($appearance ?? 'system') == 'dark'])>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    {{-- Inline script to detect system dark mode preference and apply it immediately --}}
    <script>
        (function() {
            const appearance = '{{ $appearance ?? 'system' }}';

            if (appearance === 'system') {
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

                if (prefersDark) {
                    document.documentElement.classList.add('dark');
                }
            }
        })();
    </script>

    {{-- Inline style to set the HTML background color based on our theme in app.css --}}
    <style>
        html {
            background-color: oklch(1 0 0);
        }

        html.dark {
            background-color: oklch(0.145 0 0);
        }
    </style>

    <title inertia>{{ config('app.name', 'Laravel') }}</title>

    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon.svg" type="image/svg+xml">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">

    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />

    @routes
    @viteReactRefresh
    @vite(['resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
    @inertiaHead
</head>

<body class="font-sans antialiased bg-white">
    {{-- @inertia --}}
    <x-header />
    {{-- @hero web --}}
    <section style="background-image: url(img/hero.svg)"
        class="hidden sm:block w-full h-113 bg-container bg-no-repeat bg-center relative top-20">
        <div class="px-15 space-y-5 h-full flex flex-col justify-center items-start">
            <h1 class="text-white w-140 text-3xl font-bold">
                Investir em seguro é investir em você, na sua família e na sua tranquilidade
            </h1>
            <p class="text-white w-140 text-sm">
                Na MediaSeg, protegemos o que realmente importa com planos que cabem no seu bolso e acompanham seu
                estilo de vida.
            </p>
            <x-botao texto="Abrir a Minha Conta" cor="bg-white text-[#003162] font-bold" />
        </div>

    </section>
    {{-- @hero mobile --}}
    <section style="background-image: url(img/heroMobile.svg)"
        class="block sm:hidden w-full max-w-screen h-113 bg-cover bg-no-repeat bg-center relative top-20">
        <div class="sm:px-15 sm:w-[140] w-80 px-5 space-y-5 h-full flex flex-col justify-center items-start">
            <h1 class="text-white sm:text-3xl text-2xl font-bold">
                Investir em seguro é investir em você, na sua família e na sua tranquilidade
            </h1>
            <p class="text-white text-sm">
                Na MediaSeg, protegemos o que realmente importa com planos que cabem no seu bolso e acompanham seu
                estilo de vida.
            </p>
            <x-botao texto="Abrir a Minha Conta" cor="bg-white text-[#003162] font-bold" />
        </div>

    </section>
    {{-- @produtos --}}
    <section class="sm:px-15 px-5 relative top-35 space-y-5 mb-10">

        <div class="space-y-5 ">
            <h1 class="text-2xl font-bold">Aqui, você encontra as melhores soluções em seguros reunidas num só lugar.
            </h1>
            <p class="text-sm">A MediaSeg desenvolveu soluções completas para ajudar você a escolher o seguro ideal, de
                acordo com o seu
                perfil e as suas necessidades.</p>
        </div>

        <div class="flex sm:flex-row flex-col bg-[#0153A5] w-full h-102 sm:h-auto py-10 px-5 items-center relative rounded-2xl">

            <div class="space-y-5 sm:w-3/4 w-full relative sm:top-0 top-45">
                <h1 class="text-xl font-bold text-white">Escolha com conhecimento, não por impulso.</h1>
                <p class="text-white text-xs sm:w-[75%] w-full">Nosso portal oferece conteúdos que te ajudam a entender os seguros e tomar
                    decisões alinhadas com sua
                    realidade.</p>
                <x-botao texto="Começar Agora" cor="bg-white text-[#003162] font-bold" />
            </div>
            <div class="absolute sm:right-0 top-0 sm:w-1/4 sm:h-full w-full h-50 bg-center bg-no-repeat bg-cover  rounded-r-2xl"
                style="background-image: url('img/livro.svg'); min-height: 150px;">
            </div>
        </div>
    </section>
    {{-- @vantagens --}}
    <section class="sm:px-15 px-5 relative top-35 space-y-5 bg-gray-100 py-10">
        <div class="space-y-4 p-6  rounded-lg ">
            <h1 class="text-2xl font-bold text-black">Produtos e Serviços na medida do seu sonho</h1>
            <p class="text-gray-600">Temos uma seleção completa de produtos e serviços pensados para proteger o que é
                seu e garantir tranquilidade no presente e no futuro.</p>
        </div>
        <div class="grid sm:grid-cols-2 sm:grid-rows-2 grid-cols-1 grid-rows-4 gap-4">
            <x-value titulo="Consultoria Personalizada"
                descricao="Identificamos suas necessidades e sugerimos os seguros mais adequados ao seu perfil."
                link="#" icon="healthicons-f-call-centre" />
            <x-value titulo="Educação Sobre Seguros"
                descricao="Explicamos como cada tipo de seguro funciona, suas coberturas, benefícios e importância para o seu dia a dia."
                link="#" icon="iconsax-bol-teacher" />
            <x-value titulo="Facilidade na Contratação"
                descricao="Atuamos como ponte entre você e as principais seguradoras de Angola." link="#"
                icon="hugeicons-give-blood" />
            <x-value titulo="Acompanhamento Contínuo" descricao="Oferecemos suporte em renovações, ajustes e sinistros."
                link="#" icon="tabler-inner-shadow-bottom-f" />
        </div>
        <div>
            <div class="flex bg-[#0153A5] w-full py-5 px-5 items-center relative rounded-2xl ">

                <div class="space-y-5 w-3/4">
                    <h1 class="text-xl font-bold text-white">Receba conteúdos gratuitos por e-mail</h1>
                    <p class="text-white w-[75%]">Cadastre-se e receba nossos relatórios, recomendações de seguros e
                        muito mais.</p>
                    <x-botao texto="Começar a receber" cor="bg-white text-[#003162] font-bold" />
                </div>
                <div class="absolute right-15 w-35 h-35 bg-center bg-no-repeat bg-cover  rounded-full "
                    style="background-image: url('img/email.svg');">
                </div>
            </div>
        </div>
    </section>
    <section class="sm:px-15 px-5 py-10 relative top-35 space-y-5 ">
        <h1 class="text-2xl font-bold text-black">Os melhores conteúdos sobre Seguros</h1>
        <p>Aprenda tudo o que você precisa saber para aprofundar seus conhecimentos sobre o mercado de seguro e como
            investir com estratégia.</p>

        <div class="flex flex-col sm:flex-row gap-4 pb-10">
            <x-content titulo="O Que É Um Seguro e Por Que 
Você Deve Ter Um?" imagem="" link="" />
            <x-content titulo="O Que É Um Seguro e Por Que 
Você Deve Ter Um?" imagem="" link="" />
            <x-content titulo="O Que É Um Seguro e Por Que 
Você Deve Ter Um?" imagem="" link="" />
            <x-content titulo="O Que É Um Seguro e Por Que 
Você Deve Ter Um?" imagem="" link="" />
        </div>
    </section>


    <x-footer />


</body>

</html>
