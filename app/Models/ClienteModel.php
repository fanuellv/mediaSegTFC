<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Hash;

class ClienteModel extends Authenticatable
{
    //
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;
    protected $table = 'clientes';

    protected $fillable = [
        'nome', 'sobrenome', 'nome_usuario', 'email',
        'dataRegistro', 'nif', 'senha', 'telefone', 'foto'
    ];

    protected $hidden = ['senha', 'remember_token'];

    protected $casts = [
        'dataRegistro' => 'datetime',
    ];

    public function simulacoes()
{
    return $this->hasMany(Simulacao::class, 'cliente_id');
}


    // Laravel usa esse método para saber qual campo é a senha
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
