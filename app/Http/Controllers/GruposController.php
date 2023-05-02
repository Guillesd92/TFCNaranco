<?php

namespace App\Http\Controllers;
use App\Models\Grupo;
use Illuminate\Http\Request;

class GruposController extends Controller
{
    public function index(){
        $grupos = Grupo::all();

        return response()->json($grupos);
    }

    public function delete($Id_Grupo){
        $grupo = Grupo::where('Id_Grupo', $Id_Grupo)->first();
        if ($grupo) {
            $grupo->delete();
            return response()->json(['message' => 'Usuario eliminado correctamente'], 200);
        } else {
            return response()->json(['message' => 'No se encontró el usuario'], 404);
        }
    }

    public function store(Request $request)
    {
        $grupo = new Grupo();
        $grupo->Aula = $request->input('aula');
        $grupo->Curso = $request->input('curso');
        $grupo->Id_Estudio = $request->input('id_Estudio');
        $grupo->save();
    }
}
