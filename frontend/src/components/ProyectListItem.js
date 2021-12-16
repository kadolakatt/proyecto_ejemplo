import Status from './Status';

function ProyectListItem({completarProyecto, eliminarProyecto, editarProyecto, ...props}) {

    //Funcion controladora del evento click del botón completar
    const onCompletarProyecto = function(e) {
        //evita que se ejecute el comportamiento por defecto que el navegador
        //tiene configurado para este elemento.
        e.preventDefault();

        //Invoca función completar proyecto que se encuentra en componente
        //App, lo podemos hacer porque la hemos recibido como prop
        completarProyecto(props._id, props.nombre);
    }

    //Función controladora del evento click del boton eliminar
    const onEliminarProyecto = function (e) {
        //evita que se ejecute el comportamiento por defecto que el navegador
        //tiene configurado para este elemento.
        e.preventDefault(); 
        //Invoca función completar proyecto que se encuentra en componente
        //App, lo podemos hacer porque la hemos recibido como prop
        console.log(props);
        eliminarProyecto(props._id);
        //alert('eliminar');
    }

    //Función controladora del evento clic del boton editar
    const onEditarProyecto = function (e) {
        e.preventDefault();
        props.fecha = props.fecha.substr(0,10);
        console.log(props);
        editarProyecto(props); //invocamos este callback props para enviar los datos del proyecto.
    }

    return (
        <a href="none" className="list-group-item list-group-item-action" aria-current="true">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{ props.nombre }</h5>
                    <small>{ props.fecha.substr(0,10) }</small>
                </div>
                <Status status={props.completado} activo="TERMINADO" inactivo="PENDIENTE" />
                <p className="mb-1">{ props.descripcion }</p>
                <small>{ props.director }</small>
                <button onClick={onEliminarProyecto} className="btn btn-sm btn-danger float-sm-end mx-lg-2">Borrar</button>
                <button className="btn btn-sm btn-success float-sm-end mx-lg-1" onClick={ onEditarProyecto } >Editar</button>
                <button onClick={onCompletarProyecto} className="btn btn-sm btn-primary float-sm-end">
                    { props.completado ? "Reabrir" : "Completar" } 
                </button>
            </a>
    );
}

export default ProyectListItem;