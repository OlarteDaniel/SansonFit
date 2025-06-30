import { FiTarget } from "react-icons/fi";
import { IoIosFitness } from "react-icons/io";
import { LuTestTubeDiagonal } from "react-icons/lu";
import '../styles/pages/AboutUs.css';

import bannerImg from '../assets/img/banner/BannerOficial.png';

const AboutUs = () => {
    return (
        <main className="aboutUs">
            <div className="banner">
                <div className="img">
                    <img src={bannerImg} alt="Banner Sanson Fit" />
                </div>
            </div>
            <div className="info">
                <div className="history">
                    <p>
                        Mi nombre es <strong>Alan Salinas</strong>, y soy el fundador de <strong>Sanson Fit</strong>, 
                        un emprendimiento que nació desde una experiencia personal y un fuerte deseo de ayudar a otros. 
                        Durante mucho tiempo, estuve buscando un camino que me permitiera mejorar tanto física como mentalmente. 
                        Fue entonces cuando descubrí el mundo del entrenamiento y la nutrición. Hoy, con Sanson Fit, quiero devolver esa ayuda 
                        a quienes están comenzando su propio camino de transformación.
                    </p>
                </div>

                <div className="cards">
                    <div className="card-info">
                        <div className="title">
                            <FiTarget className="icon"/>
                            Nuestra Misión
                        </div>
                        <p>
                            Ayudar a las personas a mejorar su rendimiento físico, salud y bienestar. 
                            Ofrecemos suplementos de calidad con asesoramiento confiable.
                        </p>
                    </div>
                    <div className="card-info">
                        <div className="title">
                            <IoIosFitness className="icon"/>
                            Nuestros Valores
                        </div>
                        <ul>
                            <li>Confianza</li>
                            <li>Compromiso</li>
                            <li>Accesibilidad</li>
                            <li>Cercanía</li>
                        </ul>
                    </div>
                    <div className="card-info">
                        <div className="title">
                            <LuTestTubeDiagonal className="icon"/>
                            ¿Por qué elegirnos?
                        </div>
                        <ul>
                            <li>Variedad de productos</li>
                            <li>Envíos rápidos en toda la ciudad</li>
                            <li>Asesoramiento personalizado</li>
                            <li>Promociones exclusivas para clientes</li>
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default AboutUs;
