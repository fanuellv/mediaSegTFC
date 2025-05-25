<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::create('clientes', function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('sobrenome');
            $table->string('nome_usuario')->unique();
            $table->string('email')->unique();
            $table->date('dataRegistro');
            $table->string('nif')->nullable();
            $table->string('senha');
            $table->string('telefone');
            $table->string('foto')->nullable(); // caminho da imagem
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('cliente');
    }
};
