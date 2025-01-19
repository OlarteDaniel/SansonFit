import React, { useState } from 'react';
import '../../../styles/components/filters/sideBar/DoubleSlider.css';

const DoubleSlider = () => {
    const [minValue, setMinValue] = useState(0); 
    const [maxValue, setMaxValue] = useState(90); 

    const min = 0; 
    const max = 100; 

    // Maneja los cambios del valor mínimo
    const handleMinChange = (e) => {
        const value = Number(e.target.value);

        // Validación: el valor mínimo no debe exceder (maxValue - 1)
        // y debe ser mayor o igual al límite inferior (min)
        if (value >= min && value <= maxValue - 1) {
            setMinValue(value);
        }
    };

    // Maneja los cambios del valor máximo
    const handleMaxChange = (e) => {
        const value = Number(e.target.value);

        // Validación: el valor máximo no debe ser menor a (minValue + 1)
        // y debe estar dentro del límite superior (max)
        if (value <= max && value >= minValue + 1) {
            setMaxValue(value);
        }
    };

    // Crea un gradiente dinámico para la barra del slider
    const sliderTrackStyle = {
        background: `linear-gradient(to right, 
            #d5d5d5 ${((minValue - min) / (max - min)) * 100}%, 
            #005F9E ${((minValue - min) / (max - min)) * 100}%, 
            #005F9E ${((maxValue - min) / (max - min)) * 100}%, 
            #d5d5d5 ${((maxValue - min) / (max - min)) * 100}%)`,
    };

    return (
        <div className="double-slider">
            <div className="slider-container">

                {/* Aplica el gradiente dinámico como estilo en la barra del slider */}
                <div className="slider-track" style={sliderTrackStyle}></div>

                {/* Slider inferior */}
                <input
                    type="range"
                    className="slider slider-min"
                    min={min}
                    max={max}
                    value={minValue}
                    onChange={handleMinChange}
                />
                {/* Slider superior */}
                <input
                    type="range"
                    className="slider slider-max"
                    min={min}
                    max={max}
                    value={maxValue}
                    onChange={handleMaxChange}
                />
            </div>
            <div className="slider-values">
                {/* Input del valor mínimo */}
                <div className="inputbox-min">
                    <span>
                        Maximo: 
                    </span>
                    <input 
                        type="number" 
                        value={minValue} 
                        min={min} // Límite inferior
                        max={maxValue - 1} // Límite dinámico basado en maxValue
                        onChange={handleMinChange} // Validación en el evento onChange
                    />
                </div>
                {/* Input del valor máximo */}
                <div className="inputbox-max">
                    <span>
                        Minimo:
                    </span>
                    <input 
                        type="number" 
                        value={maxValue} 
                        min={minValue + 1} // Límite dinámico basado en minValue
                        max={max} // Límite superior
                        onChange={handleMaxChange} // Validación en el evento onChange
                    />
                </div>
            </div>
        </div>
    );
};

export default DoubleSlider;
