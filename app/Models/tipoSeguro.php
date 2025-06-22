<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class tipoSeguro extends Model
{
    //
    protected $fillable = [
        'Vida',
        'Saude',
        'Automovel',
    ];

    protected $table = 'TipoSeguro';
}
