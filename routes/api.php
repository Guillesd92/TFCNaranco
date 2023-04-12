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