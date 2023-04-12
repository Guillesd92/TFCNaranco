<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Profesor;

class ProfesorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $profesor = new Profesor;
        $profesor->Nombre = 'Admin';
        $profesor->Apellidos = 'Admin';
        $profesor->Email = 'admin@admin.com';
        $profesor->Password = bcrypt('admin');
        $profesor->Id_Estudio = null;
        $profesor->Id_Grupo = null;
        $profesor->save();
    }
}

