import Rodape from '@/components/uiMediaseg/footer';
import Cabecalho from '@/components/uiMediaseg/header';

const ServicoEducacao: React.FC = () => {
    return (
        <div className="flex w-full flex-col">
            <Cabecalho />

            {/* Padding-top para compensar o header fixo (80px = h-20) */}
            <div className="pt-20">
                <section
                    style={{ backgroundImage: `url("/img/servico/acompanhamento.svg")` }}
                    className="h-42 w-full bg-cover sm:bg-center bg-no-repeat sm:h-72"
                ></section>

                <div className="mt-10 space-y-4 px-4 sm:px-8">
                    <h1 className="text-2xl font-bold text-[#0153A5]">Acompanhamento Contínuo</h1>
                    <p className='text-gray-700'>
                        Mesmo após contratar o seguro, continuamos ao seu lado. A plataforma oferece suporte em renovações,
                        ajustes na apólice e abertura de sinistros, sempre com atendimento rápido e eficiente.
                    </p>

                    <div className="space-y-4 rounded-2xl bg-gray-200 p-6 sm:p-10">
                        <h2 className="font-bold text-black">Características:</h2>
                        <ul className="list-disc space-y-2 pl-5 text-base text-gray-700">
                            <li className="transition duration-200 hover:text-primary">
                                Painel do cliente com alertas de renovação
                            </li>
                            <li className="transition duration-200 hover:text-primary">
                                Suporte digital para ajustes e atualizações
                            </li>
                            <li className="transition duration-200 hover:text-primary">
                                Assistência em caso de sinistros
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <Rodape />
        </div>
    );
};

export default ServicoEducacao;
