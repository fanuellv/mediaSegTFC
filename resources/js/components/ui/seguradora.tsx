import { useEffect, useState } from 'react';
import ModalSeguradora from './ModalSeguradora';

interface FormData {
  nome: string;
  nif: string;
  telefone: string;
  endereco: string;
  email: string;
  descricao: string;
  foto: File | null;
}

interface SeguradoraData {
    id: number;
    nome: string;
    nif: string;
    telefone: string;
    endereco: string;
    email: string;
  descricao: string;
    foto: string | null;
}

export default function Seguradora() {
    const [lista, setLista] = useState<SeguradoraData[]>([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [seguradoraEditar, setSeguradoraEditar] = useState<SeguradoraData | null>(null);


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
                credentials: 'include', // <-- MUITO IMPORTANTE
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
        formData.append('email', form.email);
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
    function editarSeguradora(seg: SeguradoraData) {
      setSeguradoraEditar(seg);
      setMostrarModal(true);
    }
    async function atualizarSeguradora(form: FormData, id: number) {
      const formData = new FormData();
      formData.append('nome', form.nome);
      formData.append('nif', form.nif);
      formData.append('telefone', form.telefone);
      formData.append('endereco', form.endereco);
      formData.append('email', form.email);
      formData.append('descricao', form.descricao);
      if (form.foto) formData.append('foto', form.foto);
    
      formData.append('_method', 'PUT');
    
      try {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
        const res = await fetch(`/seguradoras/${id}`, {
          method: 'POST',
          headers: {
            'X-CSRF-TOKEN': token || '',
            Accept: 'application/json',
          },
          body: formData,
        });
    
        if (!res.ok) {
          const erro = await res.json();
          console.error('❌ Erro ao atualizar seguradora:', erro);
          return;
        }
    
        console.log('✅ Seguradora atualizada');
        buscarSeguradoras();
      } catch (error) {
        console.error('❌ Erro na atualização:', error);
      }
    }
    
    
    
    
    
    async function eliminarSeguradora(id: number) {
      if (!confirm('Tem certeza que deseja eliminar esta seguradora?')) return;
    
      try {
        const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    
        const res = await fetch(`/seguradoras/${id}`, {
          method: 'DELETE',
          headers: {
            'X-CSRF-TOKEN': token || '',
            Accept: 'application/json',
          },
        });
    
        if (!res.ok) {
          const erro = await res.text();
          console.error('❌ Erro ao eliminar:', erro);
          return;
        }
    
        console.log('✅ Seguradora eliminada');
        buscarSeguradoras();
      } catch (error) {
        console.error('❌ Erro na eliminação:', error);
      }
    }
    

    useEffect(() => {
        buscarSeguradoras();
    }, []);

    return (
        <div className="px-8 py-6 md:px-20">
  <div className="mb-6 flex items-center justify-between">
    <h2 className="text-3xl font-semibold text-gray-800">Lista de Seguradoras</h2>
    <button
      className="flex items-center gap-2 rounded-lg bg-[#0153A5] px-4 py-2 text-white hover:bg-[#004286] transition"
      onClick={() => setMostrarModal(true)}
    >
      <span className="text-lg">＋</span> Nova Seguradora
    </button>
  </div>

  <div className="overflow-x-auto rounded-lg border border-gray-200">
    <table className="min-w-full text-left text-sm text-gray-700">
      <thead className="bg-gray-100 text-xs uppercase text-gray-600">
        <tr>
          <th className="px-4 py-3">Logo</th>
          <th className="px-4 py-3">Nome</th>
          <th className="px-4 py-3">Descrição</th>
          <th className="px-4 py-3">NIF</th>
          <th className="px-4 py-3">Telefone</th>
          <th className="px-4 py-3">Endereço</th>
          <th className="px-4 py-3">Email</th>
          <th className="px-4 py-3 text-center">Acções</th>
        </tr>
      </thead>
      <tbody>
        {lista.map((seg) => (
          <tr key={seg.id} className="border-t hover:bg-gray-50">
            <td className="px-4 py-3">
              {seg.foto && (
                <img
                  src={`/storage/${seg.foto}`}
                  className="h-12 w-12 rounded-full object-cover border"
                  alt={seg.nome}
                />
              )}
            </td>
            <td className="px-4 py-3 font-medium">{seg.nome}</td>
            <td className="px-4 py-3">{seg.descricao}</td>
            <td className="px-4 py-3">{seg.nif}</td>
            <td className="px-4 py-3">{seg.telefone}</td>
            <td className="px-4 py-3">{seg.endereco}</td>
            <td className="px-4 py-3">{seg.email}</td>
            <td className="px-4 py-3 text-center">
              <button
                onClick={() => editarSeguradora(seg)}
                className="hover:text-blue-600 hover:underline mr-3"
              >
                Editar
              </button>
              <button
                onClick={() => eliminarSeguradora(seg.id)}
                className="hover:text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  {mostrarModal && (
    <ModalSeguradora
      onClose={() => {
        setMostrarModal(false);
        setSeguradoraEditar(null);
      }}
      onSubmit={(form, id) => {
        if (id) {
          atualizarSeguradora(form, id);
        } else {
          criarSeguradora(form);
        }
      }}
      seguradoraEditar={seguradoraEditar}
    />
  )}
</div>

    );
}
