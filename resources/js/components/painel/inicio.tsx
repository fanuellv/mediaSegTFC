import { useState } from 'react';
import ComentarioModal from '../ui/Comentario';
import ComentariosLista from '../ui/ComentarioLista';
import ListaPlanos from '../ui/listaPlanos';
import ListSeguradora from '../ui/listaSeguradoras';
import SimuladorPlanoForm from '../ui/simuladorPlano';

export default function Inicio() {
    const [mostrarModal, setMostrarModal] = useState(false);
    return (
        <div className="flex h-[92vh] w-full gap-4">
            <div className="flex w-3/5 flex-col gap-4">
                {/*Contratacao */}
                <div className="h-3/5 rounded-2xl bg-white p-4">
                    <h1 className="mb-4 font-bold">Contratação de Plano</h1>

                    <SimuladorPlanoForm />
                </div>

                <div className="flex h-2/5 flex-col rounded-2xl bg-white p-4">
                    {/* Título fixo */}
                    <div className="sticky top-0 z-10 w-full bg-white pb-2 font-bold">
                        <h1>Lista de Seguradoras</h1>
                    </div>

                    {/* Lista com scroll */}
                    <div
                        className="flex-1 overflow-y-auto"
                        style={{
                            scrollbarWidth: 'none', // Firefox
                            msOverflowStyle: 'none', // IE 10+
                        }}
                    >
                        <ListSeguradora />
                    </div>
                </div>
            </div>
            <div className="flex w-2/5 flex-col gap-4">
                <div className="flex h-3/5 flex-col rounded-2xl bg-white p-4">
                    {/* Título fixo */}
                    <div className="sticky top-0 z-10 w-full bg-white pb-2 font-bold">
                        <h1 className="mb-4 font-bold">Planos em Alta</h1>
                    </div>

                    {/* Lista com scroll */}
                    <div
                        className="flex-1 overflow-y-auto"
                        style={{
                            scrollbarWidth: 'none', // Firefox
                            msOverflowStyle: 'none', // IE 10+
                        }}
                    >
                        <ListaPlanos />
                    </div>
                </div>

                <div className="flex h-2/5 flex-col rounded-2xl bg-white p-4">
                    {/* Cabeçalho fixo */}
                    <div className="sticky top-0 z-10 flex justify-between bg-white pb-2 font-bold">
                        <h1 className="mb-4 font-bold">Comentários</h1>

                        <button onClick={() => setMostrarModal(true)} className="rounded bg-[#0153A5] px-4 py-2 text-sm text-white hover:bg-blue-600">
                            + Adicionar
                        </button>

                        <ComentarioModal isOpen={mostrarModal} onClose={() => setMostrarModal(false)} />
                    </div>

                    {/* Área da lista com rolagem */}
                    <div
                        className="flex-1 overflow-y-auto pr-2"
                        style={{
                            scrollbarWidth: 'none', // Firefox
                            msOverflowStyle: 'none', // IE
                        }}
                    >
                        <ComentariosLista />
                    </div>
                </div>
            </div>
        </div>
    );
}
