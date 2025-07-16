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
        'status',
        
    ];


    

    public function cliente()
    {
        return $this->belongsTo(ClienteModel::class);
    }

    public function tipoSeguro()
    {
        return $this->belongsTo(TipoSeguro::class);
    }
    public function itens()
    {
        return $this->hasMany(ItemSimulado::class, 'simulacao_id');
    }

    public function detalhes()
{
    return $this->hasOne(SimulacaoDetalhe::class);
}

public function plano()
{
    return $this->belongsTo(PlanoModel::class, 'plano_id');
}


}

