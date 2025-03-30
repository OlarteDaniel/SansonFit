import { getHeaders, postFileHeaders, postHeaders } from "../utils/http";

const IMAGES_ENDPOINT = `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_IMAGES_ENDPOINT}`;

export default class ImagesService {
    constructor(client){
        this.client = client;
    }

    addImage = (id,thumbnails) =>{
        const requestInfo = {url:`${IMAGES_ENDPOINT}/${id}/add/image`,body:thumbnails,config: postFileHeaders()};
        return this.client.makePutRequest(requestInfo);
    }

    updateMainImage = (id,thumbnails) =>{
        const requestInfo = {url:`${IMAGES_ENDPOINT}/${id}`,body:thumbnails,config: postHeaders()};
        return this.client.makePutRequest(requestInfo);
    }

    deleteImage = (id,fileId) =>{
        const requestInfo = {url: `${IMAGES_ENDPOINT}/${id}/${fileId}`,config: getHeaders()};
        return this.client.makeDeleteRequest(requestInfo)
    }
}
