import Rodape from '@/components/uiMediaseg/footer';
import Cabecalho from '@/components/uiMediaseg/header';

const ServicoConsultoria: React.FC = () => {
    return (
        <div className="flex h-screen w-full flex-col">
            <Cabecalho />
            <section
                style={{ backgroundImage: `url("/img/servico/consultoria.svg")` }}
                className="relative mt-20 hidden h-60 min-h-60 w-full bg-cover bg-center bg-no-repeat sm:block"
            ></section>

            <div className="relative mt-10 space-y-4 px-15">
                <h1 className="text-2xl font-bold text-[#0153A5]">Consultoria Personalizada</h1>
                <p>
                Se preferir um atendimento mais direto, oferecemos a consultoria personalizada como um serviço adicional. Um especialista analisa o seu perfil e te ajuda a escolher a apólice ideal para sua situação.


                </p>
                <div className="space-y-4 rounded-2xl bg-gray-200 p-10">
                    <h1 className="font-bold">Características:</h1>
                    <ul className="list-disc space-y-2 pl-5 text-base text-gray-700">
                        <li className="hover:text-primary transition duration-200">Atendimento 1:1 com consultor especializado</li>
                        <li className="hover:text-primary transition duration-200">Recomendação sob medida</li>
                        <li className="hover:text-primary transition duration-200">Suporte completo na escolha da apólice</li>
                    </ul>
                </div>
            </div>
            <section>
                <div>
                    <Rodape />
                </div>
            </section>
        </div>
    );
};

export default ServicoConsultoria;
