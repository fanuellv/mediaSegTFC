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
        Schema::create('administrador', function (Blueprint $table) {
            $table->id()->primary();
            $table->string('nome', 100);
            $table->string('sobrenome', 100);
            $table->string('nome_usuario', 100)->unique();
            $table->string('email', 100)->unique();
            $table->date('dataRegistro');
            $table->string('senha', 255);
            $table->string('foto', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('administrador');
    }
};
