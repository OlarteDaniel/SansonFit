import { useEffect, useState } from 'react'

const useCounter = (stock, initialValue) => {
    const [count, setCount] = useState(initialValue)

    useEffect(() => {
        if (count > stock) {
            setCount(stock);
        }
    }, [count, stock]);

    const incrementar = () =>{
        count < stock && setCount(count + 1) ;
    }

    const decrementar = () =>{
        count > initialValue && setCount(count - 1)
    }

    return {
        count,
        incrementar,
        decrementar
    }
}

export default useCounter