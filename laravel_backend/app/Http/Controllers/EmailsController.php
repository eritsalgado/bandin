<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Email;
use App\Models\HistorialEmails;

class EmailsController extends Controller
{
    public function destroy($id, Request $request){
        $email = Email::find($id);

        if ($email != null) {
            $email->delete();
            $historico_email = new HistorialEmails();
            $historico_email->id_historico = $email->id;
            $historico_email->id_contacto = $email->id_contacto;
            $historico_email->email = $email->email;
            $historico_email->descripcion = $email->descripcion;
            $historico_email->created_at = $email->created_at;
            $historico_email->updated_at = $email->updated_at;
            $historico_email->save();
            $data = array(
                'email' => $email,
                'historico_email' => $historico_email,
                'status' => 'Correcto'
            );
        }else{
            $data = array(
                'email' => $email,
                'status' => 'No hay registro'
            );
        }
        

        
        
        $code = 200;

        return response()->json($data, $code);
    }
}
