<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApoliceModel extends Model
{
    protected $table = 'apolices'; // ou 'apolice', se for o nome correto

    protected $fillable = [
        'numero',
        'cliente_id',
        'plano_id',
        'fatura_id',
        'data_inicio',
        'data_fim',
        'valor_total',
    ];

    public function cliente() {
        return $this->belongsTo(ClienteModel::class);
    }

    public function plano() {
        return $this->belongsTo(PlanoModel::class);
    }

}
