import React from "react";
import { connect } from "react-redux";
import { updateDataset, updateView, setView } from "domain/dataset"
import selectorStyle from "./ActionReward.module.css"

const ActionRewardSelector = ( { currentTimestep, updateDataset, updateView}) => {
    return(
        <div className={selectorStyle.actionRewardPanel}>
            <h1 id="action-reward-container">
                <span id="action-label" className={selectorStyle.actionLabel}></span>
                <span id="reward-label" className={selectorStyle.rewardLabel}></span>
            </h1>
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