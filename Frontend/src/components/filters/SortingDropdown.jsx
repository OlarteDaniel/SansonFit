import {useContext, useEffect, useRef, useState } from 'react'

import { IoIosArrowDown } from "react-icons/io";

import ProductContext from '../../context/ProductContext';

import useClickOutside from '../../hooks/useClickOutside ';

import '../../styles/components/filters/SortingDropdown.css'


const SortingDropdown = () => {

    const sortingOptions = [
        { value: { field: 'title', order: 'asc' }, label: 'Alfabéticamente, A-Z' },
        { value: { field: 'title', order: 'desc' }, label: 'Alfabéticamente, Z-A' },
        { value: { field: 'price', order: 'asc' }, label: 'Precio, menor a mayor' },
        { value: { field: 'price', order: 'desc' }, label: 'Precio, mayor a menor' },
    ];

    const [dropdownActive,setDropdownActive] = useState(false);

    const {sorting,setSorting} = useContext(ProductContext);    

    const dropdownRef = useRef(null)

    useClickOutside(dropdownRef, () => setDropdownActive(false))

    const toggleDropdown = () => setDropdownActive(!dropdownActive);

    const handleRadioChange = (e)=>{
        const selected = JSON.parse(e.target.value); // parsea el string a objeto
        setSorting(selected);
    }

    useEffect(()=>{
        console.log('first')
    },[sorting]);

    return (
        <div ref={dropdownRef} className="dropdown">
            <button onClick={toggleDropdown}>ORDENAR POR <IoIosArrowDown className='arrowDown-icon'/></button>

            <ul className={`sortings ${dropdownActive? 'sortings-active':''}`}>
                {sortingOptions.map(option => (
                    <li key={option.label}>
                        <label>
                            <input
                                type="radio"
                                name="sort_by"
                                className="radio"
                                value={JSON.stringify(option.value)}  // stringify aquí
                                onChange={handleRadioChange}
                            />
                            <span className={`label ${JSON.stringify(sorting) === JSON.stringify(option.value) ? 'activate' : ''}`}>
                                {option.label}
                            </span>
                        </label>
                    </li>
                ))}
            </ul>

        </div>
    )
}

export default SortingDropdown