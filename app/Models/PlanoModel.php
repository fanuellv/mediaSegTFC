<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PlanoModel extends Model
{
    //
    use HasFactory;

    protected $table = 'plano_seguro';

    protected $fillable = [
        'nome',
        'descricao',
        'valor',
        'duracao',
        'seguradora_id',
    ];

    // Relações opcionais
    public function seguradora()
    {
        return $this->belongsTo(SeguradoraModel::class, 'seguradora_id');
    }

    public function apolice()
    {
        return $this->belongsTo(ApoliceModel::class, 'apolice_id');
    }

    public function cliente()
    {
        return $this->belongsTo(ClienteModel::class, 'cliente_id');
    }
}
