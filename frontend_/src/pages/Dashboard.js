import React from 'react'
import contactos_img from '../assets/img/g4592.png'
import inmuebles_img from '../assets/img/Icon Inmuebles.svg'
import agenda_img from '../assets/img/Icon Agenda.svg'


import graficos_img from '../assets/img/Icon Dashboard.svg'
import tutorial_img from '../assets/img/Icon tutorial.svg'
import config_img from '../assets/img/Icon configuracion 3.svg'

import '../assets/css/dashboard.css'

const Dashboard = ({toggle_state, cambiarSeccion}) => {
    return (
        <div className="fondo-principal">
            <div className={`container-fluid container_principal ${toggle_state}`}>
                <div className="oculto-movil">
                    <div className="row my-5">
                        <div className="col-3 text-center text-white"></div>
                        <div className="col-3 text-center text-white" style={{cursor:'pointer'}} onClick={()=> { cambiarSeccion('DASHBOARD') }}>
                            <img className="dash_img" src={contactos_img} alt="DASHBOARD"/>
                            <h4>DASHBOARD</h4>
                        </div>
                        <div className="col-3 text-center text-white" style={{cursor:'pointer'}} onClick={()=> { cambiarSeccion('INMUEBLES') }}>
                            <img className="dash_img" src={inmuebles_img} alt="INMUEBLES"/>
                            <h4>INMUEBLES</h4>
                        </div>
                        <div className="col-3 text-center text-white">
                            <img className="dash_img" src={agenda_img} alt="AGENDA"/>
                            <h4>AGENDA</h4>
                        </div>
                    </div>
                    <div className="row my-5">
                        <div className="col-3 text-center text-white">
                                <img className="dash_img" src={graficos_img} alt="GRAFICOS"/>
                                <h4>GRAFICOS Y REPORTES</h4>
                            </div>
                            <div className="col-3 text-center text-white">
                                <img className="dash_img" src={tutorial_img} alt="TUTORIAL"/>
                                <h4>TUTORIAL</h4>
                            </div>
                            <div className="col-3 text-center text-white">
                                <img className="dash_img" src={config_img} alt="CONFIGURACION"/>
                                <h4>CONFIGURACION</h4>
                            </div>
                        <div className="col-3 text-center text-white"></div>
                    </div>
                </div>
            
            </div>
        </div>
    )
}

export default Dashboard
