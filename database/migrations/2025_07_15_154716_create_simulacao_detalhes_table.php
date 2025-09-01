<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('simulacao_detalhes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('simulacao_id')->constrained('simulacoes')->onDelete('cascade');
            $table->string('marca_modelo')->nullable();
            $table->string('matricula')->nullable();
            $table->decimal('valor_veiculo', 15, 2)->nullable();
            $table->boolean('tem_franquia')->default(false)->nullable();
            $table->string('tipo_uso')->nullable();
            $table->integer('ano_veiculo')->nullable();

            $table->json('dependentes')->nullable();
            $table->string('idade')->nullable();
            $table->string('profissao')->nullable();
            $table->boolean('fumante')->nullable();
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('simulacao_detalhes');
    }
};
