import React, {useState} from "react";
import { connect } from "react-redux";
import { updateView } from "domain/dataset"

const ViewSelector = ( { updateView }) => {
    const view = useState(null)
    const handleView = (e) => {
        const selectedValue = e.target.value;
        const boolean = selectedValue === "red" ? true : false;
        console.log(boolean)
        updateView(boolean);
    };

    return(
        <div>
            <select onChange={handleView} value={view ? "red" : "true"}>
                <option value='red'>Red</option>
                <option value='true'>True</option>
            </select>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        view: state.controls.view,
    };
};

const mapDispatchToProps = {
    updateView
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSelector);