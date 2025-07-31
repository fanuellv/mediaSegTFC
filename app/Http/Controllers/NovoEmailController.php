<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class NovoEmailController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $email = $request->input('email');

        Mail::send('email.simulacao', [], function ($message) use ($email) {
            $message->to($email)
                    ->subject('Bem-vindo à nossa Newsletter!');
        });

        return response()->json(['mensagem' => 'Email enviado com sucesso!']);
    }
    public function simulacao(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $email = $request->input('email');

        Mail::send('email.notificacao', [], function ($message) use ($email) {
            $message->to($email)
                    ->subject('Obrigado por realizares a simulação');
        });

        return response()->json(['mensagem' => 'Email enviado com sucesso!']);
    }
}
