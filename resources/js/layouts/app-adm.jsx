// resources/js/layouts/app-adm.jsx
import { useState } from 'react';
import Header from '@/components/ui/navAdmin';

export default function LayoutAdm({ children }) {
    const [sessaoAtiva, setSessaoAtiva] = useState('Seguradoras');

    return (
        <div className="flex min-h-screen flex-col bg-[#FDFDFC] dark:bg-[#0a0a0a]">
            <Header sessaoAtiva={sessaoAtiva} setSessaoAtiva={setSessaoAtiva} />
            <main className="flex-1 p-6">
                {typeof children === 'function'
                    ? children(sessaoAtiva) // se children for função, passa sessaoAtiva
                    : children}
            </main>
        </div>
    );
}
