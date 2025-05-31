import {useState,createContext, useEffect} from "react";
import { sessionsService } from '../services/services';

const Context = createContext();

export const UserContextProvider = ({children}) => {

    const [session, setSession] = useState(null);
    const [cartKey, setCartKey] = useState('cart_guest');

    const fetchSession = async () =>{
        try {
            const result = await sessionsService.currentSession();
            
            if(result?.status === 200){
                setSession(result);
                setCartKey(result.data.payload.id ? `cart_${result.data.payload.id}` : 'cart_guest')
                return;
            }

        } catch (error) {
            console.warn('El usuario no está autenticado o hubo un error en la sesión.');
        }

        setSession(null);
    };

    const updateSession = async () => {
        await fetchSession();
    };

    useEffect(() =>{
        fetchSession();
    },[]);

    return (
        <Context.Provider 
        value={{
            cartKey,
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