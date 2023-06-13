<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Grupo;

class GrupoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $grupo = new Grupo;
        $grupo->Aula = 0;
        $grupo->Curso = 0;
        $grupo->Id_Estudio = 10000;
        $grupo->save();
    }
}
