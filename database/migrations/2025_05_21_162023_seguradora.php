<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\SeguradoraModel;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::create('seguradoras', function (Blueprint $table) {
            $table->id();
            $table->string('nome', 100);
            $table->string('nif', 14)->unique();
            $table->string('telefone', 20);
            $table->string('foto')->nullable(); // caminho da imagem
            $table->string('endereco', 100);
            $table->string('email', 100)->nullable();
            $table->text('descricao');
            $table->unsignedBigInteger('administrador_id');
            $table->timestamps();

            $table->foreign('administrador_id')
                ->references('id')
                ->on('administrador')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('seguradora');
    }
};
