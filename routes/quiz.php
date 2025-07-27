<?php

use App\Http\Controllers\QuizController;
use Illuminate\Support\Facades\Route;

// Rotas públicas (clientes autenticados podem apenas visualizar)
Route::middleware('auth:cliente')->group(function () {
    Route::get('/quizzes/{id}', [QuizController::class, 'show']);
});

// Rotas exclusivas para o admin
Route::middleware('auth:admin')->group(function () {
    Route::post('/quizzes', [QuizController::class, 'store']);
    Route::put('/quizzes/{id}', [QuizController::class, 'update']);
    Route::delete('/quizzes/{id}', [QuizController::class, 'destroy']);
});
