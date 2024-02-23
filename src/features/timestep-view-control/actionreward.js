import React from "react";
import { connect } from "react-redux";
import { setCurrentTimestep, updateDataset, updateView, setView } from "domain/dataset"
import selectorStyle from "./ActionReward.module.css"

const ActionRewardSelector = ( { currentTimestep, updateDataset, updateView}) => {
    const handleChangeTimestep = (newTimestep) => {
        setCurrentTimestep(newTimestep);
        updateDataset(newTimestep)
    };

    return(
        <div className={selectorStyle.actionRewardPanel}>
            <h1></h1>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        action_reward: state.controls.action_reward,
    };
};

const mapDispatchToProps = {
    updateDataset,
    setView,
    updateView
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionRewardSelector);