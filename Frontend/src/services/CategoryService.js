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

}