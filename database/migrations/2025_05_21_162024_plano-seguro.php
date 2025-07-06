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
        Schema::create('plano_seguro', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 100);
            $table->string('descricao', 255)->nullable();
            $table->decimal('valor', 10, 2);
            $table->string('duracao');
            
            $table->unsignedBigInteger('seguradora_id');
            
            $table->unsignedBigInteger('cliente_id')->nullable();
        
            $table->timestamps();
        
            $table->foreign('seguradora_id')
                ->references('id')
                ->on('seguradoras')
                ->onDelete('cascade');
        
            
        
            $table->foreign('cliente_id')
                ->references('id')
                ->on('clientes')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('plano_seguro');

    }
};
