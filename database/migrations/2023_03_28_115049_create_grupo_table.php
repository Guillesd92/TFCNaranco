<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('grupo', function (Blueprint $table) {
            $table->bigIncrements('Id_Grupo')->autoIncrement();
            $table->integer('Aula');
            $table->integer('Curso');
            $table->unsignedBigInteger('Id_Estudio')->nullable();
            $table->foreign('Id_Estudio')->references('Id_Estudio')->on('estudios');
            $table->timestamps();

            $table->unique(['Aula', 'Curso']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('grupo');
    }
};

