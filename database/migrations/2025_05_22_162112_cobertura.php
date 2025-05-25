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
        Schema::create('cobertura', function (Blueprint $table) {
            $table->id();
            $table->string('descricao', 255);
            $table->unsignedBigInteger('plano_seguro_id');  // chave estrangeira

            $table->foreign('plano_seguro_id')
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
        Schema::dropIfExists('cobertura');
    }
};
