<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeguradoraModel extends Model
{
    use HasFactory;

    protected $table = 'seguradoras';

    protected $fillable = [
        'nome',
        'nif',
        'telefone',
        'foto',
        'endereco',
        'descricao',
        'administrador_id',
    ];

    public function administrador()
    {
        return $this->belongsTo(Administrador::class);
    }
}
