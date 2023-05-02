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
            $table->bigIncrements('Id_Profesor')->autoIncrement();
            $table->string('Nombre');
            $table->string('Apellidos');
            $table->string('Email')->unique();
            $table->string('Password');
            $table->unsignedBigInteger('Id_Grupo')->nullable();
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
