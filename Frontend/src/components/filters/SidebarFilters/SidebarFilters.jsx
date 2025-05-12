import React, { useEffect, useRef, useState } from 'react'

import {categoryService} from '../../../services/services';

import { IoFilter } from "react-icons/io5";
import { BsXLg } from "react-icons/bs";
import { FaArrowRight } from "react-icons/fa6";
import { FaArrowLeft } from "react-icons/fa6";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";

import DoubleSlider from './DoubleSlider.jsx';
import useClickOutside from '../../../hooks/useClickOutside .jsx';

import '../../../styles/components/filters/sideBar/SidebarFilters.css'


const SidebarFilters = () => {

    const [types,setTypes] = useState([]);
    const [filters, setFilters] = useState([])
    const [filterMenuActive, setFilterMenuActive] = useState(false);
    const [priceActive, setPriceActive] = useState(false);
    const [typeActive, setTypeActive] = useState(false);

    const toggleFilterMenu = () => {
        setFilterMenuActive(!filterMenuActive);
    }

    const togglePrice = () => setPriceActive(!priceActive);
    const toggleType = () => setTypeActive(!typeActive);

    const dropdownRef = useRef(null)

    useClickOutside(dropdownRef, () =>{
        if(dropdownRef.current.className === 'filter-container filter-active'){
            setFilterMenuActive(false)
            setPriceActive(false);
            setTypeActive(false);
        }
    })

    const addFilters = (active, type) => {
        setFilters(prev =>
            active ? [...prev, type] : prev.filter(f => f !== type)
        );
    };
    

    const fetchCategories = async ()=>{
        try {
            const result = await categoryService.getCategories();
            if(result.status === 200 && result.data?.payload){
                setTypes(result.data.payload);
            }
        } catch (error) {
            setTypes([])
            console.error('Error al obtener categorias:', error)
        }
    }

    useEffect(() =>{
        fetchCategories();
    },[])

    return (
        <div className='sidebar'>
            <button className='btn' onClick={toggleFilterMenu}> <IoFilter className='filer-icon'/> FILTROS</button>

            <div ref={dropdownRef} className={`filter-container ${filterMenuActive? 'filter-active': ''}`}>

                <div className="header">
                    <p>Filtros</p>
                    <button onClick={toggleFilterMenu}><BsXLg className='x-icon'/></button>
                </div>

                <div className="body">

                    <button className={`arrowOne ${priceActive? '':'arrowOne-active'}`} onClick={togglePrice}>Precio <FaArrowRight className='arrow-icon'/> <IoIosArrowUp className='arrowUp-icon'/> </button>

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

                    <button className={`arrowTwo ${typeActive? '':'arrowTwo-active'}`} onClick={toggleType}>Tipo de producto <FaArrowRight className='arrow-icon'/> <IoIosArrowUp className='arrowUp-icon'/> </button>

                    <div className={`types ${typeActive? 'types-active':''}`}>

                        <div className="header-types">
                            <button onClick={toggleType}><FaArrowLeft /> Tipo de producto</button>
                        </div>

                        <div className="body-types">
                            {types.map((type) => (
                                <div className="inputbox" key={type.name}>
                                    
                                    <label>
                                        <input onChange={(e)=> addFilters(e.target.checked, type.name)} type="checkbox"/>
                                        {type.name}
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