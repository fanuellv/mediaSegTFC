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
        Schema::create('log_atividade', function (Blueprint $table) {
            $table->id();
            $table->string('descricao', 255);
            $table->timestamp('data_hora');

            $table->unsignedBigInteger('utilizador_id');
            $table->foreign('utilizador_id')
                ->references('id')
                ->on('utilizador')
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
        Schema::dropIfExists('log_atividade');
    }
};
