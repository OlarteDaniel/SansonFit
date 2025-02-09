import { getBaseHeaders } from "../utils/http";

const SESSIONS_ENDPOINT = `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_SESSIONS_ENDPOINT}`;

export default class SessionsService {
    constructor(client){
        this.client = client;
    }

    getUsers = () => {
        const requestInfo = {url:`${SESSIONS_ENDPOINT}`,config: getBaseHeaders()};
        return this.client.makeGetRequest(requestInfo);
    }
}