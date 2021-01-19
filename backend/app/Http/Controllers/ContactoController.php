<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Contacto;
use App\Celular;
use App\Telefono;
use App\Email;
use App\Direccion;

class ContactoController extends Controller
{
    public function index(){
        $data = Contacto::paginate(10);

        $data = array(
            'contactos' => $data,
        );
        
        $code = 200;

        return response()->json($data, $code);

    }
    public function store(Request $request){


        $tipo_de_contacto   = (isset($request->tipo_de_contacto))   ? $request->tipo_de_contacto    :   null;
        $sexo               = (isset($request->sexo))               ? $request->sexo                :   null;
        $nombre_actual      = (isset($request->nombre))             ? $request->nombre              :   null;
        $empresa            = (isset($request->empresa))            ? $request->empresa             :   null;
        $cargo              = (isset($request->cargo))              ? $request->cargo               :   null;
        $facebook           = (isset($request->facebook))           ? $request->facebook            :   null;
        $instagram          = (isset($request->instagram))          ? $request->instagram           :   null;
        $linkedin           = (isset($request->linkedin))           ? $request->linkedin            :   null;
        $medio_contacto     = (isset($request->medio_contacto))     ? $request->medio_contacto      :   null;
        $perfil_pro         = (isset($request->perfil_pro))         ? $request->perfil_pro          :   null;
        $perfil_int_r       = (isset($request->perfil_int_r))       ? $request->perfil_int_r        :   null;
        $perfil_int_c       = (isset($request->perfil_int_c))       ? $request->perfil_int_c        :   null;
        $perfil_inq         = (isset($request->perfil_inq))         ? $request->perfil_inq          :   null;
        $requerimiento      = (isset($request->requerimiento))      ? $request->requerimiento       :   null;

        // Variables para agregar una vez creado el contacto
        $celulares          = (isset($request->celulares))          ? $request->celulares           :   null;
        $telefonos          = (isset($request->telefonos))          ? $request->telefonos           :   null;
        $emails             = (isset($request->emails))             ? $request->emails              :   null;
        $direcciones        = (isset($request->direcciones))        ? $request->direcciones         :   null;


        if ( !is_null($nombre_actual) && !is_null($emails) ) {
            $nuevo_contacto = new Contacto();
            $nuevo_contacto->tipo_de_contacto = $tipo_de_contacto;
            $nuevo_contacto->sexo = $sexo;
            $nuevo_contacto->nombre_actual = $nombre_actual;
            $nuevo_contacto->empresa = $empresa;
            $nuevo_contacto->cargo = $cargo;
            $nuevo_contacto->facebook = $facebook;
            $nuevo_contacto->instagram = $instagram;
            $nuevo_contacto->linkedin = $linkedin;
            $nuevo_contacto->medio_contacto = $medio_contacto;
            $nuevo_contacto->perfil_pro = $perfil_pro;
            $nuevo_contacto->perfil_int_r = $perfil_int_r;
            $nuevo_contacto->perfil_int_c = $perfil_int_c;
            $nuevo_contacto->perfil_inq = $perfil_inq;
            $nuevo_contacto->requerimiento = $requerimiento;

            $error = '';
            //Guardar el registro
            try {
                $nuevo_contacto->save();
            } catch (\Throwable $th) {
                $error = $th;
            }

            // Crear registro de los arreglos que se envían
            foreach ($celulares as $key => $celular) {

                if ($celular['tipo'] === "1") {
                    $tipo = 'De trabajo';
                }else{
                    $tipo = 'Personal';
                }
                $nuevo_celular = new Celular();
                $nuevo_celular->id_contacto = $nuevo_contacto->id;
                $nuevo_celular->numero = $celular['celular'];
                $nuevo_celular->descripcion = $tipo;
                try {
                    $nuevo_celular->save();
                } catch (\Throwable $th) {
                    $error = $th;
                }
            }
            foreach ($telefonos as $key => $telefono) {

                switch ($telefono['tipo']) {
                    case '1':
                        $tipo_telefono = 'Casa';
                        break;
                    case '2':
                        $tipo_telefono = 'Fax de casa';
                        break;
                    case '3':
                        $tipo_telefono = 'Fax de trabajo';
                        break;
                    case '4':
                        $tipo_telefono = 'Nextel';
                        break;
                    case '5':
                        $tipo_telefono = 'Trabajo';
                        break;
                    
                    default:
                        # code...
                        break;
                }

                $nuevo_telefono = new Telefono();
                $nuevo_telefono->id_contacto = $nuevo_contacto->id;
                $nuevo_telefono->numero = $telefono['telefono'];
                $nuevo_telefono->descripcion = $tipo_telefono;

                try {
                    $nuevo_telefono->save();
                } catch (\Throwable $th) {
                    $error = $th;
                }
            }
            foreach ($emails as $key => $email) {

                switch ($email['tipo']) {
                    case '1':
                        $tipo_email = 'De trabajo';
                        break;
                    case '2':
                        $tipo_email = 'Personal';
                        break;
                    
                    default:
                        # code...
                        break;
                }

                $nuevo_email = new Email();
                $nuevo_email->id_contacto = $nuevo_contacto->id;
                $nuevo_email->email = $email['email'];
                $nuevo_email->descripcion = $tipo_email;

                try {
                    $nuevo_email->save();
                } catch (\Throwable $th) {
                    $error = $th;
                }
            }
            foreach ($direcciones as $key => $direccion) {
                $nueva_direccion = new Direccion();
                $nueva_direccion->id_contacto = $nuevo_contacto->id;
                $nueva_direccion->direccion = $direccion['direccion'];
                try {
                    $nueva_direccion->save();
                } catch (\Throwable $th) {
                    $error = $th;
                }
            }
            
            $data = array(
                'celulares' => $request->celulares,
                'nuevo_contacto' => $nuevo_contacto,
                'error' => $error
            );
            $code = 200;
        }else{
            $data = array(
                'status' => 'Ocurrio un error'
            );
            $code = 200;
        }

        

        return response()->json($data, $code);
    }
}
