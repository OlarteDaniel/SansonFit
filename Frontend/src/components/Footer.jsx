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
        <footer className='footer'>

            <div className="information">
                <div className="title">
                    <h2>Sanson Fit</h2>
                </div>

                <div className="details">
                    <p>
                    Lorem ipsum dolor sit amet consectetur 
                    adipisicing elit. Architecto perferendis 
                    magnam quis ut ratione minus reiciendis 
                    accusantium adipisci nihil illo veniam 
                    reprehenderit omnis quas rem, inventore et 
                    facilis vitae maiores.
                    </p>
                </div>
            </div>

            <div className="contacts">
                <div className="title">
                    <h2>Contactos</h2>
                </div>

                <div className="details">
                    <div className="address">
                        <GiPositionMarker/>
                        <p>8819 Ohio St. South Gate</p>
                    </div>

                    <div className="phone">
                        <FaPhoneAlt/> 
                        <p>+1 386-688-3295</p>                       
                    </div>

                    <div className="mail">
                        <MdEmail/>
                        <p>SansonFit@gmail.com</p>
                    </div>
                </div>
            </div>

            <div className="networks">

            </div>

        </footer>
    )
}

export default Footer