<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAlumnosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('alumnos', function (Blueprint $table) {
            $table->bigIncrements('Id_Alumno')->unique();
            $table->string('Nombre');
            $table->string('Apellidos');
            $table->string('Email')->unique();
            $table->string('Telefono');
            $table->string('Localidad');
            $table->string('Direccion');
            $table->unsignedBigInteger('Id_Grupo');
            $table->foreign('Id_Grupo')->references('Id_Grupo')->on('grupo');
            $table->unsignedBigInteger('Id_Empresa')->nullable();
            $table->foreign('Id_Empresa')->references('Id_Empresa')->on('empresas');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('alumnos');
    }
}
