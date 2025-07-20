// components/EmConstrucao.tsx

import alvo from '@/json/construction.json';
import Lottie from 'lottie-react';
import { Link } from '@inertiajs/react';

//import { Construction } from 'lucide-react';

export default function Aprender() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center px-4">

      
      <Lottie animationData={alvo} loop={true} className="h-78 w-78 rounded-2xl bg-white" />
      <h1 className="text-2xl font-bold text-gray-800">Página em Construção</h1>
      <p className="text-gray-600 max-w-md">
        Estamos trabalhando para disponibilizar esta funcionalidade o mais breve possível. Agradecemos a sua paciência!
      </p>
      <Link href='/'><button className='bg-[#0153A5] text-white font-bold p-4 rounded'>Voltar</button></Link>
    </div>
  );
}
