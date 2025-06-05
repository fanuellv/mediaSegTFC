// resources/js/Layouts/DefaultLayout.jsx
import Cabecalho from '@/components/uiMediaseg/header';
import Rodape from '@/components/uiMediaseg/footer';

export default function DefaultLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col bg-[#FDFDFC] dark:bg-[#0a0a0a]">
            
            <main className="flex-1">{children}</main>
            
        </div>
    );
}
