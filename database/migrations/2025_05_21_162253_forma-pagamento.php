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
        Schema::create('forma_pagamento', function (Blueprint $table) {
            $table->id();
            $table->string('descricao', 100);

            $table->unsignedBigInteger('simulacao_id');
            $table->foreign('simulacao_id')
                ->references('id')
                ->on('simulacao_pagamento')
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
        Schema::dropIfExists('forma_pagamento');
    }
};
