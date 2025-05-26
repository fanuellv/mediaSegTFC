<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ClienteController;

// ROTAS DE CRIAÇÃO DE CONTA
Route::prefix('cliente')->group(function () {
    Route::get('/create', fn () => Inertia::render('cliente/criarConta'))->name('cliente.create');
    Route::post('/', [ClienteController::class, 'store'])->name('cliente.store');
});

// LOGIN / LOGOUT
Route::get('/iniciar-sessao', fn () => Inertia::render('cliente/login'))->name('iniciar');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

Route::get('/iniciar', [LoginController::class, 'showLoginForm'])->name('iniciar');

// PAINEL (APENAS CLIENTES AUTENTICADOS)
Route::middleware('auth:cliente')->group(function () {
    Route::get('/painel', fn () => Inertia::render('dashboard'))->name('painel');
});
