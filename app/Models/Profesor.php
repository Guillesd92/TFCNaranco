<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profesor extends Model
{
    use HasFactory;

    protected $table = 'profesores';

    protected $primaryKey = 'Id_Profesor';

    protected $fillable = [
        'Nombre',
        'Apellidos',
        'Email',
        'Password',
        'Id_Estudio',
        'Id_Grupo'
    ];

    public function estudio()
    {
        return $this->belongsTo(Estudio::class, 'Id_Estudio');
    }

    public function grupo()
    {
        return $this->belongsTo(Grupo::class, 'Id_Grupo');
    }
}