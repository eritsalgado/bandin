import React, {createContext, useState} from 'react'
// import axios from 'axios'
// import swal from 'sweetalert'

export const ContactoContext = createContext()

const ContactoProvider = (props) =>{

    const [contacto, CambiarDatosContacto] = useState({
        tipo_de_contacto:'Propietario',
        sexo:'H',
        nombre:'',
        empresa:'',
        cargo:'',
        facebook:'',
        instagram:'',
        linkedin:'',
        medio_contacto:'1',
        perfil_pro: true,
        perfil_int_r:false,
        perfil_int_c:false,
        perfil_inq:false,
        requerimiento:'',
        celulares:[],
        telefonos:[],
        direcciones:[],
        emails:[]
    })

    function limpiarData(){
        CambiarDatosContacto({
            tipo_de_contacto:'Propietario',
            sexo:'H',
            nombre:'',
            empresa:'',
            cargo:'',
            facebook:'',
            instagram:'',
            linkedin:'',
            medio_contacto:'1',
            perfil_pro: true,
            perfil_int_r:false,
            perfil_int_c:false,
            perfil_inq:false,
            requerimiento:'',
            celulares:[],
            telefonos:[],
            direcciones:[],
        })
    }

    return (
        <ContactoContext.Provider
            value={{
                limpiarData,
                contacto, CambiarDatosContacto
            }}
        >
            {props.children}
        </ContactoContext.Provider>
    )
}
export default ContactoProvider