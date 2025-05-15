import { getHeaders,postFileHeaders, postHeaders } from "../utils/http";

const PRODUCTS_ENDPOINT = `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_PRODUCTS_ENDPOINT}`;

export default class ProductsService {
    constructor(client){
        this.client = client;
    }

    getProductById = (id) =>{
        const requestInfo = {url: `${PRODUCTS_ENDPOINT}/${id}`,config:getHeaders()};
        return this.client.makeGetRequest(requestInfo);
    }

    getProducts = (page,field,order,minPrice,maxPrice,filters) => {
        const requestInfo = {url:`${PRODUCTS_ENDPOINT}?page=${page}&sortBy=${field}&order=${order}&minPrice=${minPrice}&maxPrice=${maxPrice}&filters=${filters}`,config: postFileHeaders()};
        return this.client.makeGetRequest(requestInfo);
    }

    getPrices = () =>{
        const requestInfo = {url: `${PRODUCTS_ENDPOINT}/price-range`,config:getHeaders()};
        return this.client.makeGetRequest(requestInfo);
    }

    createProduct = (product) =>{
        const requestInfo = {url:`${PRODUCTS_ENDPOINT}`,body:product,config: getHeaders()};
        return this.client.makePostRequest(requestInfo);
    }

    deleteProduct = (id) =>{
        const requestInfo = {url: `${PRODUCTS_ENDPOINT}/${id}`,config: getHeaders()};
        return this.client.makeDeleteRequest(requestInfo)
    }

    updateProduct = (id,product) => {
        const requestInfo = {url:`${PRODUCTS_ENDPOINT}/${id}`,body:product,config: postHeaders()};
        return this.client.makePutRequest(requestInfo);
    }
}