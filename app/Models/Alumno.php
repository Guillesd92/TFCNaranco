<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Grupo;
use App\Models\Empresa;

class Alumno extends Model
{
    use HasFactory;

    protected $table = 'alumnos';
    protected $primaryKey = 'Id_Alumno';
    protected $fillable = ['Nombre', 'Apellidos', 'Email', 'Telefono', 'Localidad', 'Direccion', 'Id_Grupo', 'CIF'];

    public function grupo()
    {
        return $this->belongsTo(Grupo::class, 'Id_Grupo');
    }

    public function empresa()
    {
        return $this->belongsTo(Empresa::class, 'CIF');
    }
}







