<?php

use App\Http\Controllers\PlanoController;
use App\Http\Controllers\SeguradoraController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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