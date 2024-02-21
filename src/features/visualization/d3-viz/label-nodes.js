export const appendLabels = ({nodes, labeledField, heatmapMode}) => {
    const filteredNodes = nodes.filter((d) => {
        return d.height === 0 && d.parent !== null;
    });
    const labels = filteredNodes
    .selectAll("text")
    .attr("class", "node-label")
    .attr("text-anchor", "middle")
    .attr("dy", '0.3em')
    .style("font-size", (d) => getFontSize(d))
    .text((d) => getLabelText(d, heatmapMode))

    return labels;
};

export const getFontSize = (datum) => {
    const fontMultiplier = 0.4;

    const fontSize = datum.r * fontMultiplier;

    return `${fontSize}px`;
}
export const getLabelText = (datum, heatmapMode) => {
    if (datum.height === 0 && datum.parent !== null){
        if (heatmapMode) {
            const label = datum.data["hostname"]
            return label
        } else {
            const ip_address = datum.data["IP Address"]
            if (ip_address) {
                const ip_parts = ip_address.split(".");
                const ip_label = ip_parts[ip_parts.length - 1];
                return ip_label;
            }
        }
    }

};
