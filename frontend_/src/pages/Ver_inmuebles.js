import React, {useState, useEffect} from 'react'


import '../assets/css/datos_empresa.css'

import img_lupa_b from '../assets/img/Icon Lupa B.svg'
import img_contacto from '../assets/img/Icon contacto 3.svg'
import img_propietario from '../assets/img/Icon propietario.svg'
import img_renta from '../assets/img/Icon Int en renta.svg'
import img_compra from '../assets/img/Icon Int en compra.svg'
import img_inquilino from '../assets/img/Icon Inquilino.svg'

import icon_agregar_contacto from '../assets/img/Icon agregar contacto.svg'
import icon_eliminar_contacto from '../assets/img/Icon eliminar contacto.svg'
import icon_asignar_contacto from '../assets/img/Icon Asignacion.svg'

import img_propietarios from '../assets/img/Icon propietario.svg'
import img_int_r from '../assets/img/Icon Int en renta.svg'
import img_int_c from '../assets/img/Icon Int en compra.svg'
import img_inq from '../assets/img/Icon Inquilino.svg'
import img_gral from '../assets/img/Opcion Gral contacto.svg'
// import img_ver_todos from '../assets/img/Icon ver contacto.svg'

import AgregarInmueble from '../assets/img/Agregar Inmueble.svg'
import Asesorblanco from '../assets/img/Asesor blanco.svg'
import IcontipocontactoM from '../assets/img/Icon tipo contacto M.svg'

import CardInmueble from '../componentes/CardInmueble'

import axios from 'axios'

// Una vez creado el id, se habilitan todos los demas campos
const Ver_contactos = ({cambiarSeccion}) => {

    const [contactos, actualizarContactos] = useState([])
    const [tipo_de_contacto, cambiarTipoDeContacto] = useState(1)
    const [criterio_de_busqueda, CambiarCriterioDeBusqueda] = useState(1)
    const [placeholder_de_busqueda, CambiarPlaceholderDeBusqueda] = useState('Buscar por Nombre')
    const [input_buscar, actualizarInput] = useState('')

    let typingTimer;    //timer identifier 
    const doneTypingInterval = 3000; //time in ms, 5 second for example 

    async function consultarContactos() {
        let busqueda = {
            texto:input_buscar,
            tipo_de_contacto,
            criterio_de_busqueda
        }
        // let res = await axios.post('/laravel/api/contactos_especificos', busqueda)
        // actualizarContactos(res.data.contactos.data)
        actualizarContactos([
            {id:1,nombre:'Departamento amueblado en renta en Polanco'}
        ])
        // console.log(res)
    }

    async function buscarContactos(){
        let busqueda = ''
        if(input_buscar.trim() !== ''){
            busqueda = {
                texto:input_buscar,
                tipo_de_contacto,
                criterio_de_busqueda
            }

            let url = ''

            switch (criterio_de_busqueda) {
                case 1:
                    // Nombre
                    url = '/laravel/api/buscar_nombre'
                    break;
                case 2:
                    // Celular
                    url = '/laravel/api/buscar_celular'
                    break;
                case 3:
                    // Telefono
                    url = '/laravel/api/buscar_telefono'                    
                    break;
                case 4:
                    // Correo
                    url = '/laravel/api/buscar_email'
                    break;
            
                default:
                    break;
            }

            let res = await axios.post(url, busqueda)

            // console.log(res)
            if (res.data) {
                actualizarContactos(res.data.contactos.data)
            }else{
                actualizarContactos([])
            }
        }else{
            consultarContactos()
        }
    }
    useEffect(()=>{
        consultarContactos()
    },[tipo_de_contacto])
    return (
        <div className="fondo-trabajo text-white">
            <div className={`container-fluid container_principal`}>

                <div className="row">
                    <div className="col-sm-4 col-lg-2 offset-sm-1 d-flex justify-content-between my-2">
                        <button className="btn btn-custom-2 btn-lg" onClick={(e)=> e.preventDefault() & cambiarSeccion('INMUEBLE / AGREGAR')}>
                            <img src={AgregarInmueble} alt="AgregarInmueble" style={{width:'20px'}}/>
                        </button>
                        <button className="btn btn-custom-2 btn-lg">
                            <img src={Asesorblanco} alt="Asesorblanco" style={{width:'20px'}}/>
                        </button>
                        <button className="btn btn-custom-2 btn-lg">
                            <img src={IcontipocontactoM} alt="IcontipocontactoM" style={{width:'20px'}}/>
                        </button>
                    </div>
                    <div className="col-12 col-sm-6 offset-sm-1">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text" style={{backgroundColor: 'white', border:'none'}}>
                                    <img src={img_lupa_b} alt="img buscar" style={{width:'20px', height:'20px'}}/>
                                </span>
                            </div>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder={placeholder_de_busqueda} 
                                style={{border:'none'}}
                                // value={input_buscar}
                                onChange={(e)=> {actualizarInput(e.target.value)}}
                                onKeyUp={(e) => {
                                    clearTimeout(typingTimer); 
                                    typingTimer = setTimeout(buscarContactos, doneTypingInterval); 
                                }}
                                onKeyDown={()=> {
                                    clearTimeout(typingTimer)
                                }}
                            />
                            <div className="input-group-append">
                                <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" style={{backgroundColor: 'white', border:'none'}}></button>
                                <div className="dropdown-menu">
                                    <span 
                                        className="dropdown-item" 
                                        onClick={(e)=> {
                                            e.preventDefault() 
                                            CambiarCriterioDeBusqueda(1)
                                            CambiarPlaceholderDeBusqueda('Buscar Nombre')
                                            }
                                    }>Nombre</span>
                                    <span 
                                        className="dropdown-item" 
                                        onClick={(e)=> {
                                            e.preventDefault()
                                            CambiarCriterioDeBusqueda(2) 
                                            CambiarPlaceholderDeBusqueda('Buscar Celular')
                                            }
                                    }>Celular</span>
                                    <span 
                                        className="dropdown-item" 
                                        onClick={(e)=> {
                                            e.preventDefault()
                                            CambiarCriterioDeBusqueda(3) 
                                            CambiarPlaceholderDeBusqueda('Buscar Telefono')
                                            }
                                    }>Telefono</span>
                                    <span 
                                        className="dropdown-item" 
                                        onClick={(e)=> {
                                            e.preventDefault()
                                            CambiarCriterioDeBusqueda(4) 
                                            CambiarPlaceholderDeBusqueda('Buscar Correo')
                                            }
                                    }>Correo</span>
                                    {/* <span 
                                        className="dropdown-item" 
                                        onClick={(e)=> {
                                            e.preventDefault()
                                            CambiarCriterioDeBusqueda(5) 
                                            CambiarPlaceholderDeBusqueda('Buscar Clave de inmueble')
                                            }
                                    }>Clave de inmueble</span> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="row botones-funcionales-mobile">
                    <div className="col-12">
                        <div className="row my-3">
                            <small className="text-white">
                                N° de Inmuebles
                            </small>
                        </div>
                    </div>                    
                </div>

                <div className="row">
                    {/* Cards */}
                    <div className="col-12 offset-sm-1">
                        <div className="row">
                            {
                                contactos.length > 0 ?
                                contactos.map( (contacto) => 
                                    <CardInmueble
                                        key={contacto.id}
                                        id={contacto.id}
                                        nombre={contacto.nombre}
                                    />
                                )
                                :
                                (
                                    <h1>No se han encontrado inmuebles</h1>
                                )
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default Ver_contactos
