<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Estudio;

class EstudioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $estudio = new Estudio;
        $estudio->Id_Estudio = 10000;
        $estudio->Nombre = 'Curso acabado';
        $estudio->save();
    }
}
