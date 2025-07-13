<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class AutenticarClienteOuAdmin
{
    public function handle($request, Closure $next)
    {
        if (Auth::guard('cliente')->check() || Auth::guard('admin')->check()) {
            return $next($request);
        }

        return redirect()->route('iniciar-sessao'); // ou outra rota de login padrão
    }
}
