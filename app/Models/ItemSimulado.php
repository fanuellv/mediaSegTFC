<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemSimulado extends Model
{
    use HasFactory;

    protected $table = 'items_simulados';

    protected $fillable = [
        'simulacao_id',
        'plano_id',
    ];

    public function simulacao()
    {
        return $this->belongsTo(Simulacao::class);
    }

    public function plano()
    {
        return $this->belongsTo(PlanoModel::class, 'plano_id');
    }
}

