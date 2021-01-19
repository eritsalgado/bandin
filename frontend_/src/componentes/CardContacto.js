import React,{useState,useContext} from 'react'
import img_m_p from '../assets/img/Icon propietario M.svg'
import icon_editar from '../assets/img/Icon pencil.svg'
import icon_ver_mas from '../assets/img/Icon Ver mas.svg'

// Iconos de sexo de tipo de contacto
import propietario_h from '../assets/img/Icon propietario H.svg'
import propietario_m from '../assets/img/Icon propietario M.svg'

import intCompra_h from '../assets/img/Icon Int en compra H.svg'
import intCompra_m from '../assets/img/Icon Int en compra M.svg'

import intRenta_h from '../assets/img/Icon Int en venta H.svg'
import intRenta_m from '../assets/img/Icon Int en venta M.svg'

import inq_h from '../assets/img/Icon Inquilino H.svg'
import inq_m from '../assets/img/Icon Inquilino M.svg'


import contacto_gral from '../assets/img/Opcion Gral contacto.svg'
import contacto_gral_h from '../assets/img/Icon tipo contacto H.svg'
import contacto_gral_m from '../assets/img/Icon tipo contacto M.svg'


import { ContactoContext } from '../context/contactoContext'

const CardContacto = ({cambiarSeccion, id,nombre,celulares,telefonos,emails,direcciones, tipo_de_contacto, empresa, cargo, facebook, instagram, linkedin, medio_contacto, perfil_pro, perfil_int_r, perfil_int_c, perfil_inq, sexo, requerimiento}) => {


    const { CambiarDatosContacto } = useContext(ContactoContext)

    const [tipo_actual, cambiarTipo] = useState(tipo_de_contacto)

    let status_text = ''
    let status_style = ''
    let fontSize = '10px'
    let status = 1;
    switch (status) {
        case 1:
            status_text ='ACTIVO'
            status_style ='btn-info'
            fontSize = '13px'
            break;
        case 2:
            status_text ='EN PROCESO'  
            status_style ='btn-cafe' 
            fontSize = '9px'         
            break;
        case 3:
            status_text ='SIN CONTACTAR'
            status_style ='btn-negro'
            fontSize = '8px'
            break;
    
        default:
            break;
    }

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
                icono = sexo === 'H' ? contacto_gral_h : contacto_gral_m
                break;
        }

        return icono
    }

    return (
        <div className="col-12 my-3">
            <div className="card bandin-card text-center">
                <div className="card-header">
                    {nombre}
                </div>
                <div className="card-body">
                    <div className="row">
                        <div className="col-6 col-lg-1">
                            <img src={icono_tipo_contacto_sexo(sexo, tipo_actual)} alt="propietario"/>
                        </div>
                        <div className="col-6 col-lg-4 text-right" style={{fontSize:'10px'}}>
                            <p>{celulares.length > 0 ? celulares[0].numero : ''}</p>
                            <p>{telefonos.length > 0 ? telefonos[0].numero : ''}</p>
                            <p>{emails.length > 0 ? emails[0].email : ''}</p>
                        </div>
                        <div className="col-lg-3 xs-d-none">
                            {/* <span>hey</span> */}
                        </div>
                        <div className="col-lg-4 d-flex justify-content-between align-items-center">
                                <button className={`btn ${status_style}`} style={{ fontSize}}>
                                    {'ACTIVO'}
                                </button>
                                <button 
                                    className="btn btn-outline-info"
                                    onClick={(e)=> {
                                        e.preventDefault()
                                        CambiarDatosContacto({
                                            id,
                                            tipo_de_contacto,
                                            sexo,
                                            nombre,
                                            empresa,
                                            cargo,
                                            facebook,
                                            instagram,
                                            linkedin,
                                            medio_contacto,
                                            perfil_pro,
                                            perfil_int_r,
                                            perfil_int_c,
                                            perfil_inq,
                                            requerimiento,
                                            celulares,
                                            telefonos,
                                            emails,
                                            direcciones
                                        })
                                        cambiarSeccion('CONTACTO / AGREGAR')
                                    }}
                                >
                                    <img src={icon_editar} alt="editar" style={{width:'20px', height:'20px', textAlign:'center'}}/>
                                </button>
                                <button className="btn btn-outline-info">
                                    <img src={icon_ver_mas} alt="ver mas" style={{width:'20px', height:'20px', textAlign:'center'}}/>
                                </button>
                        </div>
                    </div>
                </div>
                <div className="card-footer ">

                    <div className="row cambiar_tipo_de_contacto">
                        {
                            tipo_actual !== 'Propietario' ?
                            (
                                <div className="col-4" style={{cursor:'pointer'}}>
                                    <img 
                                        src={perfil_pro === 1 || perfil_pro === "1" ? icono_tipo_contacto_sexo(sexo, 'Propietario') : icono_tipo_contacto_sexo(sexo, 'default')} 
                                        alt="contacto_gral"
                                        onClick={
                                            ()=> {cambiarTipo('Propietario')}
                                        }
                                    />
                                </div>
                            )
                            :
                            null
                        }
                        {
                            tipo_actual !== 'Compra' ?
                            (
                                <div className="col-4" style={{cursor:'pointer'}}>
                                    <img 
                                        src={perfil_int_c === 1 || perfil_int_c === "1" ? icono_tipo_contacto_sexo(sexo, 'Compra') : icono_tipo_contacto_sexo(sexo, 'default')} 
                                        alt="contacto_gral"
                                        onClick={
                                            ()=> {cambiarTipo('Compra')}
                                        }
                                    />
                                </div>
                            )
                            :
                            null
                        } 
                        {
                            tipo_actual !== 'Renta' ?
                            (
                                <div className="col-4" style={{cursor:'pointer'}}>
                                    <img 
                                        src={perfil_int_r === 1 || perfil_int_r === "1" ? icono_tipo_contacto_sexo(sexo, 'Renta') : icono_tipo_contacto_sexo(sexo, 'default')} 
                                        alt="contacto_gral"
                                        onClick={
                                            ()=> {cambiarTipo('Renta')}
                                        }
                                    />
                                </div>
                            )
                            :
                            null
                        }  
                        {
                            tipo_actual !== 'Inquilino' ?
                            (
                                <div className="col-4" style={{cursor:'pointer'}}>
                                    <img 
                                        src={perfil_inq === 1 || perfil_inq === "1" ? icono_tipo_contacto_sexo(sexo, 'Inquilino') : icono_tipo_contacto_sexo(sexo, 'default')} 
                                        alt="contacto_gral"
                                        onClick={
                                            ()=> {cambiarTipo('Inquilino')}
                                        }
                                    />
                                </div>
                            )
                            :
                            null
                        }
                    </div>

                    {/* <div className="row lg-d-none">
                        <div className="col-12 d-flex justify-content-between">
                            <button className={`btn ${status_style}`} style={{maxWidth:'86.83px', fontSize}}>
                                {'ACTIVO'}
                            </button>
                            <button className="btn btn-outline-info">
                                <img src={icon_editar} alt="editar" style={{width:'20px', height:'20px', textAlign:'center'}}/>
                            </button>
                            <button className="btn btn-outline-info">
                                <img src={icon_ver_mas} alt="ver mas" style={{width:'20px', height:'20px', textAlign:'center'}}/>
                            </button>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default CardContacto
