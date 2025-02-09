import axios from 'axios';

export default class AxiosClient{

    makeGetRequest = async({url,config}) =>{
        try {
            const result = await axios.get(url,config)

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
    }

    makePostRequest = async({url,body,config}) =>{
        try {
            const result = await axios.post(url,body,config);

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
    }

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
    }

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
    }

}