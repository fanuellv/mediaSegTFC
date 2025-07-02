<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class tipoSeguro extends Model
{
    //
    protected $fillable = ['nome']; // 'nome' é o nome da coluna na tabela

    protected $table = 'TipoSeguro';
}
