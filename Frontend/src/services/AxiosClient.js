import axios from 'axios';

export default class AxiosClient{

    makeGetRequest = async({url,config}) =>{
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

    makePostRequest = async({url,body,config}) =>{
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

    makeDeleteRequest = async({url,config}) =>{
        try {
            const result = await axios.delete(url,config)

            return {
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

}