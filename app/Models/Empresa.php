<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Alumno;

class Empresa extends Model
{
    use HasFactory;

    protected $primaryKey = 'CIF';
    public $incrementing = false;

    protected $fillable = [
        'CIF',
        'Convenio',
        'Nombre',
        'Direccion',
        'Telefono',
        'Tutor',
        'Notas',
    ];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function alumnos()
    {
        return $this->hasMany(Alumno::class);
    }
}