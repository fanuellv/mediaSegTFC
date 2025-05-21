<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');
Route::get('/iniciar-sessao', function () {
    return Inertia::render('login');
})->name('iniciar');
Route::get('/cadastro', function () {
    return Inertia::render('cadastro');
})->name('cadastro');

Route::get('/servico/consultoria-personalizada', function () {
    return Inertia::render('servicoConsultoria');
})->name('consultoria');
Route::get('/servico/educacao', function () {
    return Inertia::render('servicoEducacao');
})->name('educacao');
Route::get('/servico/facilidade', function () {
    return Inertia::render('servicoFacilidade');
})->name('facilidade');
Route::get('/servico/acompanhamento', function () {
    return Inertia::render('servicoAcompanhamento');
})->name('acompanhamento');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
