<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class perguntas extends Model
{
    //
    protected $table = 'perguntas';

    protected $fillable = [
        'quiz_id',
        'pergunta',
        'alternativas',
        'correta',
    ];

    protected $casts = [
        'alternativas' => 'array',
    ];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    
}
