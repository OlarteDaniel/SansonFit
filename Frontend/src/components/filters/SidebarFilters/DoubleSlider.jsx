import React, { useState } from 'react';
import '../../../styles/components/filters/sideBar/DoubleSlider.css';

const DoubleSlider = () => {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(100);
    const min = 0;
    const max = 100;

    const adjustValues = (value, isMin) => {
        if (isMin) {
            if (value >= min) {
                if (value >= maxValue) {
                    setMaxValue(Math.min(value + 1, max));
                }
                setMinValue(value);
            }
        } else {
            if (value <= max) {
                if (value <= minValue) {
                    setMinValue(Math.max(value - 1, min));
                }
                setMaxValue(value);
            }
        }
    };

    const handleMinChange = (e) => adjustValues(Number(e.target.value), true);
    const handleMaxChange = (e) => adjustValues(Number(e.target.value), false);

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
                <div className="slider-track" style={sliderTrackStyle}></div>
                <input
                    type="range"
                    className="slider slider-min"
                    min={min}
                    max={max}
                    value={minValue}
                    step={5}
                    onChange={handleMinChange}
                />
                <input
                    type="range"
                    className="slider slider-max"
                    min={min}
                    max={max}
                    value={maxValue}
                    step={5}
                    onChange={handleMaxChange}
                />
            </div>
            <div className="slider-values">
                <div className="inputbox-min">
                    <span>Mínimo:</span>
                    <input
                        type="number"
                        value={minValue}
                        min={min}
                        max={maxValue - 1}
                        onChange={handleMinChange}
                    />
                </div>
                <div className="inputbox-max">
                    <span>Máximo:</span>
                    <input
                        type="number"
                        value={maxValue}
                        min={minValue + 1}
                        max={max}
                        onChange={handleMaxChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default DoubleSlider;
