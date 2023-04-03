<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProfesoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('profesores', function (Blueprint $table) {
            $table->bigIncrements('Id_Profesor');
            $table->string('Nombre');
            $table->string('Apellidos');
            $table->string('Email')->unique();
            $table->string('Password');
            $table->unsignedBigInteger('Id_Estudio');
            $table->foreign('Id_Estudio')->references('Id_Estudio')->on('estudios');
            $table->unsignedBigInteger('Id_Grupo');
            $table->foreign('Id_Grupo')->references('Id_Grupo')->on('grupo');
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
        Schema::dropIfExists('profesores');
    }
}
