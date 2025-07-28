<?php

namespace App\Models;

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $table = 'quizzes';

    protected $fillable = [
        'titulo',
    ];

    public function perguntas()
    {
        return $this->hasMany(perguntas::class);
    }
}


