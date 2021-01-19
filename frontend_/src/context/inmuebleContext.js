import React, {createContext, useState} from 'react'
// import axios from 'axios'
// import swal from 'sweetalert'

export const InmuebleContext = createContext()

const InmuebleProvider = (props) =>{

    const [contacto, CambiarDatosInmueble] = useState({
        id:'',
        propiedad:'',
        titulo:'',
        descripcion:'',
        amenidades:[],
        requerimientos_tecnicos:[],
        ubicacion:[]
    })

    function limpiarData(){
        CambiarDatosInmueble({
            id:'',
            propiedad:'',
            titulo:'',
            descripcion:'',
            amenidades:[],
            requerimientos_tecnicos:[],
            ubicacion:[]
        })
    }

    return (
        <InmuebleContext.Provider
            value={{
                limpiarData,
                contacto, CambiarDatosInmueble
            }}
        >
            {props.children}
        </InmuebleContext.Provider>
    )
}
export default InmuebleProvider