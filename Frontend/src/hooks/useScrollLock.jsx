import { useState,useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollLock = () =>{
    const bodyStyle = document.body.style
    const [isLocked,setIsLocked] = useState(
        bodyStyle.overflow === 'hidden'
    )
    const location = useLocation();

    useEffect(() =>{
        bodyStyle.overflowY = isLocked? 'hidden' : 'auto'
    },[isLocked,bodyStyle])

    useEffect(() =>{
        setIsLocked(false)
    },[location])


    const toggle = () => setIsLocked(!isLocked);

    return [toggle,setIsLocked]
}

export default useScrollLock