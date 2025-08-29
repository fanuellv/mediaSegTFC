<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClienteLearning extends Model
{
    protected $table = 'cliente_learning';

    protected $fillable = [
        'cliente_id',
        'video_id',
        'quiz_id',
        'assistiu',
        'finalizou',
    ];

    public function cliente()
    {
        return $this->belongsTo(ClienteModel::class);
    }

    public function video()
    {
        return $this->belongsTo(Playlist::class, 'video_id');
    }

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
}

