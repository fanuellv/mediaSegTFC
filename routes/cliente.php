<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\PlanoController;
use App\Http\Controllers\SeguradoraController;

// ROTAS DE CRIAÇÃO DE CONTA
Route::prefix('cliente')->group(function () {
    Route::get('/create', fn () => Inertia::render('cliente/criarConta'))->name('cliente.create');
    Route::post('/', [ClienteController::class, 'store'])->name('cliente.store');
});

// LOGIN / LOGOUT CLIENTE
Route::get('/iniciar-sessao', fn () => Inertia::render('cliente/login'))->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
Route::get('/iniciar', [LoginController::class, 'showLoginForm'])->name('iniciar');

// ROTAS AUTENTICADAS
Route::middleware('auth:cliente')->group(function () {
    Route::get('/painel', fn () => Inertia::render('dashboard'))->name('painel');
    Route::get('/seguradoras', [SeguradoraController::class, 'index']);
    Route::get('/planos', [PlanoController::class, 'index']);        // Listar planos
});
