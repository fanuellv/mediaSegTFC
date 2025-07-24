<?php

use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['web','auth:cliente'])->group(function () {

    Route::get('/configuracao', fn () => Inertia::render('cliente/configuracao'))->name('cliente.configuracao');
});
