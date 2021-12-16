
function Paginator(props) {
    return (
        <nav className="mt-2">
            <ul className="pagination">
                <li className="page-item">
                    <button className="page-link" onClick={ props.onPrevio }>Previo</button>
                </li>
                <li className="page-item">
                    <input className="form-control text-center" value={ props.pagina } 
                           style={{ width: "50px" }} onChange={ props.onPaginaNueva } />
                </li>
                <li className="page-item" onClick={ props.onSiguiente }>
                    <button className="page-link">Siguiente</button>
                </li>
            </ul>
        </nav>
    );
}

export default Paginator;