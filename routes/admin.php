<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\PlanoController;
use App\Http\Controllers\SeguradoraController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
// LOGIN ADMIN
Route::get('/iniciar-adm', fn () => Inertia::render('administrador/login'))->name('loginAdm');
Route::post('/admin/login', [AdminController::class, 'login']);

// ROTAS AUTENTICADAS
Route::middleware('auth:admin')->group(function () {
    Route::get('/admin/dashboard', fn () => Inertia::render('painel'))->name('painel.admin');
});

//seguradora
Route::middleware(['auth:admin'])->group(function () {
    Route::get('/seguradoras', [SeguradoraController::class, 'index']);
    Route::post('/seguradoras', [SeguradoraController::class, 'store']);
    Route::put('/seguradoras/{id}', [SeguradoraController::class, 'update']);
    Route::delete('/seguradoras/{id}', [SeguradoraController::class, 'destroy']);
});


//planos
Route::middleware(['auth:admin'])->group(function () {
    Route::get('/planos', [PlanoController::class, 'index']);        // Listar planos
    Route::post('/planos', [PlanoController::class, 'store']);       // Criar plano
    Route::get('/planos/{id}', [PlanoController::class, 'show']);    // Mostrar plano específico
    Route::put('/planos/{id}', [PlanoController::class, 'update']);  // Atualizar plano
    Route::delete('/planos/{id}', [PlanoController::class, 'destroy']); // Apagar plano
});