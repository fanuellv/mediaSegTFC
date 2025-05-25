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
        Schema::create('endereco', function (Blueprint $table) {
            $table->id();
            $table->string('provincia', 100);
            $table->string('municipio', 100);
            $table->string('bairro', 100);
            $table->string('casa', 50)->nullable();

            $table->unsignedBigInteger('seguradora_id')->nullable();
            $table->unsignedBigInteger('cliente_id')->nullable();

            $table->foreign('seguradora_id')
                ->references('id')
                ->on('seguradora')
                ->onDelete('set null');

            $table->foreign('cliente_id')
                ->references('id')
                ->on('clientes')
                ->onDelete('set null');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('endereco');
    }
};
