import React, {useState} from 'react'
import facebook_img from '../assets/img/Icono facebook.svg'
import instagram_img from '../assets/img/icono instagram.svg'
import linkedin_img from '../assets/img/icono linkedin.svg'

import check from '../assets/img/Icon selecciona.svg'
import search_out from '../assets/img/Icon Lupa B.svg'
import search_in from '../assets/img/Icon Lupa G.svg'

import '../assets/css/datos_empresa.css'

import {zfill} from '../funciones/ceros_a_la_izquierda'
import { v4 as uuidv4 } from 'uuid';

// Una vez creado el id, se habilitan todos los demas campos
const DatosEmpresa = ({toggle_state}) => {

    const [seleccion, cambiarSeleccion] = useState('No seleccionado')
    const [empresa_seleccionada, cambiarEmpresa] = useState('0')
    const [select_fra_suc, cambiarSelectFraSuc] = useState('')
    const [cant_fra_suc, cambiarCantFraSuc] = useState(0)
    const [dominios, ajustarDominios] = useState([])
    const [dominio_actual, ajustarDominioActual] = useState('')

    // Validaciones

    // Nombre
    const [nombre, cambiarNombre] = useState('')
    const [nombre_error, cambiarNombreError] = useState(false)
    const [nombre_status, cambiarNombreStatus] = useState('')
    // Pais
    const [pais, cambiarPais] = useState(0)
    const [pais_error, cambiarPaisError] = useState(false)
    const [pais_status, cambiarPaisStatus] = useState('')
    // Estado
    const [estado, cambiarEstado] = useState(0)
    const [estado_error, cambiarEstadoError] = useState(false)
    const [estado_status, cambiarEstadoStatus] = useState('')
    // Estado
    const [alcaldia, cambiarAlcaldia] = useState(0)
    const [alcaldia_error, cambiarAlcaldiaError] = useState(false)
    const [alcaldia_status, cambiarAlcaldiaStatus] = useState('')
    // Domicilio
    const [domicilio, cambiarDomicilio] = useState('')
    const [domicilio_error, cambiarDomicilioError] = useState(false)
    const [domicilio_status, cambiarDomicilioStatus] = useState('')
    // Telefono de oficina
    const [telefono_oficina, cambiarTelefonoOficina] = useState('')
    const [telefono_oficina_error, cambiarTelefonoOficinaError] = useState(false)
    const [telefono_oficina_status, cambiarTelefonoOficinaStatus] = useState('')
    // Telefono de contacto
    const [telefono_contacto, cambiarTelefonoContacto] = useState('')
    const [telefono_contacto_error, cambiarTelefonoContactoError] = useState(false)
    const [telefono_contacto_status, cambiarTelefonoContactoStatus] = useState('')


    const agregarDominioNuevo = (e, dominio) => {
        e.preventDefault()
        ajustarDominios(
            [
                ...dominios ,
                {
                    'id': uuidv4(),
                    'nombre':dominio
                }
            ]
        )
    }

    const empresas = [
        {id:'1', nombre:'Bimbo', relacionados:[{id:1,nombre:'Donitas'},{id:2,nombre:'Negrito'}]},
        {id:'2', nombre:'Sabritas', relacionados:[{id:3,nombre:'Cheetos'},{id:4,nombre:'Taquis'},{id:5,nombre:'Toreadas'}]},
        {id:'3', nombre:'Neztlé', relacionados:[]},
        {id:'4', nombre:'Ryzen', relacionados:[]},
        {id:'5', nombre:'EVGA', relacionados:[]},
        {id:'6', nombre:'BENQ', relacionados:[]},
        {id:'7', nombre:'Diamond', relacionados:[]},
    ]

    return (
        <div className="fondo-trabajo text-white">
            <div className={`container-fluid container_principal`}>

                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-12 col-md-2 my-4">
                        <h6 className="text-center">Elige un tipo de usuario</h6>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-1"></div>
                    <div className="col-12 col-md-2 my-4 d-flex flex-column align-items-center justify-content-around">
                        {/* Tipo de usuario (cajas rojas) */}
                        
                        <div className={`row py-4`}>
                            <div className="col-12">
                                <div 
                                    className="caja-roja d-flex justify-content-center flex-column align-items-center"
                                    onClick={(e)=> {
                                        e.preventDefault()
                                        cambiarSeleccion('Empresa')
                                    }}
                                >
                                    <div className="caja-texto">
                                        <p>
                                            EMPRESA
                                        </p>
                                    </div>
                                    <div className="caja-icono">
                                        <img src={check} alt="check"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`row py-4`}>
                            <div className="col-12">
                                <div 
                                    onClick={(e)=> { 
                                        e.preventDefault() 
                                        cambiarSeleccion('Franquicia o sucursal')
                                    }}
                                    className="caja-roja d-flex justify-content-center flex-column align-items-center"
                                >
                                    <div className="caja-texto text-center">
                                        <p>
                                            FRANQUICIA Y/O SUCURSAL
                                        </p>
                                    </div>
                                    <div className="caja-icono">
                                        <img src={check} alt="check"/>
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
                                        cambiarSeleccion('Externos')
                                    }}
                                >
                                    <div className="caja-texto">
                                        <p>
                                            EXTERNOS
                                        </p>
                                    </div>
                                    <div className="caja-icono">
                                        <img src={check} alt="check"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-md-1"></div>

                    <div className="col-12 col-md-4">
                        {/* Datos de usuario */}
                        <div className="row my-4 d-flex justify-content-center align-items-center">
                            <div className="col-2 d-flex align-items-center">
                                <span>ID:</span>
                            </div>
                            <div className="col-5">
                                <input 
                                    type="text"
                                    className="form-control text-center" 
                                    value={`${empresa_seleccionada !== '0' ? zfill( empresa_seleccionada, 5 ) : zfill( empresas.length+1, 5 )}`} 
                                    disabled
                                />
                            </div>
                            <div className={`col-2 ${empresa_seleccionada !== '0' ? 'd-none' : ''}`}>
                                <button className="btn btn-custom-2">
                                    <img src={search_out} alt="buscar" style={{width:'20px'}}/>
                                </button>
                            </div>
                        </div>

                        <div className={`row py-4 ${seleccion === 'Franquicia o sucursal' ? 'mostrar' : 'ocultar hidden'}`}>
                            <div className="col-12">
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <label className="input-group-text transparent" htmlFor="select_empresa">
                                            <img src={search_in} alt="Buscar" style={{width:'20px'}}/>
                                        </label>
                                    </div>
                                    <select 
                                        className="custom-select" 
                                        id="select_empresa"
                                        value={empresa_seleccionada} 
                                        onChange={(e) => {
                                            cambiarEmpresa(e.target.value)
                                            let franquicias =  empresas.filter(function(empresa) {
                                                if(empresa.id !== undefined && empresa.id === e.target.value)
                                                return empresa
                                            })

                                            if(franquicias.length > 0){
                                                cambiarCantFraSuc( franquicias[0].relacionados.length )
                                            }
                                            
                                        }}
                                    >
                                    <option value="0">-Ninguna una empresa-</option>
                                        {
                                            empresas.map(empresa => (
                                                <option key={empresa.id} value={empresa.id}>{zfill(empresa.id, 5)} - {empresa.nombre}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="col-12 py-4 text-center">
                                <h5>Seleccione una opción:</h5>
                            </div>
                            <div className="col-12 d-flex justify-content-center flex-column align-items-center">
                                <div className="opcion-f-s" onClick={()=> {cambiarSelectFraSuc('F')}}>Franquicia</div>
                                <div className="opcion-f-s" onClick={()=> {cambiarSelectFraSuc('S')}}>Sucursal</div>
                            </div>
                            <div className="col-12">
                                <div className="row mt-5 d-flex justify-content-center align-items-center">
                                    <div className="col-2">
                                        Clave:
                                    </div>
                                    <div className="col-6">
                                        <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text">{select_fra_suc}</span>
                                            </div>
                                            <input type="text" className="form-control text-center" value={zfill( parseInt(cant_fra_suc) +1 , 5 )} readOnly/>
                                        </div>
                                    </div>
                                </div>
                            </div>                            
                        </div>


                        <div className="row my-4 d-flex justify-content-center align-items-center">
                            <div className="col-12 col-md-2">
                                <span>Nombre:</span>
                            </div>
                            <div className="col-12 col-md-10">
                                <input 
                                    type="text" 
                                    name="nombre" 
                                    className={`form-control ${nombre_status}`}
                                    onChange={(e)=> {
                                        cambiarNombre(e.target.value)
                                    }}
                                    onBlur={()=> {
                                        if(nombre.trim() === ""){
                                            cambiarNombreError(true)
                                            cambiarNombreStatus('is-invalid')
                                        }else{
                                            cambiarNombreError(false)
                                            cambiarNombreStatus('is-valid')
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12">
                                <span>Logotipo:</span>
                            </div>
                            <div className="col-12">
                                <label htmlFor="file_datos_empresa" class="form-control">Seleccionar Imagen</label>
                                <input type="file" className="form-control d-none" id="file_datos_empresa"/>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12">
                                <span>Pais:</span>
                            </div>
                            <div className="col-12">
                                <select 
                                    className={`form-control ${pais_status}`}
                                    value={pais}
                                    required
                                    onChange={(e)=>{
                                        cambiarPais(e.target.value)
                                    }}
                                    onBlur={()=>{
                                        if(pais === "0" || pais === 0){
                                            cambiarPaisError(true)
                                            cambiarPaisStatus('is-invalid')
                                        }else{
                                            cambiarPaisError(false)
                                            cambiarPaisStatus('is-valid')
                                        }
                                    }}
                                >
                                    <option value="0">-Selecciona un pais-</option>
                                    <option value="1">México</option>
                                </select>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12">
                                <span>Estado:</span>
                            </div>
                            <div className="col-12">
                                <select 
                                    className={`form-control ${estado_status}`}
                                    value={estado}
                                    required
                                    onChange={(e)=>{
                                        cambiarEstado(e.target.value)
                                    }}
                                    onBlur={()=>{
                                        if(estado === "0" || estado === 0){
                                            cambiarEstadoError(true)
                                            cambiarEstadoStatus('is-invalid')
                                        }else{
                                            cambiarEstadoError(false)
                                            cambiarEstadoStatus('is-valid')
                                        }
                                    }}
                                >
                                    <option value="0">-Selecciona un estado-</option>
                                    <option value="1">Ciudad de México</option>
                                </select>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12">
                                <span>Alcaldia o municipio:</span>
                            </div>
                            <div className="col-12">
                                <select 
                                    className={`form-control ${alcaldia_status}`}
                                    value={alcaldia}
                                    required
                                    onChange={(e)=>{
                                        cambiarAlcaldia(e.target.value)
                                    }}
                                    onBlur={()=>{
                                        if(alcaldia === "0" || alcaldia === 0){
                                            cambiarAlcaldiaError(true)
                                            cambiarAlcaldiaStatus('is-invalid')
                                        }else{
                                            cambiarAlcaldiaError(false)
                                            cambiarAlcaldiaStatus('is-valid')
                                        }
                                    }}
                                >
                                    <option value="0">-Selecciona una alcaldía-</option>
                                    <option value="1">Alcaldía 01</option>
                                </select>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12">
                                <span>Domicilio:</span>
                            </div>
                            <div className="col-12">
                                <input 
                                    type="text" 
                                    className={`form-control ${domicilio_status}`}
                                    name="domicilio"
                                    value={domicilio}
                                    onChange={(e)=> {
                                        cambiarDomicilio(e.target.value)
                                    }}
                                    onBlur={()=>{
                                        if(domicilio.trim() === ""){
                                            cambiarDomicilioError(true)
                                            cambiarDomicilioStatus('is-invalid')
                                        }else{
                                            cambiarDomicilioError(false)
                                            cambiarDomicilioStatus('is-valid')
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12">
                                <span>Telefono de oficina:</span>
                            </div>
                            <div className="col-12">
                                <input 
                                    type="phone" 
                                    maxLength={10} 
                                    placeholder="( __ )"                                    
                                    name="telefono_oficina" 
                                    value={telefono_oficina}
                                    className={`form-control ${telefono_oficina_status}`}
                                    onChange={(e)=> {
                                        cambiarTelefonoOficina(e.target.value)
                                    }}
                                    onBlur={()=> {
                                        if(telefono_oficina.trim() === "" || telefono_oficina.trim().length < 10){
                                            cambiarTelefonoOficinaError(true)
                                            cambiarTelefonoOficinaStatus('is-invalid')
                                        }else{
                                            cambiarTelefonoOficinaError(false)
                                            cambiarTelefonoOficinaStatus('is-valid')
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12">
                                <span>Telefono de contacto:</span>
                            </div>
                            <div className="col-12">
                                <input 
                                    type="phone" 
                                    maxLength={10} 
                                    placeholder="( __ )"                                    
                                    name="telefono_contacto" 
                                    value={telefono_contacto}
                                    className={`form-control ${telefono_contacto_status}`}
                                    onChange={(e)=> {
                                        cambiarTelefonoContacto(e.target.value)
                                    }}
                                    onBlur={()=> {
                                        if(telefono_contacto.trim() === "" || telefono_contacto.trim().length < 10){
                                            cambiarTelefonoContactoError(true)
                                            cambiarTelefonoContactoStatus('is-invalid')
                                        }else{
                                            cambiarTelefonoContactoError(false)
                                            cambiarTelefonoContactoStatus('is-valid')
                                        }
                                    }}
                                />
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12">
                                <span>Dominios:</span>
                            </div>
                            <div className="col-12">
                                <div className="input-group mb-3">
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        defaultValue={dominio_actual} 
                                        onChange={(e)=>{ajustarDominioActual(e.target.value)}} 
                                        placeholder="dominio.com/mx ... etc"
                                    />
                                    <div className="input-group-append">
                                        <button 
                                            className="btn btn-outline-secondary" 
                                            type="button"
                                            onClick={(e)=> {
                                                e.preventDefault()
                                                agregarDominioNuevo(e, dominio_actual)
                                                ajustarDominioActual('')
                                            }}
                                        >+</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-12">
                                <div className="alert alert-success text-center" role="alert">
                                    Se ha agregado correctamente
                                </div>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12">
                                <span>Dominio Principal:</span>
                            </div>
                            <div className="col-12">
                                <select className="form-control">
                                    <option value="0">Elige Dominio Principal</option>
                                    {
                                        dominios.map(dominio => (
                                            <option key={dominio.id} value={dominio.id}>{dominio.nombre}</option>
                                        ))
                                    }
                                </select>
                            </div>
                        </div>
                        <div className="row my-4">
                            <div className="col-6">
                                <span>¿Deseas que tus franquicias o sucursales tengan páginas propias?</span>
                            </div>
                            <div className="col-6 d-flex align-items-center">
                                <select className="form-control">
                                    <option value="1">No</option>
                                    <option value="2">Si</option>
                                </select>
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
                                        <div className="col-4 d-flex justify-content-center">
                                            <div className="sombra selected"></div>
                                            <img src={facebook_img} alt="facebook"/>
                                        </div>
                                        <div className="col-4 d-flex justify-content-center">
                                            <div className="sombra "></div>
                                            <img src={instagram_img} alt="instagram"/>
                                        </div>
                                        <div className="col-4 d-flex justify-content-center">
                                            <div className="sombra "></div>
                                            <img src={linkedin_img} alt="linkedin"/>
                                        </div>
                                    {/* </div> */}
                                </div>
                            </div>
                            <div className="row my-4">
                            <div className="social-media-inputs">
                            <div className="row my-2">
                                    <div className="col-12">
                                        <input type="text" className="form-control" placeholder="facebook.com/"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        </div>
                    </div>
                </div>
                
                
                
                
                
                {/* Una vez lleno el formulario, verificar */}

                <div className="row text-center">
                    <div className="col-12 my-5">
                        <button className="btn btn-custom-1 mr-4">
                            CANCELAR
                        </button>
                        <button className="btn btn-custom-1">
                            GUARDAR
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DatosEmpresa
