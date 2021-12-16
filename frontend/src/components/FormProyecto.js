import { useState } from 'react';

function FormProyecto(props) {
    
    /*Estructura de Proyecto
    { 
        id:"", 
        nombre: "", 
        fecha: "", 
        descripcion: "", 
        director:"", 
        completado: true 
    }*/

    const proyectoLimpio = { 
            id:"", 
            nombre: "", 
            fecha: "", 
            descripcion: "", 
            director:"", 
            completado: true 
    }

    const onInputChange = function (evt) {
        const p = {...proyectoState};
        
        //Aqui podemos implementar validaciones a nivel de cambio

        p[evt.target.name] = evt.target.value;
        setProyectoState(p);
    }

    const onFormSubmit = function (evt) {
        evt.preventDefault();
        
        //Aqui podemos implementar validaciones a nivel de formulario.

        props.onGuardar(proyectoState);
        setProyectoState(proyectoLimpio);
    }

    const valorEstado = ( props.modo !=="nuevo" ? {...props.proyecto} : proyectoLimpio );
    const [ proyectoState, setProyectoState ] = useState(valorEstado);

    return (
        <form onSubmit={ onFormSubmit }>
            {/*<div className="form-group">
                <label className="control-label">Id</label>
                <input className="form-control" type="number" name="id" value={ proyectoState.id } onChange={onInputChange} /> 
            </div>*/}
            <div className="form-group">
                <label className="control-label">Nombre</label>
                <input className="form-control" type="text" name="nombre" value={ proyectoState.nombre }  onChange={onInputChange} /> 
            </div>
            <div className="form-group">
            <label className="control-label">Fecha</label>
                <input className="form-control" type="date" name="fecha" value={ proyectoState.fecha } onChange={onInputChange} /> 
            </div>
            <div className="form-group">
            <label className="control-label">Director</label>
                <input className="form-control" type="text" name="director" value={ proyectoState.director } onChange={onInputChange} /> 
            </div>
            <div className="form-group">
            <label className="control-label">Descripción</label>
                <textarea className="form-control" type="text" rows="3"
                          name="descripcion" value={ proyectoState.descripcion } onChange={onInputChange} > 
                </textarea>
            </div>
            <div className="form-group">
                <label className="control-label">¿Completado?</label>
                <select className="form-control" type="text" name="completado" value={ proyectoState.completado } onChange={onInputChange} > 
                    <option value="true">Si</option>
                    <option value="false">No</option>
                </select>
            </div>
            <div className="form-group text-center">
                <button type="submit" className="btn btn-primary mr-1">Guardar</button>
                <button type="button" className="btn btn-danger" onClick={ props.onCancelarModal }>Cancelar</button>
            </div>
        </form>
    );

}

export default FormProyecto;