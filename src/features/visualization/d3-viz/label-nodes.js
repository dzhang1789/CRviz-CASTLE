export const appendLabels = ({nodes, labeledField}) => {
    const filteredNodes = nodes.filter((d) => {
        return d.height === 0 && d.parent !== null;
    });
    const labels = filteredNodes
    .selectAll("text")
    .attr("class", "node-label")
    .attr("text-anchor", "middle")
    .attr("dy", '0.3em')
    .text((d) => getLabelText(d))
    .style("font-size", (d) => getFontSize(d))

    return labels;
};

export const getFontSize = (datum) => {
    // const fontMultiplier = 0.4;
    const label = getLabelText(datum)
    const labelLength = label ? label.length : 0;
    const fontMultiplier = 1/labelLength + 0.15

    const fontSize = datum.r * fontMultiplier;

    return `${fontSize}px`;
}
export const getLabelText = (datum) => {
    const regex = /hostname/i

    function findKey(obj, regex) {
        for (let key in obj) {
            if (key.match(regex)){
                return key;
            }
        }
        return null;
    }
    const matchedKey = findKey(datum.data, regex)
    const label = matchedKey? datum.data[matchedKey] : null;
    return label;
    // if (datum.height === 0 && datum.parent !== null){
    //     if (heatmapMode) {
    //         const label = datum.data["hostname"]
    //         return label
    //     } else {
    //         const label = datum.data["Hostname"]
    //         console.log(datum)
    //         return label
    //         // const ip_address = datum.data["hostname"]
    //         // if (ip_address) {
    //         //     const ip_parts = ip_address.split(".");
    //         //     const ip_label = ip_parts[ip_parts.length - 1];
    //         //     return ip_label;
    //         // }
    //     }
    // }

};
