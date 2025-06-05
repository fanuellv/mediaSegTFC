<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Support\Facades\Hash;

class Administrador extends Authenticatable
{
    protected $table = 'administrador';

    protected $fillable = [
        'nome',
        'sobrenome',
        'nome_usuario',
        'email',
        'dataRegistro',
        'senha',
        'foto',
    ];

    public $timestamps = false;

    protected $hidden = [
        'senha',
    ];

    // Laravel espera "password", então redirecionamos
    public function getAuthPassword()
    {
        return $this->senha;
    }

    // Encripta a senha
    public function setSenhaAttribute($value)
    {
        $this->attributes['senha'] = Hash::make($value);
    }
}
