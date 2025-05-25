import { useForm } from '@inertiajs/react'
import React from 'react'

export default function Create() {
  const { data, setData, post, processing, errors } = useForm<{ nome: string }>({
    nome: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    post('/usuarios')
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Usuário</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nome" className="block font-medium">
            Nome:
          </label>
          <input
            id="nome"
            type="text"
            value={data.nome}
            onChange={(e) => setData('nome', e.target.value)}
            className="mt-1 block w-full border rounded px-3 py-2"
          />
          {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
        </div>

        <button
          type="submit"
          disabled={processing}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          Salvar
        </button>
      </form>
    </div>
  )
}
