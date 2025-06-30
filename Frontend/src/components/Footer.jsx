import React from 'react'

import { SiInstagram } from "react-icons/si";
import { SiFacebook } from "react-icons/si";
import { SiWhatsapp } from "react-icons/si";

import { GiPositionMarker } from "react-icons/gi";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

import '../styles/components/Footer.css'

const Footer = () => {
    return (
        <footer>
            <div className="footer">
                <div className="information">
                    <div className="title">
                        <h2>Sanson Fit</h2>
                    </div>

                    <div className="details info">
                        <p>
                            En Sanson Fit nos comprometemos a brindarte productos de calidad, 
                            atención cercana y el asesoramiento que necesitás para alcanzar tu 
                            mejor versión. Más que un distribuidor de suplementos, somos tu aliado 
                            en el camino hacia una vida saludable y activa.
                        </p>
                    </div>
                </div>

                <div className="contacts">
                    <div className="title">
                        <h2>Contactos</h2>
                    </div>

                    <div className="details data">
                        <div className="address">
                            <GiPositionMarker className='position-icon'/>
                            <p>8819 Ohio St. South Gate</p>
                        </div>

                        <div className="phone">
                            <FaPhoneAlt className='phone-icon'/> 
                            <p>+1 386-688-3295</p>                       
                        </div>

                        <div className="mail">
                            <MdEmail className='mail-icon'/>
                            <p>SansonFit@gmail.com</p>
                        </div>
                    </div>
                </div>

                <div className="networks">
                    <div className="title">
                        <h2>Redes</h2>
                    </div>
                    <div className="details nets">
                        <button><SiInstagram className='instagram-icon'/></button>
                        <button><SiFacebook className='facebook-icon'/></button>
                        <button><SiWhatsapp className='whatsapp-icon'/></button>
                    </div>
                </div>
            </div>

            

        </footer>
    )
}

export default Footer