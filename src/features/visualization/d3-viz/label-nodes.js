export const appendLabels = ({nodes, labeledField}) => {
    const labels = nodes
    .append("text")
    .classed("node-label", true)
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
