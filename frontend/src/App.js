//import logo from './logo.svg';
import NavBar from './components/NavBar';
import ProyectList from './components/ProyectList';
import Footer from './components/Footer';
import Login from './components/Login';

import { useState, useEffect } from 'react';

import './bootstrap.css';


function App() {
  const [sesionIniciada, setSesionIniciada] = useState(false);

  const datos_empresa = {
    compania: "Republica de Colombia",
    division: "Ministerio de las TIC",
    direccion: "Av 000 No. 000 - 000",
    telefono: "+57 5 000 0000",
    ciudad: "Barranquilla - Colombia",
    zipcode: "08020"
  }
  const cambiarSesionIniciada = function (exitoLogin) {
    setSesionIniciada(exitoLogin);
  }
  
  //Traemos del localStorage el token de acceso, esto se podria colocar en un 
  //useEffect para causar esta verificación con cada renderización del componente 
  //o para solicitar un token nuevo
  useEffect(() => {
    const tokenData = localStorage.getItem('tokenAcceso');
    if (tokenData) {
        const objToken = JSON.parse(tokenData);
        const diffMins = Math.round((((Date.now() - objToken.timestamp) % 86400000) % 3600000) / 60000);
        
        //Si el usuario tiene más de 60mins de haber iniciado la sesión, se forza un
        //nuevo inicio.
        if (diffMins <= 60) {
          setSesionIniciada(true);
        }else {
          setSesionIniciada(false);
        }
    }
    
  }, [])

  /**/
  const cerrarSesion = async () => {
    localStorage.setItem('tokenAcceso',null);
    setSesionIniciada(false)
  }

  const proyectList = ( 
      <ProyectList  /> 
  );

  const loginComponent = (
    <Login cambiarSesionIniciada={ cambiarSesionIniciada } />
  );



  return (
    <div>
      <NavBar sesionIniciada={ sesionIniciada } barCommand={ cerrarSesion } />
      { sesionIniciada ? proyectList : loginComponent }
      <Footer {...datos_empresa} />
    </div>
  );
}

export default App;
