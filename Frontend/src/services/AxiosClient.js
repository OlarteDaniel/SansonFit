import axios from 'axios';

export default class AxiosClient{

    makeGetRequest = ({url,config}) =>{
        return axios.get(url,{
            ...config,
            validateStatus: status => status < 500
        })
            .then(result =>({
                status: result.status,
                data: result.data
            }))
            .catch(error => ({
                status: error.response?.status || 500,
                error: error.response?.data?.error || 'Error desconocido'
            }))
    };

    makePostRequest = ({url,body,config}) =>{
        return axios.post(url, body, {
            ...config,
            validateStatus: status => status < 500
        })
            .then(result => ({
                status: result.status,
                data: result.data
            }))
            .catch(error => ({
                status: error.response?.status || 500,
                error: error.response?.data?.error || 'Error desconocido'
            }))
    };

    makePutRequest = async({url,body,config}) =>{
        return axios.put(url,body,{
            ...config,
            validateStatus: status => status < 500
        })
            .then(result => ({
                status: result.status,
                data: result.data
            }))
            .catch(error => ({
                status: error.response?.status || 500,
                error: error.response?.data?.error || 'Error desconocido'
            }))
    };

    makeDeleteRequest = ({url,config}) =>{
        return axios.delete(url,{
            ...config,
            validateStatus: status => status < 500
        })
            .then(result => ({
                status: result.status,
                data: result.data
            }))
            .catch(error => ({
                status: error.response?.status || 500,
                error: error.response?.data?.error || 'Error desconocido'
            }))
    };

}

// En caso de error volver a colocar los async