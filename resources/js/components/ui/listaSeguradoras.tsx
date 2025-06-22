import { useEffect, useState } from 'react';
interface SeguradoraData {
    id: number;
    nome: string;
    nif: string;
    telefone: string;
    endereco: string;
  descricao: string;
    foto: string | null;
}

export default function ListSeguradora() {
    const [lista, setLista] = useState<SeguradoraData[]>([]);
    
    
        async function buscarSeguradoras() {
            try {
                console.log('🔍 Buscando seguradoras...');
                const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
                const response = await fetch('http://127.0.0.1:8000/seguradoras', {
                    method: 'GET', // Usa GET aqui, a não ser que a tua rota exija POST para listagem
                    headers: {
                        Accept: 'application/json',
                        'X-CSRF-TOKEN': token || '',
                    },
                    credentials: 'include', //para manter autenticado
                });
    
                if (!response.ok) {
                    const erro = await response.text();
                    console.error('❌ Erro na resposta:', erro);
                    return;
                }
    
                const dados = await response.json();
                console.log('✅ Seguradoras encontradas:', dados);
                setLista(dados);
            } catch (error) {
                console.error('❌ Erro ao buscar seguradoras:', error);
            }
        }
    
        useEffect(() => {
            buscarSeguradoras();
        }, []);
    
    return (
        <div>
            
            <ul>
                {lista.map((seguradora) => (
                    <li key={seguradora.id} className="flex gap-4 items-center border-b py-4 hover:bg-gray-50">
                    <div className="w-20 h-20 overflow-hidden ">
                        {seguradora.foto ? (
                            <img
                            src={`/storage/${seguradora.foto}`}
                            alt={seguradora.nome}
                            className="w-full h-full object-contain"
                          />
                          
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-sm text-gray-500">
                                Sem imagem
                            </div>
                        )}
                    </div>
                    <div className="flex-1">
                        <strong className="block text-lg">{seguradora.nome}</strong>
                        <span className="text-sm text-gray-600">{seguradora.descricao}</span>
                    </div>
                    <div>
                        <button className="p-2 bg-blue-950 text-white rounded hover:bg-blue-800">
                            Ver mais
                        </button>
                    </div>
                </li>
                
                ))}
            </ul>
        </div>
    );
}
