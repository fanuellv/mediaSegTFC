import Rodape from '@/components/uiMediaseg/footer';
import Cabecalho from '@/components/uiMediaseg/header';

const ServicoEducacao: React.FC = () => {
    return (
        <div className="flex h-screen w-full flex-col">
            <Cabecalho />
            <section
                style={{ backgroundImage: `url("/img/servico/facilidade.svg")` }}
                className="relative mt-20 hidden h-60 min-h-60 w-full bg-cover bg-center bg-no-repeat sm:block"
            ></section>

            <div className="relative mt-10 space-y-4 px-15">
                <h1 className="text-2xl font-bold text-[#0153A5]">Facilidade na Contratação</h1>
                <p>
                Com poucos cliques, você compara planos, escolhe a apólice ideal e conclui a contratação sem sair da plataforma. Somos o elo entre você e as principais seguradoras de Angola, garantindo rapidez, transparência e simplicidade em todo o processo.
                </p>
                <div className="space-y-4 rounded-2xl bg-gray-200 p-10">
                    <h1 className="font-bold">Características:</h1>
                    <ul className="list-disc space-y-2 pl-5 text-base text-gray-700">
                        <li className="hover:text-primary transition duration-200">Plataforma 100% digital</li>
                        <li className="hover:text-primary transition duration-200">Cotação e contratação no mesmo ambiente</li>
                        <li className="hover:text-primary transition duration-200">Parceria com seguradoras reconhecidas</li>
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
