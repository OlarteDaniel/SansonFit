import React, {useContext} from 'react'
import { Link } from 'react-router-dom';

import UserContext from '../context/UserContext';

import N1 from '../assets/img/home/N1.png'
import N2 from '../assets/img/home/N2.png'
import Creatina from '../assets/img/home/Creatina-Start.png'
import Proteina from '../assets/img/home/Proteina-Start.png'
import Preentreno from '../assets/img/home/Pre-Entreno-Start.png'


import '../styles/pages/Home.css'

const Home = () => {

    const {session} = useContext(UserContext);

    return (
        <main className='home'>
            <div className="background">
                <div className="presentation">
                    <div className="welcome">
                        <h2>Bienvenido a nuestra tienda</h2>
                    </div>

                    <div className="details">
                        <h1>SANSON FIT</h1>
                        <p>
                            Descubrí nuestra selección de suplementos de alta calidad, cuidadosamente elegidos para ayudarte a mejorar tu 
                            rendimiento, cuidar tu salud y alcanzar tus metas. En Sanson Fit, trabajamos con marcas confiables para 
                            acercarte lo mejor en nutrición deportiva, siempre con un asesoramiento cercano y personalizado.
                        </p>
                        <Link to='/about-us'>
                            <button>Mas sobre nosotros</button>
                        </Link>
                    </div>
                    
                    <div className="products">
                        <img className='img2' src={N2} alt="" />
                        <img className='img1' src={N1} alt="" />
                    </div>
                </div>
            </div>

            <div className="feactured_products">

                <div className="title">
                    <h2>Productos destacados</h2>
                </div>

                <div className="products">

                    <div className="product">
                        <div className="details">
                            <h3>Creatina lorem ipsum</h3>
                            <Link className='link-logo'>Leer Mas</Link>
                        </div>
                        <div className="img">
                            <img src={Creatina} alt="" />
                        </div>
                    </div>

                    <div className="product">
                        <div className="details">
                            <h3>Proteina lorem ipsum</h3>
                            <Link className='link-logo'>Leer Mas</Link>
                        </div>
                        <div className="img">
                            <img src={Proteina} alt="" />
                        </div>
                    </div>

                    <div className="product">
                        <div className="details">
                            <h3>Pre-Entreno lorem ipsum</h3>
                            <Link className='link-logo'>Leer Mas</Link>
                        </div>
                        <div className="img">
                            <img src={Preentreno} alt="" />
                        </div>
                    </div>
                </div>

                <div className="buttons">
                    <Link to='/products'><button>Ver Productos</button></Link>
                    {session?.data.payload.role === 'admin' && 
                        <Link to='/register/product'>
                            <button>
                                Agregar Productos
                            </button>
                        </Link>
                    }
                </div>
            </div>

        </main>
    )
}

export default Home