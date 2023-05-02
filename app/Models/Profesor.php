<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Grupo;
use App\Models\Estudio;

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
        'Id_Grupo'
    ];

    

    public function grupo()
    {
        return $this->belongsTo(Grupo::class, 'Id_Grupo');
    }
}