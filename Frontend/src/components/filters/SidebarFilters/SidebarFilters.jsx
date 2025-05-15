import { useEffect, useRef, useState, useContext } from 'react'

import {categoryService} from '../../../services/services';

import ProductContext from '../../../context/ProductContext';

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

    const {prices,setPricesFilter,minMaxPrices, setFilters} = useContext(ProductContext);    

    const [types,setTypes] = useState([]);
    const [filterMenuActive, setFilterMenuActive] = useState(false);
    const [priceActive, setPriceActive] = useState(false);
    const [typeActive, setTypeActive] = useState(false);
    const [selectedTypes, setSelectedTypes] = useState([]);

    const [min, setMin] = useState(prices.min || 0);
    const [max, setMax] = useState(prices.max || 100000);

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

        setSelectedTypes(prev =>
            active ? [...prev, type] : prev.filter(id => id !== type)
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
        minMaxPrices()
    },[])

    const handleApplyFilters = () => {
        const parsedMin  = parseFloat(min) || 0;
        const parsedMax  = parseFloat(max) || 100000;
        setPricesFilter({min:parsedMin, max:parsedMax })
    };

    const resetFilters = () =>{
        setFilters([])
        setSelectedTypes([]);
        setPricesFilter({min: prices.min ,max:prices.max})
    }

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
                                    <input type="number" value={min} onChange={(e) => setMin(Number(e.target.value))}/>
                                    </div>
                                </label>
                                
                            </div>

                            <div className="inputbox">
                                <label>
                                    Hasta
                                    <div className="input">
                                        <span>$</span>
                                        <input type="number" value={max} onChange={(e) => setMax(Number(e.target.value))} />
                                    </div>
                                </label>
                                
                            </div>

                            <DoubleSlider min={min} max={max} changePrice={setPricesFilter} priceMax={prices.max}/>

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
                                        <input
                                            type="checkbox"
                                            checked={selectedTypes.includes(type._id)}
                                            onChange={(e) => addFilters(e.target.checked, type._id)}
                                        />
                                        {type.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="btns">
                    <button className='apply' onClick={handleApplyFilters}>APLICAR</button>
                    <button className='trash' onClick={resetFilters}><FaRegTrashAlt /></button>
                </div>
            </div>

        </div>
    )
}

export default SidebarFilters