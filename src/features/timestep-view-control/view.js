import React from "react";
import { connect } from "react-redux";
import { setView, updateView } from "domain/dataset"
import selectorStyle from "./View.module.css"

const ViewSelector = ( { view, setView, updateView}) => {
    const handleView = (e) => {
        const selectedValue = e.target.value;
        const boolean = selectedValue === "red" ? true : false;
        setView(boolean);
        updateView(boolean);
    };

    return(
        <div className={selectorStyle.viewPanel}>
            <select onChange={handleView}>
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
    setView,
    updateView
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSelector);