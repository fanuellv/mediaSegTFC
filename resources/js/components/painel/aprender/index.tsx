import alvo from '@/json/construction.json';
import Lottie from 'lottie-react';
//import { Link } from '@inertiajs/react';

export default function Index() {
    return (
        <div className="flex w-full items-center justify-center flex-col gap-4 rounded-2xl bg-white p-4 sm:h-[88vh]">
            
            <div
                className="scrollbar-thin flex flex-col items-center justify-center scrollbar-thumb-gray-300 flex-1 overflow-y-auto pr-1"
                style={{
                    scrollbarWidth: 'none', // Firefox
                    msOverflowStyle: 'none', // IE 10+
                }}
            >
                <Lottie animationData={alvo} loop={true} className="h-78 w-78 rounded-2xl bg-white" />
                <h1 className="text-2xl font-bold text-gray-800">Página em Construção</h1>
                <p className="max-w-md text-gray-600">
                    Estamos trabalhando para disponibilizar esta funcionalidade o mais breve possível. Agradecemos a sua paciência!
                </p>
            </div>
        </div>
    );
}
