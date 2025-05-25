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
        Schema::create('permissao_regras', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('utilizador_id');
            $table->unsignedBigInteger('permissao_id');

            $table->foreign('utilizador_id')
                ->references('id')
                ->on('utilizador')
                ->onDelete('cascade');

            $table->foreign('permissao_id')
                ->references('id')
                ->on('permissao')
                ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('permissao_regras');
    }
};
