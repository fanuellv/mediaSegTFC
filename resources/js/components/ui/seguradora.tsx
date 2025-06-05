import { useEffect, useState } from 'react';
import ModalSeguradora from './ModalSeguradora';

interface FormData {
  nome: string;
  nif: string;
  telefone: string;
  endereco: string;
  descricao: string;
  foto: File | null;
}

interface SeguradoraData {
    id: number;
    nome: string;
    nif: string;
    telefone: string;
    endereco: string;
  descricao: string;
    foto: string | null;
}

export default function Seguradora() {
    const [lista, setLista] = useState<SeguradoraData[]>([]);
    const [mostrarModal, setMostrarModal] = useState(false);

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

    async function criarSeguradora(form: FormData) {
        console.log('📤 Enviando dados do formulário:', form);

        const formData = new FormData();
        formData.append('nome', form.nome);
        formData.append('nif', form.nif);
        formData.append('telefone', form.telefone);
        formData.append('endereco', form.endereco);
formData.append('descricao', form.descricao);

        if (form.foto) formData.append('foto', form.foto);
        formData.append('administrador_id', '1');

        try {
            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            if (!token) {
                throw new Error('CSRF token não encontrado');
            }

            const res = await fetch('/seguradoras', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRF-TOKEN': token,
                    Accept: 'application/json',
                },
            });

            console.log('📨 Resposta do POST:', res);

            if (!res.ok) {
                const erro = await res.text();
                console.error('❌ Erro ao criar seguradora:', erro);
                return;
            }

            console.log('✅ Seguradora criada com sucesso');
            buscarSeguradoras();
        } catch (error) {
            console.error('❌ Erro na criação da seguradora:', error);
        }
    }

    useEffect(() => {
        buscarSeguradoras();
    }, []);

    return (
        <div className="px-20 py-6">
            <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-bold">Seguradoras</h2>
                <button className="rounded bg-[#0153A5] px-4 py-2 text-white" onClick={() => setMostrarModal(true)}>
                    Nova Seguradora
                </button>
            </div>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-2">Nome</th>
                        <th>NIF</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
<th>Descrição</th>
                        <th>Foto</th>
                    </tr>
                </thead>
                <tbody>
                    {lista.map((seg) => (
                        <tr key={seg.id} className="border-t">
                            <td className="p-2">{seg.nome}</td>
                            <td>{seg.nif}</td>
                            <td>{seg.telefone}</td>
                            <td>{seg.endereco}</td>
<td>{seg.descricao}</td>
                            <td>{seg.foto && <img src={`/storage/${seg.foto}`} className="h-12" />}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {mostrarModal && <ModalSeguradora onClose={() => setMostrarModal(false)} onSubmit={criarSeguradora} />}
        </div>
    );
}
