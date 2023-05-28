<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::get('/profesores', 'App\Http\Controllers\ProfesorController@index');
Route::delete('/profesores/{Id_Profesores}', 'App\Http\Controllers\ProfesorController@delete');
Route::post('/profesores', 'App\Http\Controllers\ProfesorController@store');
Route::post('/login', 'App\Http\Controllers\ProfesorController@login');
Route::get('/grupos', 'App\Http\Controllers\GruposController@index');
Route::delete('/grupos/{Id_Grupo}', 'App\Http\Controllers\GruposController@delete');
Route::post('/grupos', 'App\Http\Controllers\GruposController@store');
Route::get('/estudios', 'App\Http\Controllers\EstudiosController@index');
Route::delete('/estudios/{Id_Estudio}', 'App\Http\Controllers\EstudiosController@delete');
Route::post('/estudios', 'App\Http\Controllers\EstudiosController@store');
Route::get('/alumnos', 'App\Http\Controllers\AlumnosController@index');
Route::delete('/alumnos/{Id_Alumno}', 'App\Http\Controllers\AlumnosController@delete');
Route::post('/alumnos', 'App\Http\Controllers\AlumnosController@store');
Route::post('/alumno', 'App\Http\Controllers\AlumnosController@asign');
Route::post('/alumnosBorrarCIF', 'App\Http\Controllers\AlumnosController@deleteCIF');
Route::get('/alumnosSinCIF', 'App\Http\Controllers\AlumnosController@getStudentsWithoutCIF');
Route::post('/alumnosFiltro', 'App\Http\Controllers\AlumnosController@filter');
Route::post('/alumnosMover', 'App\Http\Controllers\AlumnosController@move');
Route::post('/alumnosImportarCsv', 'App\Http\Controllers\AlumnosController@importCsv');
Route::get('/empresas', 'App\Http\Controllers\EmpresasController@index');
Route::delete('/empresas/{CIF}', 'App\Http\Controllers\EmpresasController@delete');
Route::post('/empresasStore', 'App\Http\Controllers\EmpresasController@store');
Route::get('/empresa/{CIF}', 'App\Http\Controllers\EmpresasController@find');
Route::post('/empresa/{CIF}', 'App\Http\Controllers\EmpresasController@modify');
Route::post('/empresaNotas', 'App\Http\Controllers\EmpresasController@saveNotes');
Route::post('/empresasFiltro', 'App\Http\Controllers\EmpresasController@filter');
