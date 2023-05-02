<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmpresasTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('empresas', function (Blueprint $table) {
            $table->string('CIF')->primary();
            $table->string('Nombre');
            $table->string('Direccion');
            $table->integer('Telefono');
            $table->string('Tutor');
            $table->unsignedBigInteger('Id_Profesor');
            $table->foreign('Id_Profesor')->references('Id_Profesor')->on('profesores');
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
        Schema::dropIfExists('empresas');
    }
}
