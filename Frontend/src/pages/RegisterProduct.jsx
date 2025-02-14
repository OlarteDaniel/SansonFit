import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';

import UserContext from '../context/UserContext';

import '../styles/pages/RegisterProduct.css'


const RegisterProduct = () => {

    const {session} = useContext(UserContext);
    
    if(session?.data.payload.role!=='admin'){
        return <Navigate to='/'/>
    }

    return (
        <main className='registerProduct'>
            <div className="container">
                <h2 className='title'>Registrar Producto</h2>
                <form className="form">

                    <div className="inputbox">
                        <label>Titulo</label>
                        <input type="text"/>
                    </div>

                    <div className="inputbox">
                        <label>Descripcion</label>
                        <input type="text"/>
                    </div>

                    <div className="inputbox">
                        <label>Codigo</label>
                        <input type="text"/>
                    </div>

                    <div className="inputbox">
                        <label>Categoria</label>
                        <select>

                        </select>
                    </div>

                    <div className="inputbox">
                        <label>Imagenes</label>
                        <input type="file"/>
                    </div>

                    <div className="inputbox">
                        <label>Estado</label>
                        <select>
                            <option value={true} >ACTIVO</option>
                            <option value={false}>INACTIVO</option>
                        </select>
                    </div>

                    <div className="btns">
                        <button type="submit">Agregar</button>
                        <button type="reset">Resetear</button>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default RegisterProduct