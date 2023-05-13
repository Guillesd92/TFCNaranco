<?php

namespace App\Http\Controllers;
use App\Models\Alumno;
use Illuminate\Http\Request;

class AlumnosController extends Controller
{
    public function index(){
        $alumnos = Alumno::all();

        return response()->json($alumnos);
    }

    public function delete($Id_Alumno){
        $alumno = Alumno::where('Id_Alumno', $Id_Alumno)->first();
        if ($alumno) {
            $alumno->delete();
            return response()->json(['message' => 'Estudio eliminado correctamente'], 200);
        } else {
            return response()->json(['message' => 'No se encontró el estudio'], 404);
        }
    }


    public function store(Request $request)
    {
        $alumno = new Alumno();
        $alumno->Nombre = $request->input('nombre');
        $alumno->Apellidos = $request->input('apellidos');
        $alumno->Email = $request->input('email');
        $alumno->Telefono = $request->input('telefono');
        $alumno->Localidad = $request->input('localidad');
        $alumno->Direccion = $request->input('direccion');
        $alumno->Año = $request->input('anio');
        $alumno->Id_Grupo = $request->input('id_grupo');
        //$alumno->Id_Empresa = $request->input('1');
        $alumno->save();
        return response()->json(['message' => 'Estudio creado correctamente'], 201);
    }

    public function asign(Request $request)
    {
        $alumno = Alumno::findOrFail($request->id);
        $alumno->CIF = $request->cif;
        $alumno->save();
        return response()->json(['success' => true]);
    }

   
}
