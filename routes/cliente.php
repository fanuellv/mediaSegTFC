<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ClienteController;
use App\Http\Controllers\ComentarioController;
use App\Http\Controllers\PlanoController;
use App\Http\Controllers\SeguradoraController;
use App\Http\Controllers\SimulacaoController;
use Illuminate\Http\Request;

Route::prefix('cliente')->group(function () {
    Route::get('/create', fn() => Inertia::render('cliente/criarConta'))->name('cliente.create');
    Route::get('/aprender', fn() => Inertia::render('cliente/aprender'))->name('cliente.aprender');
    Route::get('/blog', fn() => Inertia::render('cliente/blog'))->name('cliente.blog');
    Route::post('/', [ClienteController::class, 'store'])->name('cliente.store');
});

// LOGIN / LOGOUT CLIENTE
Route::get('/iniciar-sessao', fn() => Inertia::render('cliente/login'))->name('login');
Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
Route::get('/iniciar', [LoginController::class, 'showLoginForm'])->name('iniciar');

// ROTAS AUTENTICADAS
Route::middleware(['web', 'auth:cliente'])->group(function () {
    // ✅ REDIRECIONAR /painel para /dashboard/inicio
    Route::get('/painel', fn() => redirect()->route('dashboard.inicio'))->name('painel');

    // ✅ ROTAS COM CONTROLE DE ABA
    Route::prefix('dashboard')->group(function () {
        Route::get('/inicio', fn() => Inertia::render('dashboard', ['aba' => 'Inicio']))->name('dashboard.inicio');
        Route::get('/seguros', fn() => Inertia::render('dashboard', ['aba' => 'Seguros']))->name('dashboard.seguros');
        Route::get('/pagamentos', fn() => Inertia::render('dashboard', ['aba' => 'Pagamentos']))->name('dashboard.pagamentos');
        Route::get('/dashboard/pagamentos', function (Request $request) {
            return Inertia::render('dashboard', [
                'aba' => 'Pagamentos',
                'seguradora_id' => request('seguradora_id'), // pode ser nulo
                'plano_id' => request('plano_id'),
            ]);
        })->name('dashboard.pagamentosV2');
        Route::get('/meus-planos', fn() => Inertia::render('dashboard', ['aba' => 'Meus Planos']))->name('dashboard.planos');
        Route::get('/aprender', fn() => Inertia::render('dashboard', ['aba' => 'Aprender']))->name('dashboard.aprender');
        Route::get('/menu', fn() => Inertia::render('dashboard', ['aba' => 'Menu']))->name('dashboard.menu');

        Route::get('/seguros/seguradora', function (Request $request) {
            return Inertia::render('dashboard', [
                'aba' => 'Seguros',
                'seguradora_id' => $request->query('seguradora_id'),
            ]);
        })->name('dashboard.seguros.com.seguradora');


        
    });

    // Se estiver autenticado via web:
    Route::get('/api/cliente', [ClienteController::class, 'show']);
    Route::put('/cliente', [ClienteController::class, 'update'])->name('cliente.update');

    Route::get('/dashboard/seguradoras/{id}', function ($id) {
        $seguradora = \App\Models\SeguradoraModel::find($id);

        if (!$seguradora) {
            return response()->json(['message' => 'Seguradora não encontrada'], 404);
        }

        return response()->json($seguradora);
    });

    Route::get('/comentarios', [ComentarioController::class, 'index']);
    Route::post('/comentarios', [ComentarioController::class, 'store']);

    Route::post('/simulacao', [SimulacaoController::class, 'store'])->name('simulacao.store');
    Route::post('/simular', [SimulacaoController::class, 'calcular']);
    Route::get('/tipos-seguro', [SimulacaoController::class, 'tiposDeSeguro']);
    Route::get('/apolice/pdf/{id}', [SimulacaoController::class, 'adquirirPdf']);
    Route::post('/apolice/pdf/gerar/{id}', [SimulacaoController::class, 'gerarPdf']);

    // routes/web.php ou routes/api.php
    Route::get('/meus-planos', [SimulacaoController::class, 'meusPlanos']);
});
