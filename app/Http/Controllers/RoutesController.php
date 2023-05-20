<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RoutesController extends Controller
{
    public function home()
    {
        return Inertia::render('Home');
    }

    public function usuarios()
    {
        return Inertia::render('Usuarios');
    }

    public function alumnos()
    {
        return Inertia::render('Alumnos');
    }

    public function estudios()
    {
        return Inertia::render('Estudios');
    }

    public function grupos()
    {
        return Inertia::render('Grupos');
    }

    public function tabla()
    {
        return Inertia::render('Tabla');
    }

    public function empresas()
    {
        return Inertia::render('Empresas');
    }

    public function notas()
    {
        return Inertia::render('Notas');
    }

    public function alumnosLista()
    {
        return Inertia::render('AlumnosLista');
    }

    public function inicio()
    {
        return Inertia::render('Welcome');
    }

    
}