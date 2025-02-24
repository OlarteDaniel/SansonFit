import { getBaseHeaders,getFormHeaders } from "../utils/http";

const VARIANT_SUPPLEMENT_ENDPOINT = `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_VARIANT_SUPPLEMENT}`

export default class VariantService {

    constructor(client){
        this.client = client
    }

    getByProductAndFlavor = async (productId,flavor) => {
        const requestInfo = {url:`${VARIANT_SUPPLEMENT_ENDPOINT}/product/${productId}/flavor/${flavor}`,config:getBaseHeaders()};
        return this.client.makeGetRequest(requestInfo);
    }

    updateFlavor = (flavorId,flavor) =>{
        const requestInfo = {url:`${VARIANT_SUPPLEMENT_ENDPOINT}/${flavorId}`,body:flavor,config:getFormHeaders()};
        return this.client.makePutRequest(requestInfo);
    }

    addFlavor = (productId,flavor) =>{
        const requestInfo = {url:`${VARIANT_SUPPLEMENT_ENDPOINT}/${productId}`,body:flavor,config:getFormHeaders()};
        return this.client.makePostRequest(requestInfo);
    }

}