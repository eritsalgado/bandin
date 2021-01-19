import React, { useState } from 'react'
import ico_contacto from '../assets/img/Icon contacto 3.svg'
import ico_inmuebles from '../assets/img/Icon Inmuebles.svg'
import ico_agenda from '../assets/img/Icon Agenda.svg'
import ico_dashboard from '../assets/img/Icon Dashboard.svg'
import ico_tutorial from '../assets/img/Icon tutorial.svg'
import ico_config from '../assets/img/Icon configuracion 3.svg'

import ico_navegar from '../assets/img/Icon navegar.svg'

import '../assets/css/navegacion.css'
import { CSSTransition } from 'react-transition-group'

const Nav_lat = ({toggle_state, cambiarSeccion}) => {

    const [menu_activo, cambiarMenu] = useState('main')

    return (
        <div className={`navigation ${toggle_state}`}>
            <ul>
            <CSSTransition 
                    in={menu_activo === 'main'} 
                    unmountOnExit 
                    timeout={500}
                    classNames="menu-primary"
                >
                    <div className="menu">
                        
                        <li>
                            {/* <a href="#" onClick={(e)=> "settings" && cambiarMenu("settings")}> */}
                            <a href="#" onClick={(e)=> e.preventDefault() & cambiarSeccion('CONTACTOS')}>
                                <span className="icon">
                                    <img src={ico_contacto} alt="" style={{width:"60px"}}/>
                                </span>
                                <span className="title">CONTACTOS</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={(e)=> e.preventDefault() & cambiarSeccion('INMUEBLES')}>
                                <span className="icon">
                                    <img src={ico_inmuebles} alt=""/>
                                </span>
                                <span className="title">INMUEBLES</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={(e)=> e.preventDefault() & cambiarSeccion('AGENDA')}>
                                <span className="icon">
                                    <img src={ico_agenda} alt=""/>
                                </span>
                                <span className="title">AGENDA</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={(e)=> e.preventDefault() & cambiarSeccion('REPORTES')}>
                                <span className="icon">
                                    <img src={ico_dashboard} alt=""/>
                                </span>
                                <span className="title">REPORTES</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={(e)=> e.preventDefault() & cambiarSeccion('TUTORIALES')}>
                                <span className="icon">
                                    <img src={ico_tutorial} alt=""/>
                                </span>
                                <span className="title">TUTORIALES</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={(e)=> "settings" && cambiarMenu("settings")}>
                            {/* <a href="#" onClick={(e)=> }> */}
                                <span className="icon">
                                    <img src={ico_config} alt="ico_config"/>
                                </span>
                                <span className="title">CONFIG</span>
                            </a>
                        </li>
                    
                    </div>
                    
                </CSSTransition>


                {/* <CSSTransition 
                    in={menu_activo === 'settings'} 
                    unmountOnExit 
                    timeout={500}
                    classNames="menu-secondary"
                >
                    <div className="menu">
                        
                    <li>
                            <a href="!#" onClick={(e)=> "main" && cambiarMenu("main")}>
                                <span className="icon">
                                    <img src={ico_contacto} alt="ico_contacto" style={{width:"60px"}}/>
                                </span>
                                <span className="title">CONTACTOS</span>
                            </a>
                        </li>
                        
                    </div>
                    
                </CSSTransition> */}

                <CSSTransition 
                    in={menu_activo === 'settings'} 
                    unmountOnExit 
                    timeout={500}
                    classNames="menu-secondary"
                >
                    <div className="menu">
                        
                        <li>
                            <a href="#" onClick={(e)=> "main" && cambiarMenu("main")}>
                                <span className="icon">
                                    <img src={ico_navegar} alt="ico_navegar" style={{width:"10px", transform: 'rotate(180deg)'}}/>
                                </span>
                                <span className="title">CONFIG</span>
                            </a>
                        </li>
                        <li>
                            <a href="#" onClick={(e)=> e.preventDefault() & cambiarSeccion('CONFIG')}>
                                <span className="icon">
                                    <img src={ico_config} alt="ico_config"/>
                                </span>
                                <span className="title">DASHBOARD</span>
                            </a>
                        </li>
                        
                    </div>
                    
                </CSSTransition>
            </ul>
        </div>
    )
}

export default Nav_lat
