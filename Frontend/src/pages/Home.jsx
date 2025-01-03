import React from 'react'

import N1 from '../assets/img/N1.png'
import N2 from '../assets/img/N2.png'

import '../styles/pages/Home.css'

const Home = () => {
    return (
        <main className='home'>
            
            <div className="presentation">
                <div className="welcome">
                    <h2>Bienvenidos a nuestra tienda</h2>
                </div>

                <div className="details">
                    <h1>SANSON FIT</h1>
                    <p>
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Obcaecati, 
                        ex odio! Ratione quibusdam ad aliquam omnis porro, earum voluptatibus eum 
                        sapiente facilis sunt unde fugiat aliquid deleniti odio rem veritatis?
                        Pariatur animi aliquid quasi rerum non nulla voluptatem eius enim odit 
                        ipsam culpa rem officia, delectus architecto perferendis ut unde quae 
                        reprehenderit ab. Provident dolore qui sint quo. Esse, nisi!
                    </p>
                    <button>Mas sobre nosotros</button>
                </div>
                
                <div className="products">
                    <img src={N1} alt="" />
                    <img src={N2} alt="" />
                </div>
            </div>

        </main>
    )
}

export default Home