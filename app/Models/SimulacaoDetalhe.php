<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SimulacaoDetalhe extends Model
{
    protected $table = 'simulacao_detalhes';

    protected $fillable = [
        'simulacao_id',
        'marca_modelo',
        'matricula',
        'valor_veiculo',
        'tem_franquia',
        'tipo_uso',
        'ano_veiculo',
    ];

    public function simulacao()
    {
        return $this->belongsTo(Simulacao::class);
    }
}

