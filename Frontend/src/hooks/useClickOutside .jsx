import { useEffect } from "react";

const useClickOutside = (ref, callback) => {
    useEffect(() => {

    const handleClickOutside = (event) => {
        // Verificar si el clic fue fuera del elemento referenciado
        if (ref.current && !ref.current.contains(event.target)) {
            callback(); // Llamar la función proporcionada
        }
    };

    // Escuchar eventos de clic
        document.addEventListener("mousedown", handleClickOutside);

    // Limpiar el evento al desmontar el componente
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref, callback]);
};

export default useClickOutside;