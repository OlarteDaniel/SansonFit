import { getHeaders,postHeaders } from "../utils/http";

const CATEGORY_ENDPOINT = `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_CATEGORY_ENDPOINT}`;

export default class ProductsService {
    constructor(client){
        this.client = client;
    }

    getCategories = () => {
        const requestInfo = {url:`${CATEGORY_ENDPOINT}`,config: getHeaders()};
        return this.client.makeGetRequest(requestInfo);
    }

    getCategoryById = (id) =>{
        const requestInfo = {url:`${CATEGORY_ENDPOINT}/${id}`,config: getHeaders()};  
        return this.client.makeGetRequest(requestInfo);  
    }

    getCategoryByTypeAndName = (type,name)=>{
        const requestInfo = {url:`${CATEGORY_ENDPOINT}/type/${type}/name/${name}`,config: getHeaders()};
        return this.client.makeGetRequest(requestInfo); 
    }

    createCategory = (category) =>{
        const requestInfo = {url:`${CATEGORY_ENDPOINT}`,body:category,config: postHeaders()};
        return this.client.makePostRequest(requestInfo);
    }

    updateCategory = (id,category) =>{
        const requestInfo = {url:`${CATEGORY_ENDPOINT}/${id}`,body:category,config: postHeaders()};
        return this.client.makePutRequest(requestInfo);
    }

    deleteCategory = (id) =>{
        const requestInfo = {url:`${CATEGORY_ENDPOINT}/${id}`,config: getHeaders()};  
        return this.client.makeDeleteRequest(requestInfo);
    }

}