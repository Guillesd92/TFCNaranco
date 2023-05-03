<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Grupo extends Model
{
    use HasFactory;

    protected $table = 'empresas';

    protected $primaryKey = 'CIF';

    protected $fillable = [
        'Convenio',
        'Nombre',
        'Direccion',
        'Telefono',
        'Tutor',
        'Notas'
    ];

  
}
