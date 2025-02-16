import { getBaseHeaders,getFormHeaders } from "../utils/http";

const PRODUCTS_ENDPOINT = `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_PRODUCTS_ENDPOINT}`;

export default class ProductsService {
    constructor(client){
        this.client = client;
    }

    getProducts = () => {
        const requestInfo = {url:`${PRODUCTS_ENDPOINT}`,config: getBaseHeaders()};
        return this.client.makeGetRequest(requestInfo);
    }

    createProduct = (product) =>{
        const requestInfo = {url:`${PRODUCTS_ENDPOINT}`,body:product,config: getBaseHeaders()};
        return this.client.makePostRequest(requestInfo);
    }

    deleteProduct = (id) =>{
        const requestInfo = {url: `${PRODUCTS_ENDPOINT}/${id}`,config: getBaseHeaders()};
        return this.client.makeDeleteRequest(requestInfo)
    }
}