import DefaultLayout from '@/layouts/DefaultLayout';
import { useState } from 'react';


interface ClienteForm {
  nome: string;
  sobrenome: string;
  nome_usuario: string;
  email: string;
  dataRegistro: string;
  nif: string;
  senha: string;
  telefone: string;
  foto: File | null;
}

export default function CriarCliente() {
  const [form, setForm] = useState<ClienteForm>({
    nome: '',
    sobrenome: '',
    nome_usuario: '',
    email: '',
    dataRegistro: '',
    nif: '',
    senha: '',
    telefone: '',
    foto: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((prev) => ({ ...prev, foto: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === 'foto' && value instanceof File) {
        formData.append('foto', value);
      } else {
        formData.append(key, value as string);
      }
    });

    try {
      const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

      const res = await fetch('/cliente', {
        method: 'POST',
        headers: {
          'X-CSRF-TOKEN': token || '',
          Accept: 'application/json',
        },
        body: formData,
      });

      if (!res.ok) {
        const erro = await res.text();
        console.error('❌ Erro ao criar cliente:', erro);
        return;
      }

      console.log('✅ Cliente criado com sucesso!');
      // Redirecionar, limpar formulário, mostrar mensagem etc.
    } catch (err) {
      console.error('❌ Erro geral:', err);
    }
  };

  return (
    <DefaultLayout>
<form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
      <input name="nome" value={form.nome} onChange={handleChange} placeholder="Nome" />
      <input name="sobrenome" value={form.sobrenome} onChange={handleChange} placeholder="Sobrenome" />
      <input name="nome_usuario" value={form.nome_usuario} onChange={handleChange} placeholder="Usuário" />
      <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="Email" />
      <input name="dataRegistro" type="date" value={form.dataRegistro} onChange={handleChange} />
      <input name="nif" value={form.nif} onChange={handleChange} placeholder="NIF" />
      <input name="senha" type="password" value={form.senha} onChange={handleChange} placeholder="Senha" />
      <input name="telefone" value={form.telefone} onChange={handleChange} placeholder="Telefone" />
      <input name="foto" type="file" accept="image/*" onChange={handleFileChange} />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Criar Cliente
      </button>
    </form>
    </DefaultLayout>
    
  );
}
