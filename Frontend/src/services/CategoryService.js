import { getBaseHeaders } from "../utils/http";

const CATEGORY_ENDPOINT = `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_CATEGORY_ENDPOINT}`;

export default class ProductsService {
    constructor(client){
        this.client = client;
    }

    getCategories = () => {
        const requestInfo = {url:`${CATEGORY_ENDPOINT}`,config: getBaseHeaders()};
        return this.client.makeGetRequest(requestInfo);
    }

    getCategoryById = (id) =>{
        const requestInfo = {url:`${CATEGORY_ENDPOINT}/${id}`,config: getBaseHeaders()};  
        return this.client.makeGetRequest(requestInfo);  
    }

    getCategoryByTypeAndName = (type,name)=>{
        const requestInfo = {url:`${CATEGORY_ENDPOINT}/type/${type}/name/${name}`,config: getBaseHeaders()};
        return this.client.makeGetRequest(requestInfo); 
    }

    createCategory = (category) =>{
        const requestInfo = {url:`${CATEGORY_ENDPOINT}`,body:category,config: getBaseHeaders()};
        return this.client.makePostRequest(requestInfo);
    }

}