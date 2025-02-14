import axios from 'axios';

export default class AxiosClient{

    makeGetRequest = ({url,config}) =>{
        return axios.get(url,config)
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
        return axios.post(url, body, config)
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
        try {
            const result = await axios.put(url,body,config);

            return{
                status: result.status,
                data: result.data
            }
        } catch (error) {
            if(config.withStackTrace){
                console.log(error)
            }else{
                console.log(error.message)
            }
        }
    };

    makeDeleteRequest = ({url,config}) =>{
        return axios.delete(url,config)
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