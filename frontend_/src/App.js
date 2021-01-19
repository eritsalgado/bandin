import React, {useState, useEffect} from 'react'

import './assets/css/App.css'
import './assets/css/Colores.css'
import './assets/css/media_query.css'

// Componentes
import Header from './componentes/Header'
import Navegacion from './componentes/Nav'
import Navegacion_lateral from './componentes/Nav_lat'
import FondoOscuro from './componentes/FondoOscuro'
import AccesoRapido from './componentes/AccesoRapido'
import Footer from './componentes/Footer'

// Paginas
import Dashboard from './pages/Dashboard'
import Datos_empresa from './pages/Datos_empresa'
import Agregar_contacto from './pages/Agregar_contacto'
import Ver_contactos from './pages/Ver_contactos'
import Ver_inmuebles from './pages/Ver_inmuebles'
import Agregar_inmueble from './pages/Agregar_inmueble'

import ContactoProvider from './context/contactoContext'


function App() {

  const [seccion, cambiarSeccion] = useState('DASHBOARD')
  const [id_a_buscar, CambiarId] = useState(0)
  const [toggle_state, toggleMenu] = useState('')
  const [componente, cambiarComponente] = useState(<Dashboard toggle_state={toggle_state}/>)

  

  useEffect(()=>{
    const Seccion_Actual = seccion => {
      switch (seccion) {
        case 'DASHBOARD':
          cambiarComponente(<Dashboard toggle_state={toggle_state} cambiarSeccion={cambiarSeccion}/>)
          break;
        case 'CONTACTOS':
          cambiarComponente(
            <Ver_contactos 
              toggle_state={toggle_state} 
              cambiarSeccion={cambiarSeccion}
              CambiarId={CambiarId}
            />
          )
          break;
        case 'CONTACTO / AGREGAR':
          cambiarComponente(
            <Agregar_contacto 
              toggle_state={toggle_state} 
              cambiarSeccion={cambiarSeccion}
            />
          )
          break;
        case 'INMUEBLES':
          cambiarComponente(
            <Ver_inmuebles 
              toggle_state={toggle_state} 
              cambiarSeccion={cambiarSeccion}
              CambiarId={CambiarId}
            />
          )
          break;
          case 'INMUEBLE / AGREGAR':
            cambiarComponente(
              <Agregar_inmueble 
                toggle_state={toggle_state} 
                cambiarSeccion={cambiarSeccion}
              />
            )
            break;
        case 'CONFIG':
          cambiarComponente(<Datos_empresa toggle_state={toggle_state}/>)
          break;
      
        default:
          cambiarComponente(<Dashboard toggle_state={toggle_state}/>)
          break;
      }
    }

    Seccion_Actual(seccion)
  },[seccion])
  return (
    <div className="container-principal">
      <ContactoProvider>

        <Header/>

        <Navegacion
          seccion={seccion}
          toggle_state={toggle_state}
          toggleMenu={toggleMenu}
        />

        <Navegacion_lateral
          toggle_state={toggle_state}
          cambiarSeccion={cambiarSeccion}
        />
        <FondoOscuro
          toggle_state={toggle_state}
        />


        {componente}


        <AccesoRapido
          cambiarSeccion={cambiarSeccion}
        />
        <Footer/>

      </ContactoProvider>
    </div>
    
  );
}

export default App;
