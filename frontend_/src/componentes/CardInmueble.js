import React,{useState,useContext} from 'react'
import img_m_p from '../assets/img/Icon propietario M.svg'
import icon_editar from '../assets/img/Icon pencil.svg'
import icon_ver_mas from '../assets/img/Icon Ver mas.svg'

import IconUbicacionA from '../assets/img/Icon ubicacion A.svg'


import IconRenta from '../assets/img/Icon Renta.svg'
import IconVenta from '../assets/img/Icon Venta.svg'
import IconRentaEsp from '../assets/img/Icon Renta Esp.svg'

import IconM2C from '../assets/img/Icon m2 construidos.svg'
import Iconsuperficie from '../assets/img/Icon superficie.svg'
import IconBanos from '../assets/img/Icon banos.svg'
import Iconrecamaras from '../assets/img/Icon recamaras.svg'


import { ContactoContext } from '../context/contactoContext'

const CardInmueble = ({nombre}) => {


    const { CambiarDatosContacto } = useContext(ContactoContext)

    // const [tipo_actual, cambiarTipo] = useState(tipo_de_contacto)

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

    // const icono_tipo_contacto_sexo = (sexo, tipo_contacto) => {
    //     let icono = ''
    //     switch (tipo_contacto) {
    //         case 'Propietario':
    //             icono = sexo === 'H' ? propietario_h : propietario_m
    //             break;
    //         case 'Renta':
    //             icono = sexo === 'H' ? intRenta_h : intRenta_m
    //             break;
    //         case 'Compra':
    //             icono = sexo === 'H' ? intCompra_h : intCompra_m
    //             break;
    //         case 'Inquilino':
    //             icono = sexo === 'H' ? inq_h : inq_m
    //             break;
        
    //         default:
    //             icono = sexo === 'H' ? contacto_gral_h : contacto_gral_m
    //             break;
    //     }

    //     return icono
    // }

    return (
        <div className="col-12 my-3">
            <div className="card bandin-card text-center">
                <div className="card-header">
                    {/* Descripcion general del departamento o terreno */}
                    {nombre}
                </div>
                <div className="card-body">
                    <div className="row d-flex justify-content-center">
                        <div className="col-12 col-lg-5 py-3">
                            <img  
                                style={{
                                    width:'100%',
                                    borderStyle:'solid',
                                    borderWidth:'1px',
                                    borderColor:'yellow',
                                    paddingTop:'10px',
                                    paddingBottom:'10px'
                                }} 
                                src={`https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/suburban-house-royalty-free-image-1584972559.jpg?crop=1.00xw:0.752xh;0,0.120xh&resize=1200:*`} 
                                alt="imagen de inmueble"
                            />
                            <p 
                                style={{
                                    fontSize:'10px',
                                    paddingTop:'5px'
                                }}
                            >Clave CBR-CAGB0890</p>
                        </div>
                        <div 
                            className="col-11 col-lg-7 text-right" 
                            style={{
                                fontSize:'10px',
                                borderStyle:'solid',
                                borderWidth:'1px',
                                borderColor:'white'
                            }}
                        >
                            

                            {/* Precios */}
                            <div className="row d-flex align-items-center my-3">
                                <div className="col-1">
                                    <img 
                                        src={IconVenta} alt="Venta"
                                        style={{
                                            width:'20px',
                                            height:'20px'
                                        }}
                                    />
                                </div>
                                <div className="col-4 text-left">Venta</div>
                                <div className="col-6 text-right" style={{fontSize:'8px', textAlign:'center'}}>
                                    ..........$5,709,000.00
                                </div>
                            </div>

                            <div className="row d-flex align-items-center my-3">
                                <div className="col-1">
                                    <img 
                                        src={IconRenta} alt="renta"
                                        style={{
                                            width:'20px',
                                            height:'20px'
                                        }}
                                    />
                                </div>
                                <div className="col-4 text-left">Renta</div>
                                <div className="col-6 text-right" style={{fontSize:'8px', textAlign:'center'}}>
                                ..........$23,000.00
                                </div>
                            </div>

                            <div className="row d-flex align-items-center my-3">
                                <div className="col-1">
                                    <img 
                                        src={IconRentaEsp} alt="Venta"
                                        style={{
                                            width:'20px',
                                            height:'20px'
                                        }}
                                    />
                                </div>
                                <div className="col-4 text-left">Renta Esp.</div>
                                <div className="col-6 text-right" style={{fontSize:'8px', textAlign:'center'}}>
                                ..........$500,000.00
                                </div>
                            </div>
                            {/* Precios */}

                            {/* divisas */}
                            <div className="row">
                                <div className="col-12 mt-2">
                                    <div className="row d-flex justify-content-around">
                                        <div 
                                            className="col-4"
                                        >
                                            <p
                                            style={{
                                                borderWidth:'.5px',
                                                borderRadius:'5px',
                                                borderColor:'white',
                                                borderStyle:'solid',
                                                textAlign:'center',
                                                fontSize:'7px',
                                                paddingTop:'8px',
                                                paddingBottom:'8px',
                                                width:'35px'
                                            }}>
                                                MXN
                                            </p>
                                        </div>
                                        <div 
                                            className="col-4"
                                        >
                                            <p
                                            style={{
                                                borderWidth:'.5px',
                                                borderRadius:'5px',
                                                borderColor:'white',
                                                borderStyle:'solid',
                                                textAlign:'center',
                                                fontSize:'7px',
                                                paddingTop:'8px',
                                                paddingBottom:'8px',
                                                width:'35px'
                                            }}>
                                                USD
                                            </p>
                                        </div>
                                        <div 
                                            className="col-4"
                                        >
                                            <p
                                            style={{
                                                borderWidth:'.5px',
                                                borderRadius:'5px',
                                                borderColor:'white',
                                                borderStyle:'solid',
                                                textAlign:'center',
                                                fontSize:'7px',
                                                paddingTop:'8px',
                                                paddingBottom:'8px',
                                                width:'35px'
                                            }}>
                                                EU
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* divisas */}

                                                       
                        </div>
                        <div className="col-12">
                            {/* Ubicación */}
                            <div className="row d-flex align-items-center my-3">
                                <div className="col-2">
                                    <img 
                                        src={IconUbicacionA} alt="ubicacion"
                                        style={{
                                            width:'20px',
                                            height:'20px'
                                        }}
                                    />
                                </div>
                                <div 
                                    className="col-10 text-left"
                                    style={{
                                        fontSize:'8px'
                                    }}
                                >
                                        Horacio, Polanco, Miguel Hidalgo CDMX
                                </div>
                            </div>
                            {/* Ubicación */}
                            {/* Datos */} 
                            <div className="row d-flex align-items-center justify-content-around" style={{fontSize:'8px'}}>
                                <div className="col-3 text-center d-flex align-items-center justify-content-center flex-column">
                                    <div
                                    style={{
                                        borderWidth:'.5px',
                                        borderRadius:'5px',
                                        borderColor:'white',
                                        borderStyle:'solid',
                                        textAlign:'center',
                                        fontSize:'7px',
                                        paddingTop:'5px',
                                        paddingBottom:'5px',
                                        paddingLeft: '8px',
                                        paddingRight: '8px',
                                        minWidth:'40px'
                                    }}>
                                        <img src={IconM2C} alt="m2c"/>
                                    </div>
                                    <p>105 m2</p>
                                </div>
                                <div className="col-3 text-center d-flex align-items-center justify-content-center flex-column">
                                    <div
                                    style={{
                                        borderWidth:'.5px',
                                        borderRadius:'5px',
                                        borderColor:'white',
                                        borderStyle:'solid',
                                        textAlign:'center',
                                        fontSize:'7px',
                                        paddingTop:'5px',
                                        paddingBottom:'5px',
                                        paddingLeft: '8px',
                                        paddingRight: '8px',
                                        minWidth:'40px'
                                    }}>
                                        <img src={Iconsuperficie} alt="m2c"/>
                                    </div>
                                    <p>175 m2</p>
                                </div>
                            
                                <div className="col-3 text-center d-flex align-items-center justify-content-center flex-column">
                                    <div
                                    style={{
                                        borderWidth:'.5px',
                                        borderRadius:'5px',
                                        borderColor:'white',
                                        borderStyle:'solid',
                                        textAlign:'center',
                                        fontSize:'7px',
                                        paddingTop:'5px',
                                        paddingBottom:'5px',
                                        paddingLeft: '8px',
                                        paddingRight: '8px',
                                        minWidth:'40px'
                                    }}>
                                        <img src={Iconrecamaras} alt="recamaras"/>
                                    </div>
                                    <p>4</p>
                                </div>
                                <div className="col-3 text-center d-flex align-items-center justify-content-center flex-column">
                                    <div
                                    style={{
                                        borderWidth:'.5px',
                                        borderRadius:'5px',
                                        borderColor:'white',
                                        borderStyle:'solid',
                                        textAlign:'center',
                                        fontSize:'7px',
                                        paddingTop:'5px',
                                        paddingBottom:'5px',
                                        paddingLeft: '8px',
                                        paddingRight: '8px',
                                        minWidth:'40px'
                                    }}>
                                        <img src={IconBanos} alt="Baños"/>
                                    </div>
                                    <p>2.5</p>
                                </div>
                            </div>
                            <div className="row d-flex align-items-center justify-content-around"></div>
                            {/* Datos */} 
                        </div>
                        <div className="col-lg-3 xs-d-none">
                            {/* <span>hey</span> */}
                        </div>
                        
                    </div>
                </div>
                <div className="card-footer ">

                    <div className="col-lg-4 d-flex justify-content-between align-items-center">
                            <button className={`btn ${status_style}`} style={{ fontSize}}>
                                {'ACTIVO'}
                            </button>
                            <button 
                                className="btn btn-outline-info"
                                onClick={(e)=> {
                                    e.preventDefault()
                                    CambiarDatosContacto({
                                        nombre,
                                    })
                                    // cambiarSeccion('CONTACTO / AGREGAR')
                                }}
                            >
                                <img src={icon_editar} alt="editar" style={{width:'20px', height:'20px', textAlign:'center'}}/>
                            </button>
                            <button className="btn btn-outline-info">
                                <img src={icon_ver_mas} alt="ver mas" style={{width:'20px', height:'20px', textAlign:'center'}}/>
                            </button>
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

export default CardInmueble
