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

    public function filter(Request $request){
        try {
            $filtroCIF = $request->input('filtroCIF');
            $filtroConvenio = $request->input('filtroConvenio');
            $filtroNombre = $request->input('filtroNombre');
            $filtroDireccion = $request->input('filtroDireccion');
          


            if (empty($filtroCIF) && empty($filtroConvenio) && empty($filtroNombre) && empty($filtroDireccion)) {
                $empresas = Empresa::all();
            } else {
                $empresas = Empresa::query();

                if ($filtroCIF) {
                    $empresas->where('cif', 'like', "%$filtroCIF%");
                }

                if ($filtroConvenio) {
                    $empresas->where('convenio', 'like', "%$filtroConvenio%");
                }

                if ($filtroNombre) {
                    $empresas->where('nombre', 'like', "%$filtroNombre%");
                }

                if ($filtroDireccion) {
                    $empresas->where('Direccion', 'like', "%$filtroDireccion%");
                }


                $empresas = $empresas->get();
            }

            return response()->json($empresas);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener las empresas'], 500);
        }
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

    public function find($CIF){

        $empresa = Empresa::where('CIF', $CIF)->first();

        if($empresa){
            return response()->json($empresa);
        } else {
            return response()->json(['message' => 'Empresa no encontrada'], 404);
        }
    }

    public function modify($CIF, Request $request){
        $empresa = Empresa::where('CIF', $CIF)->first(); 
        
        if ($empresa) { 
            $empresa->update([
                'CIF'=> $request->input('cif'),
                'Convenio' => $request->input('convenio'),
                'Nombre' => $request->input('nombre'),
                'Direccion' => $request->input('direccion'),
                'Telefono' => $request->input('telefono'),
                'Tutor' => $request->input('tutor')
            ]);
    
            return response()->json(['message' => 'Empresa actualizada exitosamente',]);
        } else {
            return response()->json(['message' => 'La empresa no existe'], 404);
        }
    }

    public function saveNotes(Request $request){
        $empresa = Empresa::where('CIF', $request->input('cif'))->first(); 
        
        if ($empresa) { 
            $empresa->update([
                'Notas' => $request->input('notas')
            ]);
    
            return response()->json(['message' => 'Empresa actualizada exitosamente',]);
        } else {
            return response()->json(['message' => 'La empresa no existe'], 404);
        }
    }
}
