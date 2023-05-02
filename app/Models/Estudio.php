<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Profesor;


class Estudio extends Model
{
    use HasFactory;

    protected $primaryKey = 'Id_Estudio';

    protected $fillable = [
        'Nombre'
    ];

    public function profesores()
    {
        return $this->hasMany(Profesor::class, 'Id_Estudio', 'Id_Estudio');
    }
}
