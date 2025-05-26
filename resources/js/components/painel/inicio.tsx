import { useState } from 'react';

import { CgSelect } from 'react-icons/cg';

export default function Inicio() {
    const [seguradora, setSeguradora] = useState<string>('');

    const seguradoras = ['Nossa Seguros', 'Viva Seguros', 'Mundial Seguros'];

    return (
        <div className="flex h-screen w-full gap-4">
            <div className="flex w-3/5 flex-col gap-4">
                {/*Contratacao */}
                <div className="h-3/5 rounded-2xl bg-white p-4">

                    <h1 className="mb-4 font-bold">Contratação de Plano</h1>

                    <form action="" className='space-y-4'>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="seguradora">Seguradora</label>
                            <CgSelect className="absolute top-44 right-120" />
                            <select
                                className="appearance-none rounded-lg border border-gray-300 bg-white p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                name="seguradora"
                                id="seguradora"
                                value={seguradora}
                                onChange={(e) => setSeguradora(e.target.value)}
                            >
                                <option value="" disabled>
                                    Selecione a seguradora
                                </option>
                                {seguradoras.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="seguradora">Planos disponíveis</label>
                            <CgSelect className="absolute top-65 right-120" />
                            <select
                                className="appearance-none rounded-lg border border-gray-300 bg-white p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                name="seguradora"
                                id="seguradora"
                                value={seguradora}
                                onChange={(e) => setSeguradora(e.target.value)}
                            >
                                <option value="" disabled>
                                    Selecione o plano que deseja
                                </option>
                                {seguradoras.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="seguradora">Valor</label>
                            <CgSelect className="absolute top-87 right-120" />
                            <select
                                className="appearance-none rounded-lg border border-gray-300 bg-white p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                name="seguradora"
                                id="seguradora"
                                value={seguradora}
                                onChange={(e) => setSeguradora(e.target.value)}
                            >
                                <option value="" disabled>
                                    Selecione o valor
                                </option>
                                {seguradoras.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className='flex flex-col'>
                        <label htmlFor="">Informações</label>
                        <textarea className='appearance-none rounded-lg border border-gray-300 bg-white p-2 text-sm' name="" id="" placeholder='Informações Relativa a Contratação'></textarea>
                        </div>
                        <div className='flex gap-4'>
                            <button className='w-1/2 text-gray-700 bg-gray-200 font-bold p-2 rounded' type="reset">Limpar Informação</button>
                            <button className='w-1/2 bg-[#0153A5] text-white font-bold p-2 rounded' type="submit">Simular</button>

                        </div>
                    </form>
                    
                </div>

                <div className="h-2/5 rounded-2xl bg-white p-4">
                <h1 className="mb-4 font-bold">Lista de Seguradoras</h1>
                </div>
            </div>
            <div className="flex w-2/5 flex-col gap-4">
                <div className="h-3/5 rounded-2xl bg-white p-4">
                <h1 className="mb-4 font-bold">Planos em Alta</h1>
                </div>

                <div className="h-2/5 rounded-2xl bg-white p-4">
                <h1 className="mb-4 font-bold">Comentários</h1>
                </div>
            </div>
        </div>
    );
}
