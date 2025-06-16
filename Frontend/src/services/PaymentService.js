import { postHeaders } from "../utils/http";

const PAYMENT_ENDPOINT = `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_PAYMENT_ENDPOINT}`;

export default class PaymentService {
    constructor(client){
        this.client = client;
    }

    createPayment = (products) =>{
        const requestInfo = {url:`${PAYMENT_ENDPOINT}/create-preference`,body:products,config: postHeaders()};
        return this.client.makePostRequest(requestInfo);
    }

}
