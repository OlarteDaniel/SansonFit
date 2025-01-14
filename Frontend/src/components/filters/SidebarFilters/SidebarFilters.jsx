import React, { useState } from 'react'

import { IoFilter } from "react-icons/io5";
import { BsXLg } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

import DoubleSlider from './DoubleSlider.jsx';

import '../../../styles/components/filters/sideBar/SidebarFilters.css'

const SidebarFilters = () => {

    const types = [
        {   _id: "6755ed3439f16c45e6131b7c",
            name: "Creatina",
            type: "supplements"
        },{
            _id: "6755ed3b39f16c45e6131b7e",
            name: "Creatina",
            type: "supplements"
        },{
            _id: "6755ed5539f16c45e6131b80",
            name: "Creatina",
            type: "supplements"
        },{
            _id: "6755ed3439f16c45e6131b7a",
            name: "Proteina",
            type: "supplements"
        },{
            _id: "6755ed5539f16c45e6131b81",
            name: "Pre-Entreno",
            type: "supplements"
        },{
            _id: "6755ed5539f16c45e6131b82",
            name: "Pre-Entreno",
            type: "supplements"
        }
    ]

    // acc = Acumulador
    // curr = Valor actual
    const uniqueProducts = types.reduce((acc,curr) =>{

        // Si el nombre del producto ya existe en el acumulador, aumenta el contador
        if(acc[curr.name]){
            acc[curr.name].count++;
        }else{
            // Si no existe, crea una nueva entrada con count = 1
            acc[curr.name] = { name: curr.name, count: 1, type: curr.type };
        }
        return acc;
    }, {});

    // Convertimos el objeto en un array
    const result = Object.values(uniqueProducts);

    const [filterMenuActive, setFilterMenuActive] = useState(false);
    const [priceActive, setPriceActive] = useState(false);
    const [typeActive, setTypeActive] = useState(false);

    const toggleFilterMenu = () => setFilterMenuActive(!filterMenuActive);
    const togglePrice = () => setPriceActive(!priceActive);
    const toggleType = () => setTypeActive(!typeActive);

    return (
        <div className='sidebar'>
            <button className='btn' onClick={toggleFilterMenu}> <IoFilter className='filer-icon'/> FILTROS</button>

            <div className={`filter-container ${filterMenuActive? 'filter-active': ''}`}>

                <div className="header">
                    <p>Filtros</p>
                    <button onClick={toggleFilterMenu}><BsXLg className='x-icon'/></button>
                </div>

                <div className="body">

                    <button className={`${priceActive? '':'arrowOne-active'}`} onClick={togglePrice}>Precio <FaArrowRight className='arrow-icon'/> <IoIosArrowUp className='arrowUp-icon'/> </button>

                    <div className= {`prices ${priceActive? 'prices-active':''}`}>

                        <div className="header-prices">
                            <button onClick={togglePrice}><FaArrowLeft/> Precio</button>
                        </div>

                        <div className="body-prices">

                            <div className="inputbox">
                                <label>
                                    Desde
                                    <div className="input">
                                    <span>$</span>
                                    <input type="number" placeholder='0'/>
                                    </div>
                                </label>
                                
                            </div>

                            <div className="inputbox">
                                <label>
                                    Hasta
                                    <div className="input">
                                        <span>$</span>
                                        <input type="number" placeholder='100000'/>
                                    </div>
                                </label>
                                
                            </div>

                            <DoubleSlider/>

                        </div>

                    </div>

                    <button className={`${typeActive? '':'arrowTwo-active'}`} onClick={toggleType}>Tipo de producto <FaArrowRight className='arrow-icon'/> <IoIosArrowUp className='arrowUp-icon'/> </button>

                    <div className={`types ${typeActive? 'types-active':''}`}>

                        <div className="header-types">
                            <button onClick={toggleType}><FaArrowLeft /> Tipo de producto</button>
                        </div>

                        <div className="body-types">
                            {result.map((type) => (
                                <div className="inputbox" key={type.name}>
                                    
                                    <label>
                                        <input type="checkbox"/>

                                        {type.name}

                                        <span>
                                            ({type.count})
                                        </span>

                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="btns">
                    <button className='apply'>APLICAR</button>
                    <button className='trash'><FaRegTrashAlt /></button>
                </div>
            </div>

        </div>
    )
}

export default SidebarFilters