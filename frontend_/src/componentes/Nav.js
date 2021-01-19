import React from 'react'
import logo_svg from '../assets/img/logo-bandin.svg'
import flecha_der from '../assets/img/Icon navegar.svg'

const Navegacion = ({seccion, toggle_state, toggleMenu}) => {
    return (
        <div className="nav d-flex justify-content-between">
            <div className="logo d-none">
                <img src={logo_svg} alt="logo" className="img_logo"/>
            </div>      
            <div className="text-white d-flex align-items-center">
                <div className="ubicacion u-izq mx-1">
                    {seccion}
                </div>
                <div className="icono-2 mx-1">
                    <div className={`toggle ${toggle_state}`} onClick={()=>{toggleMenu(toggle_state === '' ? 'active' : '')}}></div>
                </div>
                <div 
                    className="ubicacion u-der mx-3" 
                    style={
                        {
                            height:"50px", 
                            padding: "15px 10px",
                            backgroundColor: "#FFF",
                            color: "#000"
                        }
                    }
                >
                    {seccion}
                </div>
                {/* <div className="ubicacion u-der">
                    <img src={flecha_der} alt="derecha" style={{width: "15px"}}/>
                </div>
                <div className="ubicacion u-der ml-2">
                    Principal
                </div> */}
            </div>
        </div>
    )
}

export default Navegacion
