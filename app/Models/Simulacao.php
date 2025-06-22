<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Simulacao extends Model
{
    protected $fillable = [
        'cliente_id',
        'tipo_seguro_id',
        'data',
        'valor_calculado',
        'status'
    ];

    protected $table = 'simulacoes';

    public function cliente()
    {
        return $this->belongsTo(ClienteModel::class);
    }

    public function tipoSeguro()
    {
        return $this->belongsTo(TipoSeguro::class);
    }
}

