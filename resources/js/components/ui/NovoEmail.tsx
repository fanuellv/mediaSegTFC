import { useState } from 'react';
import axios, { AxiosError } from 'axios';

interface NewsletterResponse {
    mensagem: string;
}

interface ValidationErrors {
    email?: string[];
}

export default function NewsletterForm() {
    const [email, setEmail] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post<NewsletterResponse>(
                '/newsletter',
                { email },
                {
                    headers: {
                        'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
                    },
                }
            );

            setMensagem('✅ ' + response.data.mensagem);
            setEmail('');
        } catch (err) {
            const error = err as AxiosError<{ errors: ValidationErrors }>;

            if (error.response?.data?.errors?.email?.[0]) {
                setMensagem('❌ ' + error.response.data.errors.email[0]);
            } else {
                setMensagem('❌ Ocorreu um erro ao enviar o e-mail.');
            }
            console.log(mensagem);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
                type="email"
                name="email"
                className="rounded bg-white/50 p-2 sm:w-120 sm:p-4"
                placeholder="Digite o seu email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="rounded bg-white p-2 font-bold text-[#003162] sm:p-4">
                Começar a receber
            </button>
        </form>
    );
}
