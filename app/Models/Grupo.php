<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grupo extends Model
{
    use HasFactory;

    protected $table = 'grupo';

    protected $primaryKey = 'Id_Grupo';

    protected $fillable = [
        'Aula',
        'Curso',
    ];

    public function profesores()
    {
        return $this->hasOne(Profesor::class, 'Id_Grupo', 'Id_Grupo');
    }
}