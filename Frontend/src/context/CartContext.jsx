import {useState,createContext} from "react";

const Context = createContext();

export const CartContextProvider = ({children}) =>{

    const [cartActivate, setCartActivate] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const toggleCart = () =>{
        setCartActivate(!cartActivate);
    }

    
    return (
        <Context.Provider
            value={{
                cartActivate,
                cartItems,
                setCartActivate,
                toggleCart
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Context;