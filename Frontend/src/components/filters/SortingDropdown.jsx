import React, {useRef, useState } from 'react'

import { IoIosArrowDown } from "react-icons/io";

import useClickOutside from '../../hooks/useClickOutside ';

import '../../styles/components/filters/SortingDropdown.css'


const SortingDropdown = () => {

    const sortingOptions = [
        { value: 1, label: 'Alfabéticamente, A-Z' },
        { value: 2, label: 'Alfabéticamente, Z-A' },
        { value: 3, label: 'Precio, menor a mayor' },
        { value: 4, label: 'Precio, mayor a menor' },
    ];

    const [dropdownActive,setDropdownActive] = useState(false);
    const [sorting, setSorting] = useState(1);

    const dropdownRef = useRef(null)

    useClickOutside(dropdownRef, () => setDropdownActive(false))

    const toggleDropdown = () => setDropdownActive(!dropdownActive);

    const handleRadioChange = (e)=>{
        const value = e.target.value;
        setSorting(value);
    }

    return (
        <div ref={dropdownRef} className="dropdown">

            <button onClick={toggleDropdown}>ORDENAR POR <IoIosArrowDown className='arrowDown-icon'/></button>

            <ul className={`sortings ${dropdownActive? 'sortings-active':''}`}>
                {sortingOptions.map(option => (
                    <li key={option.value}>
                        <label>
                            <input
                                type="radio"
                                name="sort_by"
                                className="radio"
                                value={option.value}
                                onChange={handleRadioChange}
                            />
                            <span className={`label ${sorting == option.value ? 'activate' : ''}`}>
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