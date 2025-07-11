<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Simulacao extends Model
{

    protected $table = 'simulacoes';
    protected $fillable = [
        'cliente_id',
        'tipo_seguro_id',
        'data',
        'valor_calculado',
        'status'
    ];

    

    public function cliente()
    {
        return $this->belongsTo(ClienteModel::class);
    }

    public function tipoSeguro()
    {
        return $this->belongsTo(TipoSeguro::class);
    }
}

