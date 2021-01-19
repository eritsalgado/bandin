import React from 'react'
import logo_svg from '../assets/img/logo-bandin.svg'

const Footer = () => {
    return (
        <footer className="d-flex align-items-center">
            <div className="container-fluid">
                <div className="row d-flex align-items-center">
                    <div className="col-12 col-md-2 logo-footer d-none">
                        <img src={logo_svg} alt="Logo" style={{width: "90%"}}/>
                    </div>
                    <div className="col-12 col-md-4">
                        <p>Fuente de trevi 193, Col. Lomas de Tecamachalco, Naucalpan, EDO. MEX</p>
                    </div>
                    <div className="col-6 col-md-3 ">
                        <p>
                            Tel. Oficina: (55) 5290 - 0640
                        </p>
                        <p>
                            Tel. Contacto: (55) 0000 - 0000
                        </p>
                    </div>
                    <div className="col-6 col-md-3 text-center footer-web">
                        www.bandin.mx
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
