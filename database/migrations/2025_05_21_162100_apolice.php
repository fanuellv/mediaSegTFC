<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('apolices', function (Blueprint $table) {
            $table->id();

            $table->string('numero')->unique(); // Número da apólice
            $table->unsignedBigInteger('cliente_id');
            $table->unsignedBigInteger('plano_id');
            $table->unsignedBigInteger('fatura_id')->nullable();

            $table->date('data_inicio');
            $table->date('data_fim');
            $table->decimal('valor_total', 10, 2);

            $table->timestamps();

            // Chaves estrangeiras
            $table->foreign('cliente_id')->references('id')->on('clientes')->onDelete('cascade');
            $table->foreign('plano_id')->references('id')->on('planos')->onDelete('cascade');
            $table->foreign('fatura_id')->references('id')->on('faturas')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('apolices');
    }
};
