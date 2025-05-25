import Rodape from '@/components/uiMediaseg/footer';
import Cabecalho from '@/components/uiMediaseg/header';

const ServicoEducacao: React.FC = () => {
    return (
        <div className="flex h-screen w-full flex-col">
            <Cabecalho />
            <section
                style={{ backgroundImage: `url("/img/servico/acompanhamento.svg")` }}
                className="relative mt-20 hidden h-60 min-h-60 w-full bg-cover bg-center bg-no-repeat sm:block"
            ></section>

            <div className="relative mt-10 space-y-4 px-15">
                <h1 className="text-2xl font-bold text-[#0153A5]">Acompanhamento Contínuo</h1>
                <p>
                Mesmo após contratar o seguro, continuamos ao seu lado. A plataforma oferece suporte em renovações, ajustes na apólice e abertura de sinistros, sempre com atendimento rápido e eficiente.

                </p>
                <div className="space-y-4 rounded-2xl bg-gray-200 p-10">
                    <h1 className="font-bold">Características:</h1>
                    <ul className="list-disc space-y-2 pl-5 text-base text-gray-700">
                        <li className="hover:text-primary transition duration-200">Painel do cliente com alertas de renovação</li>
                        <li className="hover:text-primary transition duration-200">Suporte digital para ajustes e atualizações</li>
                        <li className="hover:text-primary transition duration-200">Assistência em caso de sinistros</li>
                    </ul>
                </div>
            </div>
            <section>
                
                    <Rodape />
                
            </section>
        </div>
    );
};

export default ServicoEducacao;
