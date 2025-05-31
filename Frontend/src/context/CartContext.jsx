import {useState,createContext, useEffect, useContext} from "react";
import UserContext from "./UserContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { toast } from 'sonner'

const Context = createContext();


export const CartContextProvider = ({children}) =>{

    const {cartKey} = useContext(UserContext)    

    const [cartActivate, setCartActivate] = useState(false);
    const [total,setTotal] = useState(0);
    const [count,setCount] = useState(0);
    const [cart, setCart] = useLocalStorage(cartKey, []);
    const [storageReady, setStorageReady] = useState(false);

    useEffect(() => {
        if (cartKey) {
            const storedCart = JSON.parse(localStorage.getItem(cartKey)) || [];
            setCart(storedCart);
            setStorageReady(true);
        }
    }, [cartKey]);

    // Usá un efecto para actualizar el localStorage cuando el cart cambie
    useEffect(() => {
        if (cartKey && storageReady) {
            localStorage.setItem(cartKey, JSON.stringify(cart));
        }
    }, [cart, cartKey, storageReady]);

    useEffect(()=>{
        getTotal()
        getCount()
    },[cart])

    const toggleCart = () =>{
        setCartActivate(!cartActivate);
    }

    const addItem = (product, variant, count, imgDefault) => {
        const item = {
            productId: product._id,
            productTitle: product.title,
            price: product.price,
            image: product.thumbnails[0]?.url || imgDefault,
            productDiscount: product.discount,
            variantDiscount: variant.discount,
            flavor: variant.flavor,
            count: count
        };

        setCart(prevItems => {
            // Si no hay ítems previos, simplemente agregamos el primero
            if (!Array.isArray(prevItems) || prevItems.length === 0) {
                toast.success(`¡Genial! Añadiste ${item.productTitle} - ${item.flavor} a tu carrito.`)
                return [item];
            }

            // Verificamos si ya existe ese producto con ese sabor
            const existingIndex = prevItems.findIndex(
                (i) => i.productId === product._id && i.flavor === variant.flavor
            );

            if (existingIndex !== -1) {
                // Hacemos una copia superficial del array con [...prevItems]
                // para evitar modificar directamente el estado anterior (prevItems).
                // Sin embargo, los objetos dentro del array siguen siendo referencias al original,
                // por lo tanto, si modificamos un objeto dentro del nuevo array (como updatedItems[index]),
                // en realidad estamos modificando también el objeto original del estado.

                // Para evitar este efecto colateral y asegurar una actualización inmutable,
                // también duplicamos el objeto (con { ...updatedItems[index] }) antes de modificarlo.
                // De esta forma, React detecta correctamente los cambios y evitamos que el count se sume dos veces.

                const updatedItems = [...prevItems];
                const updatedItem = { ...updatedItems[existingIndex] };
                if(item.count + updatedItem.count <= variant.quantity){
                    updatedItem.count += count;
                    updatedItems[existingIndex] = updatedItem;
                    toast.success(`"${item.count} unidades de ${item.productTitle} - ${item.flavor}" se agregaron a tu carrito.`)
                }else{
                    toast.error("Superaste el limite maximo del producto");
                }
                return updatedItems;
            } else {
                // Si no existe, lo agregamos normalmente
                toast.success(`¡Genial! Añadiste "${item.productTitle} - ${item.flavor}" a tu carrito.`)
                return [...prevItems, item];
                
            }
        });

    };

    const deleteItem = (productTitle,flavor) => {
        setCart(cart.filter(item =>  item.productTitle !== productTitle || item.flavor !== flavor))
    }

    const getTotal = () => {
        const total = cart.reduce((acc, item) => {
            const { price, count, productDiscount = 0, variantDiscount = 0 } = item;
            let totalDiscount = productDiscount + variantDiscount;

            // Limitar descuento total al 100%
            if (totalDiscount > 100) totalDiscount = 100;

            const discountedPrice = price * (1 - totalDiscount / 100);
            return acc + discountedPrice * count;
        }, 0);

        setTotal(total);
    };

    const getCount = () =>{
        let count = cart.reduce((acc, item) => {
            const {count} = item;
            return acc + count
        },0)

        if (count > 99) count = 99

        setCount(count);
    }

    const emptyCart = () =>{
        setCart([]);
    }

    return (
        <Context.Provider
            value={{
                addItem,
                cartActivate,
                cart,
                deleteItem,
                emptyCart,
                count,
                total,
                setCartActivate,
                toggleCart
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Context;