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
        Schema::create('documento', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 100);
            $table->date('data_emissao');
            $table->string('caminho', 255);

            $table->unsignedBigInteger('utilizador_id');
            $table->foreign('utilizador_id')
                ->references('id')
                ->on('utilizador')
                ->onDelete('cascade');

            $table->unsignedBigInteger('apolice_id')->nullable();
            $table->foreign('apolice_id')
                ->references('id')
                ->on('apolices')
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
        Schema::dropIfExists('documento');
    }
};
