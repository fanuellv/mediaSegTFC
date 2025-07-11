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
        Schema::create('items_simulados', function (Blueprint $table) {
            $table->unsignedBigInteger('simulacao_id');
            $table->unsignedBigInteger('plano_id');

            $table->primary(['simulacao_id', 'plano_id']);

            $table->foreign('simulacao_id')
                ->references('id')
                ->on('simulacoes')
                ->onDelete('cascade');

            $table->foreign('plano_id')
                ->references('id')
                ->on('plano_seguro')
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
        Schema::dropIfExists('items_simulados');
    }
};
