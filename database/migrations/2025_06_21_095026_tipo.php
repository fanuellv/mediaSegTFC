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
        Schema::table('plano_seguro', function (Blueprint $table) {
            //
            $table->unsignedBigInteger('tipo_id')->after('id'); // ou onde quiser

            // Adiciona chave estrangeira
            $table->foreign('tipo_id')->references('id')->on('TipoSeguro')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('plano_seguro', function (Blueprint $table) {
            //
            //$table->dropForeign(['tipo_id']);
            //$table->dropColumn('tipo_id');
        });
    }
};
