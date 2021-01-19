import React from 'react'
import ico_contacto from '../assets/img/g4592.png'
import ico_inmuebles from '../assets/img/Icon Inmuebles.svg'
import ico_agenda from '../assets/img/Icon Agenda.svg'

const AccesoRapido = ({cambiarSeccion}) => {
    return (
        <div className="acceso_rapido d-flex justify-content-around">
            <a href="#" onClick={(e)=> e.preventDefault() & cambiarSeccion('CONTACTOS')}>
                <img src={ico_contacto} alt="contacto" />
            </a>
            <a href="#" onClick={(e)=> e.preventDefault() & cambiarSeccion('INMUEBLES')}>
                <img src={ico_inmuebles} alt="inmuebles"/>
            </a>
            <a href="#" onClick={(e)=> e.preventDefault() & cambiarSeccion('AGENDA')}>
                <img src={ico_agenda} alt="agenda"/>
            </a>
        </div>
    )
}

export default AccesoRapido
