<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PlayListController;
use Illuminate\Support\Facades\Auth;

// Rotas públicas (clientes autenticados apenas visualizam)
Route::middleware('auth:cliente')->group(function () {
    Route::get('/playlists/{id}', [PlayListController::class, 'show']);
});

// Rotas exclusivas para o admin
Route::middleware('auth:admin')->group(function () {
   
    Route::post('/playlists', [PlayListController::class, 'store']);
    Route::put('/playlists/{id}', [PlayListController::class, 'update']);
    Route::delete('/playlists/{id}', [PlayListController::class, 'destroy']);
});


Route::get('/check-admin', function () {
    return Auth::guard('admin')->check() ? 'Autenticado como admin' : 'Não autenticado';
});
