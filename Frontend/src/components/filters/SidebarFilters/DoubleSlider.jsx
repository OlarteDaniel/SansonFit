import { useState } from 'react';

import '../../../styles/components/filters/sideBar/DoubleSlider.css';

const DoubleSlider = ({min, max, changePrice, priceMax}) => {

    const minLimit = 0;
    const maxLimit = priceMax;

    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(max);

    const adjustValues = (value, isMin) => {
        if (isMin) {
            if (value >= minLimit) {
                if (value >= maxValue) {
                    setMaxValue(Math.min(value + 1, maxLimit));
                }
                setMinValue(value);
            }
        } else {
            if (value <= maxLimit) {
                if (value <= minValue) {
                    setMinValue(Math.max(value - 1, minLimit));
                }
                setMaxValue(value);
            }
        }
    };

    const handleMinChange = (e) => adjustValues(Number(e.target.value), true);
    const handleMaxChange = (e) => adjustValues(Number(e.target.value), false);

    const handleSliderRelease = () => {
        changePrice({min:minValue, max:maxValue })
    };

    // Crea un gradiente dinámico para la barra del slider
    const sliderTrackStyle = {
        background: `linear-gradient(to right, 
            #d5d5d5 ${((minValue - minLimit) / (maxLimit - minLimit)) * 100}%, 
            #005F9E ${((minValue - minLimit) / (maxLimit - minLimit)) * 100}%, 
            #005F9E ${((maxValue - minLimit) / (maxLimit - minLimit)) * 100}%, 
            #d5d5d5 ${((maxValue - minLimit) / (maxLimit - minLimit)) * 100}%)`,
    };

    return (
        <div className="double-slider">
            <div className="slider-container" onMouseUp={handleSliderRelease} onTouchEnd={handleSliderRelease}>
                <div className="slider-track" style={sliderTrackStyle}></div>
                <input
                    type="range"
                    className="slider slider-min"
                    min={minLimit}
                    max={maxLimit}
                    value={minValue}
                    step={5}
                    onChange={handleMinChange}
                />
                <input
                    type="range"
                    className="slider slider-max"
                    min={minLimit}
                    max={maxLimit}
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
                        min={minLimit}
                        max={maxValue - 1}
                        onChange={handleMinChange}
                        onBlur={handleSliderRelease}
                        
                    />
                </div>
                <div className="inputbox-max">
                    <span>Máximo:</span>
                    <input
                        type="number"
                        value={maxValue}
                        min={minValue + 1}
                        max={maxLimit}
                        onChange={handleMaxChange}
                        onBlur={handleSliderRelease}
                    />
                </div>
            </div>
        </div>
    );
};

export default DoubleSlider;
