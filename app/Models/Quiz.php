<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    //

    protected $table = 'quizzes';
    protected $fillable = [
        'cliente_id',
        'pergunta',
        'alternativas',
        'correta',
    ];

    protected $casts = [
        'alternativas' => 'array', // permite tratar JSON como array no Laravel
    ];

    public function playlist()
    {
        return $this->belongsTo(ClienteModel::class,'cliente_id');
    }
}
