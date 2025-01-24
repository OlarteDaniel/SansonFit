import { useState,useEffect } from 'react';

const useScroll = () => {

    const [isScrolled, setIsScrolled] = useState(false);
    const [scrollBase, setScrollBase] = useState(0);
        
    useEffect(() =>{
        const handleScroll = () =>{
            const currentScroll = window.scrollY;

            if(currentScroll == 0 || currentScroll > scrollBase){
                setIsScrolled(false)
            }else if(currentScroll < scrollBase){
                setIsScrolled(true)
            }

            setScrollBase(currentScroll);
        }

        window.addEventListener('scroll',handleScroll);

        return () =>{
            window.removeEventListener('scroll',handleScroll);
        }
    },[scrollBase]);

    return isScrolled;
}

export default useScroll