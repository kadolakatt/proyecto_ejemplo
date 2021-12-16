import axios from 'axios';
import config from '../../config/config.json';

const path = 'users';

const IniciarSesion = async (data) => {
    const url = `${config.PROTOCOL}://${config.HOST}/${path}/login`;
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (e) {
        console.log(e);
    }
         
}

export { IniciarSesion };