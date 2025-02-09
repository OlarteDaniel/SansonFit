import { getBaseHeaders } from "../utils/http";

const PRODUCTS_ENDPOINT = `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_PRODUCTS_ENDPOINT}`;

export default class ProductsService {
    constructor(client){
        this.client = client;
    }

    getProducts = () => {
        const requestInfo = {url:`${PRODUCTS_ENDPOINT}`,config: getBaseHeaders()};
        return this.client.makeGetRequest(requestInfo);
    }
}