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
                        <h6 className="text-center">Elige un tipo de usuario</h6>
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
                                            Propietario
                                        </p>
                                    </div>
                                    <div className="caja-icono">
                                        <img src={ tipo_de_contacto === 'Propietario' ? contacto_propietario : contacto_gral } alt="contacto_gral"/>
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
                                            Interesado en Renta
                                        </p>
                                    </div>
                                    <div className="caja-icono">
                                        <img src={ tipo_de_contacto === 'Renta' ? contacto_int_renta : contacto_gral } alt="contacto_gral"/>
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
                                            Interesado en Compra
                                        </p>
                                    </div>
                                    <div className="caja-icono">
                                        <img src={ tipo_de_contacto === 'Compra' ? contacto_int_compra : contacto_gral } alt="contacto_gral"/>
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
                                            Inquilino
                                        </p>
                                    </div>
                                    <div className="caja-icono">
                                        <img src={ tipo_de_contacto === 'Inquilino' ? contacto_inquilino : contacto_gral } alt="contacto_gral"/>
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
                            <div className="col-12-text-center col-md-4">
                                Elegir Sexo
                            </div>
                            <div className="col-8">
                                <div className="row">
                                    <div className="col-5 text-center">
                                        <p style={{marginBottom:'1px'}}>Hombre</p>
                                        <button 
                                            className="btn btn-custom-3" 
                                            style={{width:'90px', backgroundColor:sexo === 'H' ? 'gray' : '', borderColor:sexo === 'H' ? 'gray' : ''}}
                                            onClick={(e) => {cambiarSexo('H')}}
                                        >
                                            <img src={sexo === 'H' ? icon_sex_h_select : icon_sex_h} alt="icon_sex_h" style={{width:'30px', height:'30px'}}/>
                                        </button>
                                    </div>
                                    <div className="col-5 text-center">
                                        <p style={{marginBottom:'1px'}}>Mujer</p>
                                        <button 
                                            className="btn btn-custom-3" 
                                            style={{width:'90px', backgroundColor:sexo === 'M' ? 'gray' : '', borderColor:sexo === 'M' ? 'gray' : ''}}
                                            onClick={(e) => {cambiarSexo('M')}}
                                        >
                                            <img src={sexo === 'M' ? icon_sex_m_select : icon_sex_m} alt="icon_sex_m" style={{width:'30px', height:'30px'}}/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row my-4 d-flex justify-content-center align-items-center">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-2 d-flex align-items-center justify-content-center">
                                        <img src={icono_tipo_contacto_sexo(sexo, tipo_de_contacto)} alt="icono_contacto" style={{width:'30px'}}/>
                                    </div>
                                    <div className="col-10">
                                        <div className="col-12">
                                            <span>*Nombre:</span>
                                        </div>
                                        <div className="col-12 col-md-11">
                                            <input 
                                                type="text" 
                                                name="nombre" 
                                                value={nombre}
                                                className={`form-control ${nombre_status}`}
                                                onChange={(e)=> {
                                                    cambiarNombre(e.target.value)
                                                }}
                                                onBlur={()=> {
                                                    if(nombre.trim() === ""){
                                                        cambiarNombreStatus('is-invalid')
                                                    }else{
                                                        cambiarNombreStatus('is-valid')
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            
                        </div>
                        <div className="row my-4 d-flex justify-content-center align-items-center">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-2 d-flex align-items-center justify-content-center">
                                        <img src={icon_celular} alt="img celular" style={{width:'30px'}}/>
                                    </div>
                                    <div className="col-10">
                                        <div className="col-12">
                                            <span>*Celular:</span>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="input-group mb-3">
                                                        <input 
                                                            type="tel" 
                                                            pattern="[0-9]{10}"
                                                            className="form-control" 
                                                            value={celular_actual}
                                                            onChange={(e)=> {
                                                                ajustarCelularActual(e.target.value)
                                                            }}
                                                        />
                                                        <div className="input-group-append">
                                                            <button 
                                                                className="btn btn-outline-secondary" 
                                                                type="button"
                                                                onClick={(e)=> {
                                                                    e.preventDefault()
                                                                    if(celular_actual.trim() !== ''){
                                                                        agregarCelularNuevo(e, celular_actual, tipo_celular_actual)
                                                                        ajustarCelularActual('')
                                                                        ajustarTipoCelularActual('1')

                                                                        swal({
                                                                            title: "Celular nuevo!",
                                                                            text: "Celular agregado correctamete!",
                                                                            icon: "success",
                                                                        })
                                                                    }else{
                                                                        swal({
                                                                            title: "Error!",
                                                                            text: "No has proporcionado ningun celular!",
                                                                            icon: "error",
                                                                        });
                                                                    }                                                                    
                                                                }}
                                                            >+</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-5">
                                                    <select 
                                                        className="form-control" 
                                                        onChange={(e) => { ajustarTipoCelularActual(e.target.value)}}
                                                        value={tipo_celular_actual}
                                                    >
                                                        <option value="1">Empresarial</option>
                                                        <option value="2">Personal</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>      
                                </div>
                                {contacto.id ? 
                                    (
                                        <div class="row">
                                            <div className="col-2"></div>
                                            <div class="col-9">
                                                <table class="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Celular</th>
                                                            <th scope="col">Tipo</th>
                                                            <th scope="col"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
        
                                                        {
                                                            contacto.id ?
                                                            (
                                                                celulares.map((celular, index)=>
                                                                <tr>
                                                                    <th scope="row">{index}</th>
                                                                    <td>{celular.numero ? celular.numero : celular.celular}</td>
                                                                    <td>{celular.descripcion ?  celular.descripcion : celular.tipo === '1' ? 'Empresarial' : 'Personal'}</td>
                                                                    <td className="text-center">
                                                                        <button 
                                                                            class="btn" 
                                                                            style={{color:'white',borderColor:'white',backgroundColor:'transparent'}}
                                                                            onClick={(e)=> {
                                                                                e.preventDefault()
                                                                                eliminarRegistro('celulares', celular.id)
                                                                            }}
                                                                        >
                                                                            <i class="fa fa-trash" aria-hidden="true"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                                )
                                                            )
                                                            :
                                                            null
                                                        }
                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )
                                    :
                                    null
                                }
                            </div>                            
                        </div>
                        <div className="row my-4 d-flex justify-content-center align-items-center">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-2 d-flex align-items-center justify-content-center">
                                        <img src={icon_job} alt="img celular" style={{width:'30px'}}/>
                                    </div>
                                    <div className="col-10">
                                        <div className="col-12">
                                            <span>Empresa donde trabaja:</span>
                                        </div>
                                        <div className="col-12 col-md-11">
                                                <input 
                                                    type="text" 
                                                    name="empresa" 
                                                    value={empresa}
                                                    className={`form-control ${empresa_status}`}
                                                    onChange={(e)=> {
                                                        cambiarEmpresa(e.target.value)
                                                    }}
                                                    onBlur={()=> {
                                                        if(empresa.trim() === ""){
                                                            cambiarEmpresaStatus('is-invalid')
                                                        }else{
                                                            cambiarEmpresaStatus('is-valid')
                                                        }
                                                    }}
                                                />
                                        </div>
                                    </div>      
                                </div>
                            </div>                            
                        </div>
                        <div className="row my-4 d-flex justify-content-center align-items-center">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-2 d-flex align-items-center justify-content-center">
                                        <img src={icon_cargo} alt="img celular" style={{width:'30px'}}/>
                                    </div>
                                    <div className="col-10">
                                        <div className="col-12">
                                            <span>Cargo:</span>
                                        </div>
                                        <div className="col-12 col-md-11">
                                                <input 
                                                    type="text" 
                                                    name="cargo" 
                                                    value={cargo}
                                                    className={`form-control ${cargo_status}`}
                                                    onChange={(e)=> {
                                                        cambiarCargo(e.target.value)
                                                    }}
                                                    onBlur={()=> {
                                                        if(cargo.trim() === ""){
                                                            cambiarCargoStatus('is-invalid')
                                                        }else{
                                                            cambiarCargoStatus('is-valid')
                                                        }
                                                    }}
                                                />
                                        </div>
                                    </div>      
                                </div>
                            </div>                            
                        </div>
                        <div className="row my-4 d-flex justify-content-center align-items-center">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-2 d-flex align-items-center justify-content-center">
                                        <img src={icon_tel} alt="img celular" style={{width:'30px'}}/>
                                    </div>
                                    <div className="col-10">
                                        <div className="col-12">
                                            <span>*Telefono Fijo:</span>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="input-group mb-3">
                                                        <input 
                                                            type="tel" 
                                                            pattern="[0-9]{10}"
                                                            className="form-control" 
                                                            value={telefono_actual}
                                                            onChange={(e)=> {
                                                                ajustarTelefonoActual(e.target.value)
                                                            }}
                                                        />
                                                        <div className="input-group-append">
                                                            <button 
                                                                className="btn btn-outline-secondary" 
                                                                type="button"
                                                                onClick={(e)=> {
                                                                    e.preventDefault()
                                                                    if(telefono_actual.trim() !== ''){
                                                                        agregarTelefonoNuevo(e, telefono_actual, tipo_telefono_actual)
                                                                        ajustarTelefonoActual('')
                                                                        ajustarTipoTelefonoActual('1')

                                                                        swal({
                                                                            title: "Telefono nuevo!",
                                                                            text: "Telefono agregado correctamete!",
                                                                            icon: "success",
                                                                        })
                                                                    }else{
                                                                        swal({
                                                                            title: "Error!",
                                                                            text: "No has proporcionado ningun telefono!",
                                                                            icon: "error",
                                                                        });
                                                                    }                                                                    
                                                                }}
                                                            >+</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-5">
                                                    <select 
                                                        className="form-control" 
                                                        onChange={(e) => { ajustarTipoTelefonoActual(e.target.value)}}
                                                        value={tipo_telefono_actual}
                                                    >
                                                        <option value="1">Casa</option>
                                                        <option value="2">Fax de casa</option>
                                                        <option value="3">Fax de trabajo</option>
                                                        <option value="4">Nextel</option>
                                                        <option value="5">Trabajo</option>
                                                    </select>
                                                </div>
                                            </div>                                            
                                        </div>
                                    </div>      
                                </div>
                                {
                                    contacto.id ?
                                    (
                                        <div class="row">
                                        <div className="col-2"></div>
                                        <div class="col-9">
                                            <table class="table table-hover">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">#</th>
                                                        <th scope="col">Telefono</th>
                                                        <th scope="col">Tipo</th>
                                                        <th scope="col"></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        telefonos.map((telefono, index) => (
                                                            <tr>
                                                                <th scope="row">{index}</th>
                                                                <td>{telefono.numero ? telefono.numero : telefono.telefono}</td>
                                                                <td>{telefono.descripcion ? telefono.descripcion : telefono.tipo === '1' ? 'Casa' : telefono.tipo === '2' ? 'Fax de Casa' : telefono.tipo === '3' ? 'Fax de Trabajo' : telefono.tipo === '4' ? 'Nextel' : 'Trabajo'}</td>
                                                                <td className="text-center">
                                                                    <button 
                                                                        class="btn" 
                                                                        style={{color:'white',borderColor:'white',backgroundColor:'transparent'}}
                                                                        onClick={(e)=> {
                                                                            e.preventDefault()
                                                                            eliminarRegistro('telefonos', telefono.id)
                                                                        }}
                                                                    >
                                                                        <i class="fa fa-trash" aria-hidden="true"></i>
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                    
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    )
                                    :
                                    null
                                }
                                
                            </div>                            
                        </div>
                        <div className="row my-4 d-flex justify-content-center align-items-center">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-2 d-flex align-items-center justify-content-center">
                                        <img src={icon_email} alt="img celular" style={{width:'30px'}}/>
                                    </div>
                                    <div className="col-10">
                                        <div className="col-12">
                                            <span>*Correo Electrónico:</span>
                                        </div>
                                        <div className="col-12">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="input-group mb-3">
                                                        <input 
                                                            type="text" 
                                                            className="form-control" 
                                                            value={email_actual}
                                                            onChange={(e)=> {
                                                                ajustarEmailActual(e.target.value)
                                                            }}
                                                        />
                                                        <div className="input-group-append">
                                                            <button 
                                                                className="btn btn-outline-secondary" 
                                                                type="button"
                                                                onClick={(e)=> {
                                                                    e.preventDefault()
                                                                    if(email_actual.trim() !== ''){
                                                                        agregarEmailNuevo(e, email_actual, tipo_email_actual)
                                                                        ajustarEmailActual('')
                                                                        ajustarTipoEmailActual('1')

                                                                        swal({
                                                                            title: "Email nuevo!",
                                                                            text: "Email agregado correctamete!",
                                                                            icon: "success",
                                                                        })
                                                                    }else{
                                                                        swal({
                                                                            title: "Error!",
                                                                            text: "No has proporcionado ningun email!",
                                                                            icon: "error",
                                                                        });
                                                                    }                                                                    
                                                                }}
                                                            >+</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-5">
                                                    <select 
                                                        className="form-control" 
                                                        onChange={(e) => { ajustarTipoEmailActual(e.target.value)}}
                                                        value={tipo_email_actual}
                                                    >
                                                        <option value="1">Empresarial</option>
                                                        <option value="2">Personal</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>      
                                </div>
                                {
                                    contacto.id ?
                                    (
                                        <div class="row">
                                            <div class="col-11">
                                                <table class="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col">Correo</th>
                                                            <th scope="col">Tipo</th>
                                                            <th scope="col"></th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>

                                                        {
                                                            emails.map((email,index) => (
                                                                <tr>
                                                                    <th scope="row">{index}</th>
                                                                    <td>{email.email}</td>
                                                                    <td>{email.descripcion ? email.descripcion : email.tipo === '1' ? 'Empresarial':'Personal'}</td>
                                                                    <td className="text-center">
                                                                        <button 
                                                                            class="btn" 
                                                                            style={{color:'white',borderColor:'white',backgroundColor:'transparent'}}
                                                                            onClick={(e)=> {
                                                                                e.preventDefault()
                                                                                eliminarRegistro('emails', email.id)
                                                                            }}
                                                                        >
                                                                            <i class="fa fa-trash" aria-hidden="true"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )
                                    :
                                    null
                                }
                            </div>                            
                        </div>
                        <div className="row my-4 d-flex justify-content-center align-items-center">
                            <div className="col-12">
                                <div className="row">
                                    <div className="col-2 d-flex align-items-center justify-content-center">
                                        <img src={icon_dire} alt="img celular" style={{width:'30px'}}/>
                                    </div>
                                    <div className="col-10">
                                        <div className="col-12">
                                            <span>Dirección:</span>
                                        </div>
                                        <div className="col-12">
                                            <div className="input-group mb-3">
                                                <input 
                                                    type="text" 
                                                    className="form-control" 
                                                    value={direccion_actual}
                                                        onChange={(e)=> {
                                                        ajustarDireccionActual(e.target.value)
                                                    }}
                                                />
                                                <div className="input-group-append">
                                                    <button 
                                                        className="btn btn-outline-secondary" 
                                                        type="button"
                                                        onClick={(e)=> {
                                                            e.preventDefault()
                                                            if(direccion_actual.trim() !== ''){
                                                                agregarDireccionNueva(e, direccion_actual)
                                                                ajustarDireccionActual('')

                                                                swal({
                                                                    title: "Dirección nueva!",
                                                                    text: "Dirección agregada correctamete!",
                                                                    icon: "success",
                                                                })
                                                            }else{
                                                                swal({
                                                                    title: "Error!",
                                                                    text: "No has proporcionado ningun email!",
                                                                    icon: "error",
                                                                });
                                                            }                                                                    
                                                        }}
                                                    >+</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>      
                                </div>
                                {
                                    contacto.id ?
                                    (
                                        <div class="row">
                                            <div class="col-11">
                                                <table class="table table-hover">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">#</th>
                                                            <th scope="col" colspan="2">Dirección</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            direcciones.map((direccion, index) => (
                                                                <tr>
                                                                    <th scope="row">{index}</th>
                                                                    <td>{direccion.direccion}</td>
                                                                    <td className="text-center">
                                                                        <button 
                                                                            class="btn" 
                                                                            style={{color:'white',borderColor:'white',backgroundColor:'transparent'}}
                                                                            onClick={(e)=> {
                                                                                e.preventDefault()
                                                                                eliminarRegistro('direcciones', direccion.id)
                                                                            }}
                                                                        >
                                                                            <i class="fa fa-trash" aria-hidden="true"></i>
                                                                        </button>
                                                                    </td>
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    )
                                    :
                                    null
                                }
                            </div>                            
                        </div>
                    </div>

                    <div className="col-md-1"></div>

                    <div className="col-12 col-md-3 text-center">
                        {/* Redes sociales */}
                        <div className="container">
                            
                            <div className="row my-4">
                                <div className="col-12">
                                    <span>Redes sociales:</span>
                                </div>
                                <div className="col-12 formulario_iconos_sociales d-flex justify-content-center py-3">
                                    {/* <div className="row my-4 text-center"> */}
                                        <div className="col-4 d-flex justify-content-center" onClick={(e) => {ajustarRedSeleccionada('Facebook')}}>
                                            <div className={`sombra ${red_seleccionada === 'Facebook' ? 'selected' : ''}`}></div>
                                            <img src={facebook_img} alt="facebook"/>
                                        </div>
                                        <div className="col-4 d-flex justify-content-center" onClick={(e) => {ajustarRedSeleccionada('Instagram')}}>
                                            <div className={`sombra ${red_seleccionada === 'Instagram' ? 'selected' : ''}`}></div>
                                            <img src={instagram_img} alt="instagram"/>
                                        </div>
                                        <div className="col-4 d-flex justify-content-center" onClick={(e) => {ajustarRedSeleccionada('Linkedin')}}>
                                            <div className={`sombra ${red_seleccionada === 'Linkedin' ? 'selected' : ''}`}></div>
                                            <img src={linkedin_img} alt="linkedin"/>
                                        </div>
                                    {/* </div> */}
                                </div>
                            </div>
                            <div className="row my-4">
                                <div className="social-media-inputs">
                                    <div className="row my-2">
                                        <div className="col-12">
                                            <input 
                                                type="text" 
                                                className="form-control" 
                                                value={red_seleccionada === 'Facebook' ? facebook : red_seleccionada === 'Instagram' ? instagram : linkedin}
                                                placeholder={red_seleccionada === 'Facebook' ? 'facebook.com/' : red_seleccionada === 'Instagram' ? 'instagram.com/' : 'linkedin.com/'}
                                                onChange={(e)=> {red_seleccionada === 'Facebook' ? actualizarFacebook(e.target.value) : red_seleccionada === 'Instagram' ? actualizarInstagram(e.target.value) : actualizarLinkedin(e.target.value)}}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                              
                            <div className="row my-4 d-flex justify-content-center align-items-center">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-2 d-flex align-items-center justify-content-center">
                                            <img src={icon_otro_tipo_contacto} alt="icon_otro_tipo_contacto" style={{width:'30px'}}/>
                                        </div>
                                        <div className="col-10">
                                            <div className="col-12">
                                                <span>Medio de contacto:</span>
                                            </div>
                                            <div className="col-12 col-md-11">
                                                <select className="form-control" value={medio_contacto} onChange={(e) => {actualizarMedio(e.target.value)}}>
                                                    <option value="1">Redes Sociales</option>
                                                    <option value="2">Publicidad</option>
                                                    <option value="3">Familiares</option>
                                                    <option value="4">Recomendación</option>
                                                    <option value="5">Página Web</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="row my-4">
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-2 d-flex align-items-center justify-content-center">
                                            <img src={icon_otro_tipo_contacto} alt="icon_otro_tipo_contacto" style={{width:'30px'}}/>
                                        </div>
                                        <div className="col-10">
                                            <div className="col-12">
                                                <small>¿Estás interesado en Rentar/Comprar un inmueble?</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                tipo_de_contacto !== 'Propietario' ? 
                                    <div className="row my-4 seleccionar-custom-1" style={{cursor:'pointer'}} onClick={(e)=> { cambiarPPro(!perfil_pro) }}>
                                        <div className="col-4 col-md-3">
                                            <img src={perfil_pro ? icon_checked : icon_check} alt="icon_check" style={{width:'40px'}}/>
                                        </div>
                                        <div className="col-8 col-md-9 d-flex align-items-center text-left">
                                            Propietario
                                        </div>
                                    </div>
                                :
                                    null
                            }
                            
                            {
                                tipo_de_contacto !== 'Renta' ? 
                                    <div className="row my-4 seleccionar-custom-1" style={{cursor:'pointer'}} onClick={(e)=> { cambiarPIntR(!perfil_int_r) }}>
                                        <div className="col-4 col-md-3">
                                            <img src={perfil_int_r ? icon_checked : icon_check} alt="icon_check" style={{width:'40px'}}/>
                                        </div>
                                        <div className="col-8 col-md-9 d-flex align-items-center text-left">
                                            Interesado en Renta
                                        </div>
                                    </div>
                                :
                                    null
                            }

                            {
                                tipo_de_contacto !== 'Compra' ? 
                                    <div className="row my-4 seleccionar-custom-1" style={{cursor:'pointer'}} onClick={(e)=> { cambiarPIntC(!perfil_int_c) }}>
                                        <div className="col-4 col-md-3">
                                            <img src={perfil_int_c ? icon_checked : icon_check} alt="icon_check" style={{width:'40px'}}/>
                                        </div>
                                        <div className="col-8 col-md-9 d-flex align-items-center text-left">
                                            Interesado en Compra
                                        </div>
                                    </div>
                                :
                                    null
                            }

                            {
                                tipo_de_contacto !== 'Inquilino' ? 
                                    <div className="row my-4 seleccionar-custom-1" style={{cursor:'pointer'}} onClick={(e)=> { cambiarPInq(!perfil_inq) }}>
                                        <div className="col-4 col-md-3">
                                            <img src={perfil_inq ? icon_checked : icon_check} alt="icon_check" style={{width:'40px'}}/>
                                        </div>
                                        <div className="col-8 col-md-9 d-flex align-items-center text-left">
                                            Inquilino
                                        </div>
                                    </div>
                                :
                                    null
                            }

                            
                            
                            
                          
                            <div className="row my-4">
                                <div className="col-12 d-flex justify-content-center">
                                    <div className="opcion-f-s" onClick={(e) => {
                                        cambiarStatusDescribir(!status_describir)
                                    }}>
                                        Describir Requerimiento
                                    </div>
                                </div>
                                {
                                    status_describir ? 
                                        <div className="col-12">
                                            <textarea rows="10" className="form-control" value={requerimiento} onChange={(e) => {ajustarRequerimiento(e.target.value)}}></textarea>
                                        </div>
                                    :
                                        null
                                }
                                
                            </div>
                            <div className="row my-4">
                                <div className="col-12">
                                    <p className="text-center">Fecha de creación: {fecha_actual}</p>
                                </div>
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
