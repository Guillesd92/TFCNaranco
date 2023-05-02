<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\RoutesController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome');
});




Route::get('/home', [RoutesController::class, 'home'])->name('home');
Route::get('/usuarios', [RoutesController::class, 'usuarios'])->name('usuarios');
Route::get('/grupos', [RoutesController::class, 'grupos'])->name('grupos');
Route::get('/estudios', [RoutesController::class, 'estudios'])->name('estudios');
Route::get('/alumnos', [RoutesController::class, 'alumnos'])->name('alumnos');
Route::get('/inicio', [RoutesController::class, 'inicio'])->name('inicio');
Route::get('/tabla', [RoutesController::class, 'tabla'])->name('tabla');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
