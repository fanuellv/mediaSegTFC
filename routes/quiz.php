<?php

use App\Http\Controllers\QuizController;
use Illuminate\Support\Facades\Route;


// Rotas exclusivas para o admin
Route::middleware('auth:admin')->group(function () {
    Route::post('/quiz', [QuizController::class, 'store']);         // Criar um novo quiz com perguntas
    Route::get('/quiz/{id}', [QuizController::class, 'show']);      // Mostrar um quiz específico
    Route::put('/quiz/{id}', [QuizController::class, 'update']);    // Atualizar um quiz
});
