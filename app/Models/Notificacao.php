<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Notificacao extends Model
{
    
    protected $table = 'notificacoes';
    protected $fillable = ['titulo', 'mensagem', 'tipo', 'cliente_id', 'lida'];

    // app/Models/Notificacao.php

public function cliente()
{
    return $this->belongsTo(ClienteModel::class, 'cliente_id');
}

}
