import Rodape from '@/components/uiMediaseg/footer';
import Cabecalho from '@/components/uiMediaseg/header';

const ServicoEducacao: React.FC = () => {
    return (
        <div className="flex h-screen w-full flex-col">
            <Cabecalho />
            <section
                style={{ backgroundImage: `url("/img/servico/educacao.svg")` }}
                className="relative mt-20 hidden h-60 min-h-60 w-full bg-cover bg-center bg-no-repeat sm:block"
            ></section>

            <div className="relative mt-10 space-y-4 px-15">
                <h1 className="text-2xl font-bold text-[#0153A5]">Educação Sobre Seguros</h1>
                <p>
                Seguro não precisa ser complicado. Na nossa plataforma, você encontra conteúdos simples e objetivos que explicam como cada tipo de seguro funciona, suas coberturas e vantagens. Entenda o que está contratando e faça escolhas mais seguras e conscientes.

                </p>
                <div className="space-y-4 rounded-2xl bg-gray-200 p-10">
                    <h1 className="font-bold">Características:</h1>
                    <ul className="list-disc space-y-2 pl-5 text-base text-gray-700">
                        <li className="hover:text-primary transition duration-200">Explicações acessíveis sobre tipos de seguro</li>
                        <li className="hover:text-primary transition duration-200">Dicionário de termos comuns do setor</li>
                        <li className="hover:text-primary transition duration-200">Casos práticos para ilustrar cada cobertura</li>
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

export default ServicoEducacao;
