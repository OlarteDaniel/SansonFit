import { getBaseHeaders,getFormHeaders} from "../utils/http";

const SESSIONS_ENDPOINT = `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_SESSIONS_ENDPOINT}`;

export default class SessionsService {
    constructor(client){
        this.client = client;
    }

    registerUser = (user) =>{
        const requestInfo = {url:`${SESSIONS_ENDPOINT}/register`,body:user,config: getFormHeaders()};
        return this.client.makePostRequest(requestInfo);
    }

    loginUser = (user)=>{
        const requestInfo = {url: `${SESSIONS_ENDPOINT}/login`,body:user,config: getFormHeaders()};
        return this.client.makePostRequest(requestInfo);
    }

    currentSession = () => {
        const requestInfo = {url:`${SESSIONS_ENDPOINT}/current`,config: getBaseHeaders()};
        return this.client.makeGetRequest(requestInfo);
    }

    logoutSession = () => {
        const requestInfo = {url:`${SESSIONS_ENDPOINT}/logout`,config: getBaseHeaders()};
        return this.client.makeGetRequest(requestInfo);
    }
}