<?php

namespace App\Http\Controllers;
use App\Models\Estudio;
use Illuminate\Http\Request;

class GruposController extends Controller
{
    public function index(){
        $estudios = Estudio::all();

        return response()->json($estudios);
    }

    public function delete($Id_Estudio){
        $estudio = Estudio::where('Id_Estudio', $Id_Estudio)->first();
        if ($estudio) {
            $estudio->delete();
            return response()->json(['message' => 'Estudio eliminado correctamente'], 200);
        } else {
            return response()->json(['message' => 'No se encontró el estudio'], 404);
        }
    }

    public function store(Request $request)
    {
        $estudio = new Estudio();
        $estudio->Nombre = $request->input('nombre');
        $estudio->save();
        return response()->json(['message' => 'Estudio creado correctamente'], 201);
    }
}
