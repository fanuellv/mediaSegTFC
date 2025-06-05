<?php

use App\Http\Controllers\SeguradoraController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth:admin'])->group(function () {
    Route::get('/seguradoras', [SeguradoraController::class, 'index']);
    Route::post('/seguradoras', [SeguradoraController::class, 'store']);
    Route::put('/seguradoras/{id}', [SeguradoraController::class, 'update']);
    Route::delete('/seguradoras/{id}', [SeguradoraController::class, 'destroy']);
});
