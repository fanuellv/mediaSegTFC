<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\PlanoController;
use App\Http\Controllers\SeguradoraController;
use App\Http\Controllers\SimulacaoController;

// ROTAS DE CRIAÇÃO DE CONTA
Route::prefix('cliente')->group(function () {
    Route::get('/create', fn() => Inertia::render('cliente/criarConta'))->name('cliente.create');
    Route::post('/', [ClienteController::class, 'store'])->name('cliente.store');
});

// LOGIN / LOGOUT CLIENTE
Route::get('/iniciar-sessao', fn() => Inertia::render('cliente/login'))->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
Route::get('/iniciar', [LoginController::class, 'showLoginForm'])->name('iniciar');

// ROTAS AUTENTICADAS
Route::middleware(['web','auth:cliente'])->group(function () {
    Route::get('/painel', fn() => Inertia::render('dashboard'))->name('painel');
    Route::get('/seguradoras', [SeguradoraController::class, 'index']);
    Route::get('/planos', [PlanoController::class, 'index']);        // Listar planos
    Route::get('/comentarios', [ComentarioController::class, 'index']);
    Route::post('/comentarios', [ComentarioController::class, 'store']);

    Route::post('/simulacao', [SimulacaoController::class, 'store'])->name('simulacao.store');
    Route::post('/simular', [SimulacaoController::class, 'calcular']);
    Route::get('/tipos-seguro', [SimulacaoController::class, 'tiposDeSeguro']);
    Route::get('/apolice/pdf/{id}', [SimulacaoController::class, 'adquirir']);
});
