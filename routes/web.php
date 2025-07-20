<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\NovoEmailController;
use App\Http\Controllers\PlanoController;
use App\Http\Controllers\SeguradoraController;
use App\Http\Controllers\SimulacaoController;
use App\Http\Controllers\TesteController;





// ROTAS PÚBLICAS
Route::get('/', fn () => Inertia::render('welcome'))->name('home');

Route::get('/cadastro', fn () => Inertia::render('cliente/criarConta'))->name('cadastro');

Route::get('/servico/consultoria-personalizada', fn () => Inertia::render('servicos/Consultoria'))->name('consultoria');
Route::get('/servicos/educacao', fn () => Inertia::render('servico/Educacao'))->name('educacao');
Route::get('/servicos/facilidade', fn () => Inertia::render('servico/Facilidade'))->name('facilidade');
Route::get('/servicos/acompanhamento', fn () => Inertia::render('servico/Acompanhamento'))->name('acompanhamento');

// ROTAS DE TESTE
Route::prefix('usuarios')->group(function () {
    Route::get('/create', fn () => Inertia::render('cliente/cadastro'));
    Route::post('/', [TesteController::class, 'store']);
});

// web.php
Route::middleware(['web'])->group(function () {
    Route::get('/seguradoras', [SeguradoraController::class, 'index']);
    Route::get('/planos', [PlanoController::class, 'index']);        // Listar planos
});

Route::post('/newsletter', [NovoEmailController::class, 'store'])->name('newsletter.store');





// OUTROS ARQUIVOS DE ROTA
require __DIR__.'/settings.php';
require __DIR__.'/admin.php';
require __DIR__.'/cliente.php';
