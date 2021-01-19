<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Celular;
use App\Models\HistoricoCelular;

class CelularesController extends Controller
{
    public function destroy($id, Request $request){
        $celular = Celular::find($id);

        if ($celular != null) {
            $celular->delete();
            $historico_celular = new HistoricoCelular();
            $historico_celular->id_historico = $celular->id;
            $historico_celular->id_contacto = $celular->id_contacto;
            $historico_celular->numero = $celular->numero;
            $historico_celular->descripcion = $celular->descripcion;
            $historico_celular->created_at = $celular->created_at;
            $historico_celular->updated_at = $celular->updated_at;
            $historico_celular->save();
            $data = array(
                'celular' => $celular,
                'historico_celular' => $historico_celular,
                'status' => 'Correcto'
            );
        }else{
            $data = array(
                'celular' => $celular,
                'status' => 'No hay registro'
            );
        }
        

        
        
        $code = 200;

        return response()->json($data, $code);
    }
}
