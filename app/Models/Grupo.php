<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Profesor;
use App\Models\Estudio;

class Grupo extends Model
{
    use HasFactory;

    protected $table = 'grupo';

    protected $primaryKey = 'Id_Grupo';

    protected $fillable = [
        'Aula',
        'Curso',
        'Id_Estudio',
    ];

    public function profesores()
    {
        return $this->hasMany(Profesor::class, 'Id_Grupo', 'Id_Grupo');
    }

    public function estudio()
    {
        return $this->belongsTo(Estudio::class, 'Id_Estudio');
    }
}