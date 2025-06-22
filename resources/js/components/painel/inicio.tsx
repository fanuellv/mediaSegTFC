import ListSeguradora from '../ui/listaSeguradoras';
import SimuladorPlanoForm from '../ui/simuladorPlano';

export default function Inicio() {
    return (
        <div className="flex h-screen w-full gap-4">
            <div className="flex w-3/5 flex-col gap-4">
                {/*Contratacao */}
                <div className="h-3/5 rounded-2xl bg-white p-4">
                    <h1 className="mb-4 font-bold">Contratação de Plano</h1>

                    <SimuladorPlanoForm />
                </div>

                <div className="h-2/5 overflow-x-hidden overflow-y-auto rounded-2xl bg-white">
                    <h1 className="sticky top-0 z-10 w-full bg-white p-4 font-bold">Lista de Seguradoras</h1>
                    <div className="p-4">
                        <ListSeguradora />
                        
                    </div>
                </div>
            </div>
            <div className="flex w-2/5 flex-col gap-4">
                <div className="h-3/5 rounded-2xl bg-white p-4">
                    <h1 className="mb-4 font-bold">Planos em Alta</h1>
                </div>

                <div className="h-2/5 rounded-2xl bg-white p-4">
                    <h1 className="mb-4 font-bold">Comentários</h1>
                </div>
            </div>
        </div>
    );
}
