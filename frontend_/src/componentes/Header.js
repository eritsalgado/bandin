import React from 'react'
import profile_pic from '../assets/img/fotos-perfil-whatsapp_16.jpg'

const Header = () => {
    return (
        <div className="header-principal d-flex justify-content-around align-items-center">

            {/* Imagen de perfil circular */}
            <div className="img-perfil">
                <img src={profile_pic} alt="profile" className="profile-img"/>
            </div>

            <div className="rol text-center">
                <p className="rol-usuario">
                    SUPER ADMINISTRADOR
                </p>
                <p className="nombre-usuario">
                    Nombre de administrador general
                </p>
            </div>

            <div className="flecha">
                <i className="fas fa-chevron-down boton"></i>  
            </div>    
                
        </div>
    )
}

export default Header
