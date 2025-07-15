import ListSeguradora from '../../ui/listaSeguradoras';

export default function Selecionada() {
    return (
        <div className="flex w-full bg-white rounded-2xl p-4 flex-col gap-4 sm:h-[88vh]">
            <h1 className='font-bold'>Lista de Seguradoras</h1>
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
    );
}
