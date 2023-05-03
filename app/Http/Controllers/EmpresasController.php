<?php

namespace App\Http\Controllers;
use App\Models\Empresa;
use Illuminate\Http\Request;

class EmpresasController extends Controller
{
    public function index(){
        $empresas = Empresa::all();

        return response()->json($empresas);
    }

    public function delete($CIF){
        $empresa = Empresa::where('CIF', $CIF)->first();
        if ($empresa) {
            $empresa->delete();
            return response()->json(['message' => 'Empresa eliminada correctamente'], 200);
        } else {
            return response()->json(['message' => 'No se encontró la empresa'], 404);
        }
    }

    public function store(Request $request)
    {
        $empresa = new Empresa();
        $empresa->CIF = $request->input('cif');
        $empresa->Convenio = $request->input('convenio');
        $empresa->Nombre = $request->input('nombre');
        $empresa->Direccion = $request->input('direccion');
        $empresa->Telefono = $request->input('telefono');
        $empresa->Tutor = $request->input('tutor');
        $empresa->save();
        return response()->json(['message' => 'Empresa creada correctamente'], 201);
    }
}