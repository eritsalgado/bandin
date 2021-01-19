<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Telefono;
use App\Models\HistorialTelefonos;

class TelefonosController extends Controller
{
    public function destroy($id, Request $request){
        $telefono = Telefono::find($id);

        if ($telefono != null) {
            $telefono->delete();
            $historico_telefono = new HistorialTelefonos();
            $historico_telefono->id_historico = $telefono->id;
            $historico_telefono->id_contacto = $telefono->id_contacto;
            $historico_telefono->numero = $telefono->numero;
            $historico_telefono->descripcion = $telefono->descripcion;
            $historico_telefono->created_at = $telefono->created_at;
            $historico_telefono->updated_at = $telefono->updated_at;
            $historico_telefono->save();
            $data = array(
                'telefono' => $telefono,
                'historico_telefono' => $historico_telefono,
                'status' => 'Correcto'
            );
        }else{
            $data = array(
                'telefono' => $telefono,
                'status' => 'No hay registro'
            );
        }
        

        
        
        $code = 200;

        return response()->json($data, $code);
    }
}
