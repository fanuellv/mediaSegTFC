<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ClienteLearningController;
use App\Http\Controllers\PlanoController;
use App\Http\Controllers\PlayListController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\SeguradoraController;
use App\Http\Controllers\SimulacaoController;
use App\Models\Playlist;
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
    Route::post('/seguradoras', [SeguradoraController::class, 'store']);
    Route::put('/seguradoras/{id}', [SeguradoraController::class, 'update']);
    Route::delete('/seguradoras/{id}', [SeguradoraController::class, 'destroy']);
});


//planos
Route::middleware(['auth:admin'])->group(function () {
    Route::post('/planos', [PlanoController::class, 'store']);       // Criar plano
    Route::get('/planos/{id}', [PlanoController::class, 'show']);    // Mostrar plano específico
    Route::put('/planos/{id}', [PlanoController::class, 'update']);  // Atualizar plano
    Route::delete('/planos/{id}', [PlanoController::class, 'destroy']); // Apagar plano

    //relatorio
    Route::get('/totalClientes', [ClienteController::class, 'totalClientes']);
    Route::get('/totalSimulacao', [SimulacaoController::class, 'totalSimulacao']);
    Route::get('/totalSimulacaoTipo', [SimulacaoController::class, 'simulacoesPorTipo']);
    Route::get('/totalSeguradora', [SeguradoraController::class, 'totalSeguradora']);
    Route::get('/total/por-seguradora', [PlanoController::class, 'totalPlanosPorSeguradora']);
    Route::get('/totalPlaylist', [PlayListController::class, 'totalPlayList']);
    Route::get('/totalQuiz', [QuizController::class, 'totalQuiz']);
    Route::get('/learning/total-videos', [ClienteLearningController::class, 'totalVideosAssistidos']);
Route::get('/learning/total-quizzes', [ClienteLearningController::class, 'totalQuizzesJogadas']);


    

});