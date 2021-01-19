<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\Contacto;
use App\Models\Celular;
use App\Models\Telefono;
use App\Models\Email;
use App\Models\Direccion;

class ContactoController extends Controller
{
    public function index(){
        $data = Contacto::with('celulares')
        ->with('telefonos')
        ->with('emails')
        ->with('direcciones')
        ->paginate(10);

        $data = array(
            'contactos' => $data,
        );
        
        $code = 200;

        return response()->json($data, $code);

    }
    public function show($id){
        $contacto = Contacto::find($id);
        
        $data = array(
            'contacto' => $contacto,
            'status' => 'Exito'
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
    public function update($id, Request $request){


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

            $perfil_pro     = $perfil_pro   == false ? 0 : 1;
            $perfil_int_r   = $perfil_int_r == false ? 0 : 1;
            $perfil_int_c   = $perfil_int_c == false ? 0 : 1;
            $perfil_inq     = $perfil_inq   == false ? 0 : 1;


            $nuevo_contacto = Contacto::find($id);
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

                
                $encontrar_cel = Celular::where('id', '=', $celular['id'])->first();
                
                if ($encontrar_cel == null) {
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
                
            }
            foreach ($telefonos as $key => $telefono) {
                
                $encontrar_tel = Telefono::where('id', '=', $telefono['id'])->first();
                
                if ($encontrar_tel == null) {

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
            }
            foreach ($emails as $key => $email) {

                $encontrar_email = Email::where('id', '=', $email['id'])->first();
                
                if ($encontrar_email == null) {

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
            }
            foreach ($direcciones as $key => $direccion) {
                
                $encontrar_direccion = Direccion::where('id', '=', $direccion['id'])->first();
                
                if ($encontrar_direccion == null) {

                    $nueva_direccion = new Direccion();
                    $nueva_direccion->id_contacto = $nuevo_contacto->id;
                    $nueva_direccion->direccion = $direccion['direccion'];
                    try {
                        $nueva_direccion->save();
                    } catch (\Throwable $th) {
                        $error = $th;
                    }
                }
            }
            
            $data = array(
                'request' => $request->all(),
                'nuevo_contacto' => $nuevo_contacto,
                'error' => $error
            );
        

            // $data = array(
            //     'request' => $request->all(),
            //     'status' => 'testing'
            // );
            $code = 200;
        }else{
            $data = array(
                'status' => 'Ocurrio un error'
            );
            $code = 200;
        }


        

        return response()->json($data, $code);
    }
    public function buscarPorNombre(Request $request){

        switch ($request->tipo_de_contacto) {
            case 1:
                $perfil_seleccionado = 'perfil_pro';
                break;
            case 2:
                $perfil_seleccionado = 'perfil_int_r';
                break;
            case 3:
                $perfil_seleccionado = 'perfil_int_c';
                break;
            case 4:
                $perfil_seleccionado = 'perfil_inq';
                break;
            
            default:
                # code...
                break;
        }

        $contacto = Contacto::where('nombre_actual','like', "%{$request->texto}%")
        ->where($perfil_seleccionado, '=', 1)
        ->with('celulares')
        ->with('telefonos')
        ->with('emails')
        ->with('direcciones')
        ->paginate(10);
        
        if ($contacto != null) {
            $data = array(
                'contactos' => $contacto,
                'status' => 'Exito'
            );
        }else{
            $data = array(
                'status' => 'No se encontró el contacto'
            );
        }
        
        $code = 200;

        return response()->json($data, $code);
    }
    public function buscarPorCelular(Request $request){
        switch ($request->tipo_de_contacto) {
            case 1:
                $perfil_seleccionado = 'perfil_pro';
                break;
            case 2:
                $perfil_seleccionado = 'perfil_int_r';
                break;
            case 3:
                $perfil_seleccionado = 'perfil_int_c';
                break;
            case 4:
                $perfil_seleccionado = 'perfil_inq';
                break;
            
            default:
                # code...
                break;
        }

        $numeros = Celular::where('numero','like', "%{$request->texto}%")->paginate(10);
        $contactos = Array();

        if ($numeros != null) {

            foreach ($numeros as $key => $numero) {
                $contacto = Contacto::where('id','=', $numero->id_contacto)
                ->where($perfil_seleccionado, '=', 1)
                ->first()
                ->load('celulares')
                ->load('telefonos')
                ->load('emails')
                ->load('direcciones');

                array_push($contactos, $contacto);
            }

            $data = array(
                'contactos' => $contactos,
                'status' => 'Exito'
            );
        }else{
            $data = array(
                'status' => 'No se encontró el contacto'
            );
        }
        
        $code = 200;

        return response()->json($data, $code);
    }
    public function buscarPorTelefono(Request $request){
        switch ($request->tipo_de_contacto) {
            case 1:
                $perfil_seleccionado = 'perfil_pro';
                break;
            case 2:
                $perfil_seleccionado = 'perfil_int_r';
                break;
            case 3:
                $perfil_seleccionado = 'perfil_int_c';
                break;
            case 4:
                $perfil_seleccionado = 'perfil_inq';
                break;
            
            default:
                # code...
                break;
        }
        $numeros = Telefono::where('numero','like', "%{$request->texto}%")->paginate(10);
        $contactos = Array();
        
        if ($numeros != null) {

            foreach ($numeros as $key => $numero) {
                $contacto = Contacto::where('id','=', $numero->id_contacto)
                ->where($perfil_seleccionado, '=', 1)
                ->first()
                ->load('celulares')
                ->load('telefonos')
                ->load('emails')
                ->load('direcciones');

                array_push($contactos, $contacto);
            }

            $data = array(
                'contactos' => $contactos,
                'status' => 'Exito'
            );
        }else{
            $data = array(
                'status' => 'No se encontró el contacto'
            );
        }
        
        $code = 200;

        return response()->json($data, $code);
    }
    public function buscarPorEmail(Request $request){
        switch ($request->tipo_de_contacto) {
            case 1:
                $perfil_seleccionado = 'perfil_pro';
                break;
            case 2:
                $perfil_seleccionado = 'perfil_int_r';
                break;
            case 3:
                $perfil_seleccionado = 'perfil_int_c';
                break;
            case 4:
                $perfil_seleccionado = 'perfil_inq';
                break;
            
            default:
                # code...
                break;
        }
        $emails = Email::where('email','like', "%{$request->texto}%")->paginate(10);
        $contactos = Array();
        
        if ($emails != null) {

            foreach ($emails as $key => $email) {
                $contacto = Contacto::where('id','=', $email->id_contacto)
                ->where($perfil_seleccionado, '=', 1)
                ->first()
                ->load('celulares')
                ->load('telefonos')
                ->load('emails')
                ->load('direcciones');

                array_push($contactos, $contacto);
            }

            $data = array(
                'contactos' => $contactos,
                'status' => 'Exito'
            );
        }else{
            $data = array(
                'status' => 'No se encontró el contacto'
            );
        }
        
        $code = 200;

        return response()->json($data, $code);
    }
    public function contactos_especificos(Request $request){
        switch ($request->tipo_de_contacto) {
            case 1:
                $perfil_seleccionado = 'perfil_pro';
                break;
            case 2:
                $perfil_seleccionado = 'perfil_int_r';
                break;
            case 3:
                $perfil_seleccionado = 'perfil_int_c';
                break;
            case 4:
                $perfil_seleccionado = 'perfil_inq';
                break;
            
            default:
                # code...
                break;
        }
        $data = Contacto::where($perfil_seleccionado, '=', 1)
        ->with('celulares')
        ->with('telefonos')
        ->with('emails')
        ->with('direcciones')
        ->paginate(10);

        $data = array(
            'contactos' => $data,
            'request' => $request->all()
        );
        
        $code = 200;

        return response()->json($data, $code);
    }
}