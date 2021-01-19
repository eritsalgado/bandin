import React, {useState, useContext} from 'react'

// Iconos de tipo de contacto
import contacto_gral from '../assets/img/Opcion Gral contacto.svg'
import contacto_int_compra from '../assets/img/Icon Int en compra.svg'
import contacto_int_renta from '../assets/img/Icon Int en renta.svg'
import contacto_inquilino from '../assets/img/Icon Inquilino.svg'
import contacto_propietario from '../assets/img/Icon propietario.svg'
// Iconos de sexo de tipo de contacto
import propietario_h from '../assets/img/Icon propietario H.svg'
import propietario_m from '../assets/img/Icon propietario M.svg'

import intCompra_h from '../assets/img/Icon Int en compra H.svg'
import intCompra_m from '../assets/img/Icon Int en compra M.svg'

import intRenta_h from '../assets/img/Icon Int en venta H.svg'
import intRenta_m from '../assets/img/Icon Int en venta M.svg'

import inq_h from '../assets/img/Icon Inquilino H.svg'
import inq_m from '../assets/img/Icon Inquilino M.svg'

// Iconos de tipo de contacto

import icon_money_green from '../assets/img/Icon Venta.svg'
import icon_money_yell from '../assets/img/Icon Renta.svg'
import icon_money_red from '../assets/img/Icon Renta Esp.svg'

import icon_sex_h from '../assets/img/Icon select contacto H.svg'
import icon_sex_m from '../assets/img/Icon select contacto M.svg'

import icon_sex_h_select from '../assets/img/Icon tipo contacto H.svg'
import icon_sex_m_select from '../assets/img/Icon tipo contacto M.svg'

import icono_prop_h from '../assets/img/Icon propietario H.svg'

import icon_celular from '../assets/img/icon celular.svg'
import icon_otro_tipo_contacto from '../assets/img/Icon Otro tipo_contacto.svg'
import icon_job from '../assets/img/Icon trabajo.svg'
import icon_cargo from '../assets/img/Icon cargo.svg'
import icon_email from '../assets/img/Icon Correo elect.svg'
import icon_tel from '../assets/img/Icon telefono fijo.svg'
import icon_dire from '../assets/img/Icon Direccion.svg'
import icon_check from '../assets/img/Icon selecciona.svg'


import facebook_img from '../assets/img/Icono facebook.svg'
import instagram_img from '../assets/img/icono instagram.svg'
import linkedin_img from '../assets/img/icono linkedin.svg'

import icon_checked from '../assets/img/Icon check.svg'

import '../assets/css/datos_empresa.css'

import { v4 as uuidv4 } from 'uuid';

import swal from 'sweetalert'

import axios from 'axios'

import { ContactoContext } from '../context/contactoContext'


// Una vez creado el id, se habilitan todos los demas campos
const DatosEmpresa = ({toggle_state,cambiarSeccion}) => {

    const { limpiarData, contacto } = useContext(ContactoContext)

    const style_w_tb = {
                        borderStyle:'solid',
                        borderColor:'white',
                        backgroundColor:'transparent',
                        color:'white'
                    }
    const style_h4 ={
                        width:'100%',
                        borderStyle:'solid',
                        borderColor:'white',
                        borderWidth:'1px',
                        paddingTop:'10px',
                        paddingBottom:'10px',
                        textAlign:'center',
                        borderRadius:'10px',
                        fontSize:'15px'
                    }

    const meses = new Array ("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre")
    const f=new Date();
    const fecha_actual = f.getDate() + " de " + meses[f.getMonth()] + " de " + f.getFullYear()

    // Validaciones

    // Tipo de contacto
    const [tipo_de_contacto, CambiarTipoContacto] = useState(contacto.tipo_de_contacto)
    const [sexo, cambiarSexo] = useState(contacto.sexo)

    // Nombre
    const [nombre, cambiarNombre] = useState(contacto.nombre)
    const [nombre_status, cambiarNombreStatus] = useState('')

    // Conjunto de celulares
    const [celular_actual, ajustarCelularActual] = useState('')
    const [tipo_celular_actual, ajustarTipoCelularActual] = useState('1')
    const [celulares, ajustarCelulares] = useState(contacto.celulares)

    // Empresa
    const [empresa, cambiarEmpresa] = useState(contacto.empresa)
    const [empresa_status, cambiarEmpresaStatus] = useState('')
    
    // Cargo
    const [cargo, cambiarCargo] = useState(contacto.cargo)
    const [cargo_status, cambiarCargoStatus] = useState('')

    // Conjunto Telefonos
    const [telefono_actual, ajustarTelefonoActual] = useState('')
    const [tipo_telefono_actual, ajustarTipoTelefonoActual] = useState('1')
    const [telefonos, ajustarTelefonos] = useState(contacto.telefonos)

    // Conjunto email
    const [email_actual, ajustarEmailActual] = useState('')
    const [tipo_email_actual, ajustarTipoEmailActual] = useState('1')
    const [emails, ajustarEmails] = useState(contacto.emails)

    // Conjunto direccion
    const [direccion_actual, ajustarDireccionActual] = useState('')
    const [direcciones, ajustarDirecciones] = useState(contacto.direcciones)

    // Redes Sociales
    const [red_seleccionada, ajustarRedSeleccionada] = useState('Facebook')
    const [facebook, actualizarFacebook] = useState(contacto.facebook)
    const [instagram, actualizarInstagram] = useState(contacto.instagram)
    const [linkedin, actualizarLinkedin] = useState(contacto.linkedin)

    // Medio de contacto
    const [medio_contacto, actualizarMedio] = useState(contacto.medio_contacto)

    // Completar perfile
    const [perfil_pro, cambiarPPro] = useState(contacto.perfil_pro)
    const [perfil_int_r, cambiarPIntR] = useState(contacto.perfil_int_r)
    const [perfil_int_c, cambiarPIntC] = useState(contacto.perfil_int_c)
    const [perfil_inq, cambiarPInq] = useState(contacto.perfil_inq)

    // Describir Requerimiento
    const [status_describir, cambiarStatusDescribir] = useState(false)
    const [requerimiento, ajustarRequerimiento] = useState(contacto.requerimiento)

    const [status_map, toggle_map] = useState(true)



    const icono_tipo_contacto_sexo = (sexo, tipo_contacto) => {
        let icono = ''
        switch (tipo_contacto) {
            case 'Propietario':
                icono = sexo === 'H' ? propietario_h : propietario_m
                break;
            case 'Renta':
                icono = sexo === 'H' ? intRenta_h : intRenta_m
                break;
            case 'Compra':
                icono = sexo === 'H' ? intCompra_h : intCompra_m
                break;
            case 'Inquilino':
                icono = sexo === 'H' ? inq_h : inq_m
                break;
        
            default:
                break;
        }

        return icono
    }
    
    const agregarCelularNuevo = (e, celular, tipo) => {
        e.preventDefault()
        ajustarCelulares(
            [
                ...celulares ,
                {
                    'id': uuidv4(),
                    'celular':celular,
                    'tipo':tipo
                }
            ]
        )
    }
    const agregarTelefonoNuevo = (e, telefono, tipo) => {
        e.preventDefault()
        ajustarTelefonos(
            [
                ...telefonos ,
                {
                    'id': uuidv4(),
                    'telefono':telefono,
                    'tipo':tipo
                }
            ]
        )
    }
    const agregarEmailNuevo = (e, email, tipo) => {
        e.preventDefault()
        ajustarEmails(
            [
                ...emails ,
                {
                    'id': uuidv4(),
                    'email':email,
                    'tipo':tipo
                }
            ]
        )
    }
    const agregarDireccionNueva = (e, direccion) => {
        e.preventDefault()
        ajustarDirecciones(
            [
                ...direcciones ,
                {
                    'id': uuidv4(),
                    'direccion':direccion
                }
            ]
        )
    }

    const ReiniciarCompletarPerfil = (tipo) => {
        cambiarPPro(tipo === 'Propietario' ? true:false)
        cambiarPIntR(tipo === 'Renta' ? true:false)
        cambiarPIntC(tipo === 'Compra' ? true:false)
        cambiarPInq(tipo === 'Inquilino' ? true:false)
    }

    async function enviarFormulario(method) {

        // console.log(tipo_de_contacto)
        // console.log(sexo)
        
        let error = false
        let error_text = ''
        

        if(nombre.trim() !== ''){
            if(celulares.length !== 0 || telefonos.length !== 0){

                error = false

            }else{
                error = true
                error_text += 'debes ingresar minimo un celular o un telefono.'
            }
        }else{
            error = true
            error_text += 'debes ingresar un nombre.'
        }

        if (error) {
            swal({
                title: "Error!",
                text: error_text,
                icon: "error",
            })
        }else{
            // Enviar el JSON
            let nuevo_contacto = {
                tipo_de_contacto,
                sexo,
                nombre,
                celulares,
                empresa,
                cargo,
                telefonos,
                emails,
                direcciones,
                facebook,
                linkedin,
                instagram,
                medio_contacto,
                perfil_pro,
                perfil_int_r,
                perfil_int_c,
                perfil_inq,
                requerimiento
            }

            // console.log(JSON.stringify(nuevo_contacto))
            if (method === 'post'){
                let res = await axios.post('/laravel/api/contactos', nuevo_contacto);

                console.log(res)
    
                swal({
                    title: "Contacto nuevo!",
                    text: "Contacto agregado correctamente!",
                    icon: "success",
                })
                cambiarSeccion('CONTACTOS')
                
            }else{
                
                let res = await axios.put(`/laravel/api/contactos/${contacto.id}`, nuevo_contacto);

                console.log(res)

                swal({
                    title: "Contacto nuevo!",
                    text: "Contacto agregado correctamente!",
                    icon: "success",
                })
                cambiarSeccion('CONTACTOS')
            }
            

            limpiarData()
            

        }

    }

    function eliminarRegistro(tabla, id){
        swal({
            title: 'Estas seguro?',
            text: "Esta acción no es reversible!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, eliminalo!'
        }).then((result) => {
            if (result) {

              // Eliminar elemento de state

              let nuevoRegistro = ''
              let url = ''

              switch (tabla) {
                  case 'celulares':
                      nuevoRegistro = celulares.filter( celular => celular.id !== id ); 
                      ajustarCelulares(nuevoRegistro)
                      url = 'celulares'
                      break;
                  case 'telefonos':
                        nuevoRegistro = telefonos.filter( telefono => telefono.id !== id ); 
                        ajustarTelefonos(nuevoRegistro)
                        url = 'telefonos'
                      break;
                  case 'emails':
                        nuevoRegistro = emails.filter( email => email.id !== id ); 
                        ajustarEmails(nuevoRegistro)
                        url = 'emails'
                      break;
                  case 'direcciones':
                        nuevoRegistro = direcciones.filter( direccion => direccion.id !== id ); 
                        ajustarDirecciones(nuevoRegistro)
                        url = 'direcciones'
                      break;
              
                  default:
                      break;
              }

              EliminarRegistro(tabla,id)
                

                swal(
                    'Eliminado!',
                    'Tu registro ha sido eliminado.',
                    'success'
                )
            }
        })
    }
    async function EliminarRegistro(tabla, id){
        let res = await axios.delete(`/laravel/api/${tabla}/${id}`);
        console.log(res)
    }

    return (
        <div className="fondo-trabajo text-white">
            <div className={`container-fluid container_principal ${toggle_state}`}>

                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-12 col-md-2 my-4">
                        {/* <h6 className="text-center">Elige un tipo de usuario</h6> */}
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-12 col-md-2 my-4 d-flex flex-column align-items-center justify-content-around">
                        {/* Tipo de usuario (cajas rojas) INICIO*/}
                        
                        <div className={`row py-4`}>
                            <div className="col-12">
                                <div 
                                    className="caja-roja d-flex justify-content-center flex-column align-items-center"
                                    onClick={(e)=> {
                                        e.preventDefault()
                                        CambiarTipoContacto('Propietario')
                                        ReiniciarCompletarPerfil('Propietario')
                                    }}
                                >
                                    <div className="caja-texto">
                                        <p>
                                            DATOS GENERALES
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`row py-4`}>
                            <div className="col-12">
                                <div 
                                    onClick={(e)=> { 
                                        e.preventDefault() 
                                        CambiarTipoContacto('Renta')
                                        ReiniciarCompletarPerfil('Renta')
                                    }}
                                    className="caja-roja d-flex justify-content-center flex-column align-items-center"
                                >
                                    <div className="caja-texto text-center">
                                        <p>
                                            ASPECTOS DEL INMUEBLE
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>                        
                        <div className={`row py-4`}>
                            <div className="col-12">
                                <div 
                                    className="caja-roja d-flex justify-content-center flex-column align-items-center"
                                    onClick={(e)=> {
                                        e.preventDefault()
                                        CambiarTipoContacto('Compra')
                                        ReiniciarCompletarPerfil('Compra')
                                    }}
                                >
                                    <div className="caja-texto">
                                        <p>
                                            FOTOS DEL INMUEBLE
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>                      
                        <div className={`row py-4`}>
                            <div className="col-12">
                                <div 
                                    className="caja-roja d-flex justify-content-center flex-column align-items-center"
                                    onClick={(e)=> {
                                        e.preventDefault()
                                        CambiarTipoContacto('Inquilino')
                                        ReiniciarCompletarPerfil('Inquilino')
                                    }}
                                >
                                    <div className="caja-texto">
                                        <p>
                                            ESTATUS
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                                    
                        {/* Tipo de usuario (Cajas rojas) FIN */}
                    </div>
                    
                    <div className="col-md-1"></div>

                    <div className="col-12 col-md-4">
                        {/* Datos de usuario */}
                        
                        <div className="row my-4 d-flex justify-content-center align-items-center">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="col-12">
                                            <span>Propiedad:</span>
                                        </div>
                                        <div className="col-12 col-md-11">
                                            <select name="" id="" className="form-control">
                                                <option value="0">Casa</option>
                                                <option value="1">Terreno</option>
                                                <option value="2">Edificio</option>
                                                <option value="3">Local Comercial</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row my-4 d-flex justify-content-center align-items-center">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="col-12">
                                            <span>Titulo:</span>
                                        </div>
                                        <div className="col-12 col-md-11">
                                            <input type="text" 
                                                placeholder="Para el anuncio de la página"
                                                className="form-control"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row my-4 d-flex justify-content-center align-items-center">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="col-12">
                                            <span>Descripción:</span>
                                        </div>
                                        <div className="col-12 col-md-11">
                                            <textarea 
                                                className="form-control" 
                                                id="" 
                                                cols="30" 
                                                rows="10"
                                                placeholder="¿Como te gustaría describir tu inmueble?"
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row my-4 d-flex justify-content-center align-items-center">
                            <div className="col-12">
                                <h4 style={style_h4}>
                                    ¿Elige el tipo de operación?
                                </h4>
                            </div>
                            <div className="col-12">
                                <small>NOTA: Posteriormente ingrese el importe y al seleccionar el tipo de moneda éste se reflejara y guardará en su casilla para que puedas verificarlo.</small>
                            </div>
                        </div>
                        <div className="row my-4 d-flex justify-content-center align-items-center seleccionar-custom-1" style={{cursor:'pointer'}}>
                            <div className="col-4 col-md-3">
                                <img src={icon_check} alt="icon_check" style={{width:'40px'}}/>
                            </div>
                            <div className="col-8 col-md-9 d-flex align-items-center text-left">
                                Venta
                            </div>
                        </div>
                        <div className="row my-4 d-flex justify-content-center align-items-center">
                            <div className="col-4 col-md-3">
                                <img src={icon_money_green} alt="icon_money_green" style={{width:'25px'}}/>
                            </div>
                            <div className="col-8 col-md-9 d-flex align-items-center text-left">
                                <div className="input-group">
                                    <input type="text" className="form-control" aria-label="Precio" style={style_w_tb}/>
                                    <div className="input-group-append">
                                        <button 
                                            className="btn btn-outline-light dropdown-toggle" 
                                            type="button" 
                                            data-toggle="dropdown" 
                                            aria-haspopup="true" 
                                            aria-expanded="false"
                                        >MXN</button>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" href="#">MXN</a>
                                            <a className="dropdown-item" href="#">USD</a>
                                            <a className="dropdown-item" href="#">EUR</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row my-4 d-flex justify-content-center align-items-center seleccionar-custom-1" style={{cursor:'pointer'}}>
                            <div className="col-4 col-md-3">
                                <img src={icon_check} alt="icon_check" style={{width:'40px'}}/>
                            </div>
                            <div className="col-8 col-md-9 d-flex align-items-center text-left">
                                Renta
                            </div>
                        </div>
                        <div className="row my-4 d-flex justify-content-center align-items-center">
                            <div className="col-4 col-md-3">
                                <img src={icon_money_yell} alt="icon_money_yell" style={{width:'25px'}}/>
                            </div>
                            <div className="col-8 col-md-9 d-flex align-items-center text-left">
                                <div className="input-group">
                                    <input type="number" className="form-control" aria-label="Precio" style={style_w_tb}/>
                                    <div className="input-group-append">
                                        <button 
                                            className="btn btn-outline-light dropdown-toggle" 
                                            type="button" 
                                            data-toggle="dropdown" 
                                            aria-haspopup="true" 
                                            aria-expanded="false"
                                        >MXN</button>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" href="#">MXN</a>
                                            <a className="dropdown-item" href="#">USD</a>
                                            <a className="dropdown-item" href="#">EUR</a>
                                        </div>
                                    </div>
                                </div>
                            </div> 
                        </div>


                        <div className="row my-4 d-flex justify-content-center align-items-center seleccionar-custom-1" style={{cursor:'pointer'}}>
                            <div className="col-4 col-md-3">
                                <img src={icon_check} alt="icon_check" style={{width:'40px'}}/>
                            </div>
                            <div className="col-8 col-md-9 d-flex align-items-center text-left">
                                Renta Esp.
                            </div>
                        </div>
                        <div className="row my-4 d-flex justify-content-center align-items-center">
                            <div className="col-4 col-md-3">
                                <img src={icon_money_red} alt="icon_money_red" style={{width:'25px'}}/>
                            </div>
                            <div className="col-8 col-md-9 d-flex align-items-center text-left">
                                <div className="input-group">
                                    <input type="text" className="form-control" aria-label="Precio" style={style_w_tb}/>
                                    <div className="input-group-append">
                                        <button 
                                            className="btn btn-outline-light dropdown-toggle" 
                                            type="button" 
                                            data-toggle="dropdown" 
                                            aria-haspopup="true" 
                                            aria-expanded="false"
                                        >MXN</button>
                                        <div className="dropdown-menu">
                                            <a className="dropdown-item" href="#">MXN</a>
                                            <a className="dropdown-item" href="#">USD</a>
                                            <a className="dropdown-item" href="#">EUR</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="col-md-1"></div>

                    <div className="col-12 col-md-3 text-left">
                        <div className="row">
                            <div className="col-12">
                                <h4 style={style_h4}>
                                    Ubicación del inmueble
                                </h4>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12 col-md-4">
                                <span>País:</span>
                            </div>
                            <div className="col-12 col-md-8">
                                <select name="" id="" className="form-control">
                                    <option value="0">España</option>
                                    <option value="1">México</option>
                                </select>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12 col-md-4">
                                <span>Estado:</span>
                            </div>
                            <div className="col-12 col-md-8">
                                <select name="" id="" className="form-control">
                                </select>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12 col-md-4">
                                <span>Código Postal:</span>
                            </div>
                            <div className="col-12 col-md-8">
                                <input type="number" className="form-control"/>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12 col-md-4">
                                <span>Delegación y/o municipio:</span>
                            </div>
                            <div className="col-12 col-md-8">
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12 col-md-4">
                                <span>Colonia:</span>
                            </div>
                            <div className="col-12 col-md-8">
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12 col-md-4">
                                <span>Especificar:</span>
                            </div>
                            <div className="col-12 col-md-8">
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12 col-md-4">
                                <span>Calle:</span>
                            </div>
                            <div className="col-12 col-md-8">
                                <input type="text" className="form-control"/>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12 col-md-3">
                                <input type="text" placeholder="N° Ext" className="form-control"/>
                            </div>
                            <div className="col-12 col-md-3">
                                <input type="text" placeholder="N° Int" className="form-control"/>
                            </div>
                            <div className="col-12 col-md-3">
                                <input type="text" placeholder="Manzana" className="form-control"/>
                            </div>
                            <div className="col-12 col-md-3">
                                <input type="text" placeholder="Lote" className="form-control"/>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12">
                                <input type="text" className="form-control" placeholder="¿Entre que calles se encuentra?"/>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12 d-flex justify-content-center">
                                <div className="opcion-f-s" onClick={()=> {toggle_map(!status_map)}}>
                                    Mostrar mapa
                                </div>
                            </div>
                        </div>

                        <div className={`row my-4 ${status_map ? '' : 'd-none'}`}>
                            <div className="col-12">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6328.53464992676!2d-99.17074555221168!3d19.41373598786167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1ses!2smx!4v1610457355073!5m2!1ses!2smx" 
                                    style={{width:"100%", height:"450", border:"0" }}
                                    frameBorder="0"                                     
                                    allowFullScreen="" 
                                    aria-hidden="false" 
                                    tabIndex="0">
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
                
                
                
                
                
                {/* Una vez lleno el formulario, verificar */}

                <div className="row text-center">
                    <div className="col-12 my-5">
                        <button 
                            className="btn btn-custom-1 mr-4"
                            onClick={
                                (e)=> {
                                    e.preventDefault()
                                    limpiarData()
                                    cambiarSeccion('CONTACTOS')
                                }
                            }
                        >
                            CANCELAR
                        </button>
                        {contacto.id ? 
                            ( 
                                <button 
                                    className="btn btn-custom-1" 
                                    onClick={(e) => {
                                        e.preventDefault()
                                        enviarFormulario('put')
                                    }}
                                >
                                    MODIFICAR
                                </button>
                            ):
                            ( 
                                <button 
                                    className="btn btn-custom-1" 
                                    onClick={(e) => {
                                        e.preventDefault()
                                        enviarFormulario('post')
                                    }}
                                >
                                    CREAR
                                </button>
                            )
                        }
                       
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DatosEmpresa
