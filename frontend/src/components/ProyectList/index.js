import ProyectListItem from "../ProyectListItem";
import Paginator from "../Paginator";
import FormProyecto from "../FormProyecto";

import { 
            ObtenerListado, CrearProyecto, 
            CompletarProyecto, BorrarProyecto, 
            ActualizarProyecto 
        } from "./api";

import { Modal, Spinner } from 'react-bootstrap';
import { Fragment, useState, useEffect } from "react";

function ProyectList() {

    const [ vProyectos, setvProyectos ] = useState([]);
    const [ pagina, setPagina ] = useState(1);
    const [ refrescar, setRefrescar ] = useState(false);
    const [ showLoading, setShowLoading ] = useState(true);
    const [ elementosTotales, setElementosTotales ] = useState(0);
    const [ esError, setEsError ] = useState(false);
    const [ mensaje, setMensaje ] = useState('');
    
    //Parametros de configuración del Modal
    const [ paramModal, setParamModal ] = useState({
        titulo: "",
        mostrar: false,
        modo: "nuevo",
        onGuardar: null,
        proyecto: null
    });

    const limite = 10;

    
    //Efecto secundario que carga los datos desde el backend
    //los estados pagina y limite tienen los parametros de paginación
    useEffect(function () {
        console.log('Enviando petición...');
        setShowLoading(true);
        ObtenerListado(pagina, limite, function (responseData) {
            console.log(responseData);
            setShowLoading(false);
            if (responseData?.data) {
                setvProyectos(responseData.data);
                setElementosTotales(responseData.count);
            }
        });
    },[pagina, limite, refrescar]);
       
    //EVENTOS
    const onRefrescar = function () {
        setRefrescar(true);
    }

    //INICIO EVENTOS PAGINADOR
    const onPrevio = function () {
        if (pagina >=2) {
            setPagina(pagina-1);
        }
    }
    const onSiguiente = function () {
        if (pagina < (elementosTotales/limite)) {
            setPagina(pagina+1);
        }
    }
    const onPaginaNueva = function(e) {
        
        if (parseInt(e.target.value) >=1 && 
           (parseInt(e.target.value) <= parseInt(elementosTotales/limite))) {
            setPagina(e.target.value);
        }
    }
    //FIN EVENTOS PAGINADOR

    //Clic del botón registrar proyecto
    const onRegistrarProyecto = function (evt) {
        evt.preventDefault();
        
        const paramNuevos = {...paramModal};
              paramNuevos.modo = "nuevo";
              paramNuevos.mostrar = true;
              paramNuevos.titulo = "Registrar Proyecto";
              paramNuevos.onGuardar= onNuevoProyecto;
        setParamModal(paramNuevos);
        setShowLoading(false);
    }

    //Clic el botón editar proyecto
    const onEditarProyecto = function (proyectoEditado) {
        const paramNuevos = {...paramModal};
        paramNuevos.modo = "editar";
        paramNuevos.mostrar = true;
        paramNuevos.titulo = "Actualizar Proyecto";
        paramNuevos.onGuardar= onActualizarProyecto;
        paramNuevos.proyecto = proyectoEditado;
        setParamModal(paramNuevos);
    }

    //EVENTOS MODAL
    //Cancelar el Modal
    const onCancelarModal = function () {
        const paramNuevos = {...paramModal};
        paramNuevos.mostrar = false;
        setParamModal(paramNuevos);
    }

    const onNuevoProyecto = async function (nuevoProyecto) {
        setShowLoading(true);
        const responseData = await CrearProyecto(nuevoProyecto);
        if (responseData) {
            setEsError(false);
            setMensaje('Se guardó el proyecto exitosamente.');
            setRefrescar(!refrescar);
        } else {
            setEsError(true);
            setMensaje('Ocurrió un error al intentar guardar el proyecto. Intente nuevamente o contacte a soporte técnico.');
        }
        setShowLoading(false);
    }

    //Función para marcar un proyecto como completado si se encuentra pendiente.
    //Si el proyecto está terminado lo coloca abierto.
    const onCompletarProyecto = async function(id) {
        const responseData = await CompletarProyecto(id);
        if (responseData) {
            setRefrescar(!refrescar);
        } else {
            console.log('Ocurrió un error al intentar guardar el proyecto. Intente nuevamente o contacte a soporte técnico.');
        }
        
    }
    const onEliminarProyecto = async function (id) {
        const responseData = await BorrarProyecto(id);
        if (responseData) {
            setEsError(false);
            setRefrescar(!refrescar);
        } else {
            console.log('Ocurrió un error al intentar guardar el proyecto. Intente nuevamente o contacte a soporte técnico.');
        }
    }

    const onActualizarProyecto = async function (proyectoActualizdo)  {
        setShowLoading(true);
        const responseData = await ActualizarProyecto(proyectoActualizdo);
        if (responseData) {
            setEsError(false);
            setMensaje('Se guardó el proyecto exitosamente.');
            setRefrescar(!refrescar);
        } else {
            setEsError(true);
            setMensaje('Ocurrió un error al intentar guardar el proyecto. Intente nuevamente o contacte a soporte técnico.');
        }
        setShowLoading(false);
    }

    //Esta forma de enviar los props hace lo mismo que la de arriba
    //pero al utilizar destructuracion se vuelve más dinamica porque 
    //cualquier atributo nuevo de proyecto va a ser enviado automaticamente 
    //como prop a ProyectListItem
    const listaProyectos = vProyectos.map ( p => 
        <ProyectListItem 
            completarProyecto={ onCompletarProyecto }
            eliminarProyecto = { onEliminarProyecto }
            editarProyecto = { onEditarProyecto }
            key={ p._id }
            {...p}
        />
    );

    return (
        <Fragment>
            <div className="container">
                <div className="card mt-lg-5">
                    <div className="card-body">
                        <button className="btn btn-outline-primary float-sm-end ml-1" onClick={ onRefrescar } >
                            Refrescar
                        </button>                        
                        <button className="btn btn-success float-sm-end" onClick={ onRegistrarProyecto }>
                            Registrar Proyecto
                        </button>
                        <h3>Dashboard</h3>
                        <h5 className="text-muted">Bienvenido al sistema</h5>
                    </div>
                </div>

                <Paginator pagina= { pagina } onPrevio= { onPrevio } 
                           onSiguiente= { onSiguiente } onPaginaNueva={ onPaginaNueva } /> 

                { showLoading ? <div className="col-sm-12 text-center"><Spinner animation="border" variant="primary" /></div> : <div className="list-group mt-2">{listaProyectos}</div> }

                <Paginator pagina= { pagina } onPrevio= { onPrevio } 
                           onSiguiente= { onSiguiente } onPaginaNueva={ onPaginaNueva } /> 

                <Modal show={ paramModal.mostrar } onHide={ onCancelarModal } >
                    <Modal.Header closeButton className="bg-primary text-white">
                        <Modal.Title>{ paramModal.titulo }</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        { 
                            showLoading ? <div className="col-sm-12 text-center">
                                            <Spinner animation="border" variant="primary" />
                                          </div> 
                                        : 
                                          <FormProyecto modo={ paramModal.modo }
                                                        proyecto={ paramModal.proyecto }
                                                        onGuardar={ paramModal.onGuardar } 
                                                        onCancelarModal={ onCancelarModal } /> 
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        { esError ? <label className="text-danger">{ mensaje }</label> : <label className="text-success">{ mensaje }</label> }
                    </Modal.Footer>
                </Modal>
            </div>
        </Fragment>
        
    );
}

export default ProyectList;