<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Direccion;
use App\Models\HistorialDirecciones;

class DireccionesController extends Controller
{
    public function destroy($id, Request $request){
        $direccion = Direccion::find($id);

        if ($direccion != null) {
            $direccion->delete();
            $historico_direccion = new HistorialDirecciones();
            $historico_direccion->id_historico = $direccion->id;
            $historico_direccion->id_contacto = $direccion->id_contacto;
            $historico_direccion->direccion = $direccion->direccion;
            $historico_direccion->created_at = $direccion->created_at;
            $historico_direccion->updated_at = $direccion->updated_at;
            $historico_direccion->save();
            $data = array(
                'direccion' => $direccion,
                'historico_direccion' => $historico_direccion,
                'status' => 'Correcto'
            );
        }else{
            $data = array(
                'direccion' => $direccion,
                'status' => 'No hay registro'
            );
        }
        

        
        
        $code = 200;

        return response()->json($data, $code);
    }
}
