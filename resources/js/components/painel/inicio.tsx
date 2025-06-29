import { useState } from 'react';
import ComentarioModal from '../ui/Comentario';
import ComentariosLista from '../ui/ComentarioLista';
import ListaPlanos from '../ui/listaPlanos';
import ListSeguradora from '../ui/listaSeguradoras';
import SimuladorPlanoForm from '../ui/simuladorPlano';

export default function Inicio() {
    const [mostrarModal, setMostrarModal] = useState(false);
    return (
        <div className="flex w-full flex-col gap-4 sm:h-[88vh] sm:flex-row">
            {/* Coluna Esquerda */}
            <div className="flex w-full flex-col gap-4 sm:w-3/5">
                {/* Contratação de Plano */}
                <div className="rounded-2xl bg-white p-4 sm:h-[60%]">
                    <SimuladorPlanoForm />
                </div>

                {/* Lista de Seguradoras */}
                <div className="flex flex-col rounded-2xl bg-white p-4 sm:h-[40%]">
                    <div className="top-0 z-10 bg-white pb-2 font-bold">
                        <h1 className="text-lg">Top Seguradoras</h1>
                    </div>
                    <div
                        className="scrollbar-thin scrollbar-thumb-gray-300 flex-1 overflow-y-auto pr-1"
                        style={{
                            scrollbarWidth: 'none', // Firefox
                            msOverflowStyle: 'none', // IE 10+
                        }}
                    >
                        <ListSeguradora />
                    </div>
                </div>
            </div>

            {/* Coluna Direita */}
            <div className="flex w-full flex-col gap-4 sm:w-2/5">
                {/* Planos em Alta */}
                <div className="flex flex-col rounded-2xl bg-white p-4 sm:h-[60%]">
                    <div className="top-0 z-10 bg-white pb-2 font-bold">
                        <h1 className="text-lg">Planos em Alta</h1>
                    </div>
                    <div className="scrollbar-thin scrollbar-thumb-gray-300 flex-1 overflow-y-auto pr-1" style={{
                            scrollbarWidth: 'none', // Firefox
                            msOverflowStyle: 'none', // IE 10+
                        }}>
                        <ListaPlanos />
                    </div>
                </div>

                {/* Comentários */}
                <div className="flex flex-col rounded-2xl bg-white p-4 sm:h-[40%]">
                    <div className="top-0 z-10 flex items-center justify-between bg-white pb-2">
                        <h1 className="text-lg font-bold">Comentários</h1>
                        <button onClick={() => setMostrarModal(true)} className="rounded bg-[#0153A5] px-3 py-1 text-sm text-white hover:bg-blue-600">
                            + Adicionar
                        </button>
                        <ComentarioModal isOpen={mostrarModal} onClose={() => setMostrarModal(false)} />
                    </div>
                    <div className="pb-16 sm:pb-0 scrollbar-thin scrollbar-thumb-gray-300 flex-1 overflow-y-auto pr-1" style={{
                            scrollbarWidth: 'none', // Firefox
                            msOverflowStyle: 'none', // IE 10+
                        }}>
                        <ComentariosLista />
                    </div>
                </div>
            </div>
        </div>
    );
}
