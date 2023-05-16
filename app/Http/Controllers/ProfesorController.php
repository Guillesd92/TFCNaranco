<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Profesor;
use Illuminate\Support\Facades\Hash;

class ProfesorController extends Controller
{
    public function index(){
        $profesores = Profesor::all();

        return response()->json($profesores);
    }

    public function delete($Id_Profesor){
        $profesor = Profesor::where('Id_Profesor', $Id_Profesor)->first();
        if ($profesor) {
            $profesor->delete();
            return response()->json(['message' => 'Usuario eliminado correctamente'], 200);
        } else {
            return response()->json(['message' => 'No se encontró el usuario'], 404);
        }
    }
  

    public function login(Request $request){
        $email = $request->input('email');
        $password = $request->input('password');

        $profesor = Profesor::where('email', $email)->first();

        if (!$profesor) {
            return response()->json(['error' => 'No existe ese usuario'], 404);
        }

        if (Hash::check($password, $profesor->Password)) {
           
            if($email=='admin@admin.com'){
                return response()->json(['message' => 'Email/Contraseña coinciden', 'isAdmin' => true], 200);
            }else{
                return response()->json(['message' => 'Email/Contraseña coinciden', 'isAdmin' => false], 200);
            }
            
        } else {
            return response()->json(['error' => 'Contraseña inválida'], 401);
        }
    }

    public function store(Request $request)
    {
        $profesor = new Profesor();
       
        $profesor->Nombre = $request->input('nombre');
        $profesor->Apellidos = $request->input('apellidos');
        $profesor->Email = $request->input('email');
        $profesor->Password = bcrypt($request->input('password')); 
        $profesor->Id_Grupo = $request->input('grupo');
        $profesor->save();
    
      
    }

    
}
