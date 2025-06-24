<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Comentario extends Model
{
    //
    protected $fillable = ['cliente_id', 'mensagem'];

    public function cliente()
    {
        return $this->belongsTo(ClienteModel::class, 'cliente_id');
    }
}
