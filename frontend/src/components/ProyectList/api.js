import axios from 'axios';
import config from '../../config/config.json';

const path = 'projects';

const getToken = () => {
    const tokenData = JSON.parse(localStorage.getItem("tokenAcceso"));
    return tokenData.token;
}


const ObtenerListado = async (page, limit, callback) => {
    const url = `${config.PROTOCOL}://${config.HOST}/${path}/all?page=${page}&limit=${limit}`;
    return await axios.get(url, { headers: { authorization: `Bearer ${ getToken() }` } }).then(function (res) {
                           callback(res.data);
                       })
                       .catch(function (error) {
                           callback(error);
                           console.log(error);
                       });
}

const CrearProyecto = async (data) => {
    const url = `${config.PROTOCOL}://${config.HOST}/${path}/new`;
    try {
        const response = await axios.post(url, data, { headers: { authorization: `Bearer ${ getToken() }` } });
        return response.data;
    } catch (e) {
        console.log(e);
    }
         
}

const CompletarProyecto = async (id) => {
    const url = `${config.PROTOCOL}://${config.HOST}/${path}/complete`;
    try {
        const response = await axios.put(url, { id }, { headers: { authorization: `Bearer ${ getToken() }` } });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

const BorrarProyecto = async (id) => {
    const url = `${config.PROTOCOL}://${config.HOST}/${path}/delete?id=${id}`;
    try {
        console.log(id);
        const response = await axios.post(url, { id }, { headers: { authorization: `Bearer ${ getToken() }` } });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

const ActualizarProyecto = async (proyecto) => {
    const url = `${config.PROTOCOL}://${config.HOST}/${path}/edit`;
    try {
        const response = await axios.put(url, proyecto, { headers: { authorization: `Bearer ${ getToken() }` } });
        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export { 
            ObtenerListado, 
            CrearProyecto, 
            CompletarProyecto, 
            BorrarProyecto, 
            ActualizarProyecto 
        }