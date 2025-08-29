<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('cliente_learning', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cliente_id');   // referência ao cliente
            $table->unsignedBigInteger('video_id')->nullable(); // vídeo assistido
            $table->boolean('assistiu')->default(false); // se assistiu ou não
            $table->unsignedBigInteger('quiz_id')->nullable();  // quiz relacionado
            $table->boolean('finalizou')->default(false); // se completou todo o processo
            $table->timestamps();

            // relações
            $table->foreign('cliente_id')->references('id')->on('clientes')->onDelete('cascade');
            $table->foreign('video_id')->references('id')->on('play_lists')->onDelete('cascade');
            $table->foreign('quiz_id')->references('id')->on('quizzes')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('cliente_learning');
    }
};
