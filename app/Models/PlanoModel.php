<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $nome
 
 * @property \Illuminate\Support\Carbon $dataRegistro

 * @property string $telefone
 * @property string|null $foto
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 */
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
        'foto',
        'cobertura',
        'seguradora_id',
        'tipo_id'
    ];

    // Relações opcionais
    public function seguradora()
    {
        return $this->belongsTo(SeguradoraModel::class, 'seguradora_id');
    }
    public function tipo()
    {
        return $this->belongsTo(tipoSeguro::class, 'tipo_id');
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
