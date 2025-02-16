import React, { useContext } from 'react'
import { Navigate,Outlet } from 'react-router-dom';

import UserContext from '../../context/UserContext';

const ProtectedRoute = ({children, redirectTo='/'}) => {

    // Actualizar: Recorda que si intentas ingresar a una seccion de la pagina 
    // que se encuentra protegida escribiendo la url, no te dejara ingresar,
    // por el echo de que al ingresar directamente se pierden todos los valores locales
    // Si podes mejoralo para que eso no ocurra

    const {session} = useContext(UserContext);
    if(session?.data.payload.role!=='admin'){
        return <Navigate to={redirectTo}/>
    }

    return children? children : <Outlet/>
}

export default ProtectedRoute