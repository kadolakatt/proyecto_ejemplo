import { useState } from "react";
import { IniciarSesion } from "./api";

function Login(props) {
    const [ usuario, setUsuario ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ error, setError ] = useState('');
    const onUsuarioChange = (evt) => {
        setUsuario(evt.target.value);
    }

    const onPasswordChange = (evt) => {
        setPassword(evt.target.value);
    }

    const onFormSubmit = async (evt) => {
        evt.preventDefault();
        console.log("Iniciando sesión...");
        const data = await IniciarSesion({
            username: usuario,
            password: password
        })
        if (data?.token) {
            //De todos los metodos para almacenar tokens de acceso en el frontend
            //en localStorage es el que mayor riesgo tiene de ataques XSS, 
            //para mantener simple nuestro proyecto lo haremos así.
            localStorage.setItem("tokenAcceso", JSON.stringify({ token: data.token,  timestamp: Date.now() }));
            props.cambiarSesionIniciada(true);
        }else {
            setError('Nombre de usuario o contraseña incorrecta');
        }
        
    }

    return (
    <div className="container">
        <div className="card mt-lg-5">
            <div className="card-body">
                <h3>Acceso de Empleados</h3>
                <h5 className="text-muted">Inicio de sesión</h5>
            </div>
        </div>
        <div className="card mt-lg-5">
            <div className="card-body">
                <form onSubmit={ onFormSubmit }>
                    <div className="row">
                        <div className="col-12 mt-2">
                            <label>Usuario</label>
                            <input type="text" className="form-control" id="usuario" 
                                   value={ usuario } onChange={ onUsuarioChange } />
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12">
                            <label>Password</label>
                            <input type="password" className="form-control" id="contrasena" 
                                   value={ password } onChange={ onPasswordChange }/>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 text-center">
                            <button type="submit" className="btn btn-primary btn-lg">Iniciar sesión</button>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className="col-12 text-center">{ error }</div>
                    </div>    
                </form>
            </div>
        </div>
    </div> 
    );
}
export default Login;