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

    return labels;
};

export const getLabelText = (datum) => {
    if (datum.height === 0 && datum.parent !== null){
        const ip_address = datum.data["IP Address"].split(".");
        const ip_label = ip_address[ip_address.length - 1];

        return ip_label;
    }
    
};
