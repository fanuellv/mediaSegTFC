
import SimuladorPlanoForm from '../ui/simulador/simuladorPlano';

export default function Pagamento() {
    return (
        <div className="flex w-full h-[80vh] bg-white rounded-2xl p-4 flex-col gap-4 sm:h-[88vh]">
            <div
                className="scrollbar-thin scrollbar-thumb-gray-300 flex-1 overflow-y-auto pr-1"
                style={{
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE 10+
                }}
            >
                <SimuladorPlanoForm/>
            </div>
        </div>
    );
}
