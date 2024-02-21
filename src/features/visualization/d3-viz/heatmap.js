import { rgb } from "d3-color";

const heatmapColor = (value) => {
    const normalizedValue = Math.min(Math.max(value, 0), 0.5);
    if (value === 0) {
        const red = 80
        const green = 80
        const blue = 80
        return `rgb(${red}, ${green}, ${blue})`;
    } else {
        const red = Math.round(180 + (normalizedValue/0.5) * (255-180));
        const green = Math.round(122 - ((normalizedValue/0.5)) * (122));
        const blue = Math.round(122 - ((normalizedValue/0.5)) * (122));
        return `rgb(${red}, ${green}, ${blue})`;
    }
    
};

export default heatmapColor;