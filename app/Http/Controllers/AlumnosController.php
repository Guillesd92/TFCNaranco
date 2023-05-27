<?php

namespace App\Http\Controllers;
use App\Models\Alumno;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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

    public function filter(Request $request){
        try {

            
            $filtroNombre = $request->input('filtroNombre');
            $filtroEmail = $request->input('filtroEmail');
            $filtroLocalidad = $request->input('filtroLocalidad');
            $filtroAnio = $request->input('filtroAnio');
            $filtroGrupo = $request->input('filtroGrupo');
            


            if (empty($filtroEmail) && empty($filtroLocalidad) && empty($filtroNombre) && empty($filtroAnio) && empty($filtroGrupo) ) {
                $alumnos = Alumno::all();
            } else {
                $alumnos = Alumno::query();

                if ($filtroNombre) {
                    $alumnos->where('Nombre', 'like', "%$filtroNombre%");
                }

                if ($filtroEmail) {
                    $alumnos->where('Email', 'like', "%$filtroEmail%");
                }

                if ($filtroLocalidad) {
                    $alumnos->where('Localidad', 'like', "%$filtroLocalidad%");
                }


                if ($filtroAnio) {
                    $alumnos->where('Año','like', "%$filtroAnio%");
                }

               if ($filtroGrupo!=0) {
                    $alumnos->where('Id_Grupo', $filtroGrupo);
                }


                $alumnos = $alumnos->get();
            }

            return response()->json($alumnos);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al obtener los alumnos'], 500);
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

    public function deleteCIF(Request $request){
        $ids = $request->input('ids');
        $alumnos = Alumno::whereIn('Id_Alumno', $ids)->get();
        
        foreach($alumnos as $alumno) {
          $alumno->CIF = null;
          $alumno->save();
        }
        
        return response()->json(['message' => 'CIF eliminado correctamente']);
    }

    public function importCsv(Request $request)
    {
        if ($request->hasFile('file')) {
            $file = $request->file('file');
           
            $filePath = $file->getRealPath();
    
            $handle = fopen($filePath, 'r');
            var_dump($handle);
    
            while (($line = fgets($handle)) !== false) {
                $data = explode(',', $line);
                
                // Crear un nuevo alumno y asignar los valores directamente del TXT
                $alumno = new Alumno();
                $alumno->Nombre = $data[0];
                $alumno->Apellidos = $data[1];
                $alumno->Email = $data[2];
                $alumno->Telefono = $data[3];
                $alumno->Localidad = $data[4];
                $alumno->Direccion = $data[5];
                $alumno->Año = $data[6];
                $alumno->Id_Grupo = $data[7];
                $alumno->CIF = $data[8];
                $alumno->save();
            }
    
            fclose($handle);
    
            return response()->json(['message' => 'TXT imported successfully'], 200);
        }
    
        return response()->json(['error' => 'No file provided'], 400);
    }
    
}

   

