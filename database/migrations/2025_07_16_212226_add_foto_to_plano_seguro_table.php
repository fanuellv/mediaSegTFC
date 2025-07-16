<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('plano_seguro', function (Blueprint $table) {
        $table->string('foto')->nullable()->after('descricao'); // ou onde fizer sentido
    });
}

public function down()
{
    Schema::table('plano_seguro', function (Blueprint $table) {
        $table->dropColumn('foto');
    });
}

};
