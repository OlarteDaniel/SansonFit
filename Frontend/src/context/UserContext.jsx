import React, {useState,createContext, useEffect} from "react";
import { sessionsService } from '../services/services';

const Context = createContext();

export const UserContextProvider = ({children}) => {

    const [session, setSession] = useState(null);

    const fetchSession = async () =>{
        try {
            const result = await sessionsService.currentSession();
            
            if(result?.status === 200){
                setSession(result);
                return;
            }

        } catch (error) {
            console.error('Error obteniendo la session:',error);
        }

        setSession(null);
    };

    useEffect(() =>{
        fetchSession();
    },[]);

    const updateSession = async () => {
        await fetchSession();
    };

    return (
        <Context.Provider 
        value={{
            session,
            setSession,
            updateSession
            }}
        > 
            {children}
        </Context.Provider>
    )
}

export default Context;