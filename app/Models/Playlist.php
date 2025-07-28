<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Playlist extends Model
{
    //
    protected $table = 'play_lists';

    protected $fillable = [
        'nome',
        'descricao',
        'url_videos',
        'autor',
    ];

    protected $casts = [
        'url_videos' => 'array', // Converte automaticamente JSON em array PHP
    ];

    public function cliente()
    {
        return $this->belongsTo(ClienteModel::class, 'cliente_id');
    }
}
