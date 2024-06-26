import React, {useState} from "react";
import { connect } from "react-redux";
import { setCurrentTimestep, updateDataset } from "domain/dataset"
import selectorStyle from "./TimestepSelector.module.css"

const TimestepSelector = ( {currentTimestep, setCurrentTimestep, updateDataset }) => {
    const [pendingTimestep, setPendingTimestep] = useState(currentTimestep);

    const handleChangeTimestep = (e) => {
        setPendingTimestep(e.target.value);
    };

    const handleConfirm = () => {
        setCurrentTimestep(pendingTimestep);
        updateDataset(pendingTimestep)
    }


    return(
        <div className={selectorStyle.timestepPanel}>
            <input
                type="number"
                className={selectorStyle.inputStyle}
                placeholder="Enter Timestep"
                value={currentTimestep}
                onChange={handleChangeTimestep}
            />
            <button 
                className={selectorStyle.inputButton} 
                onClick={handleConfirm}
                > GO
            </button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        currentTimestep: state.controls.currentTimestep,
    };
};

const mapDispatchToProps = {
    setCurrentTimestep,
    updateDataset
};

export default connect(mapStateToProps, mapDispatchToProps)(TimestepSelector);
// const defaultState = {
//     globalTimestep: {"currentTimestep": 0},
// };

// class TimestepSelector extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = this.initialState;
//         this.state = {
//             currentTimestep: props.currentTimestep || 0,
            
//         };
//     }

//     handleChangeTimestep = (event) => {
//         this.setState({
//             currentTimestep: event.target.value,
//         });
//         console.log(this.state)
//     };
    
//     applyTimestep = () => {
//         const  currentTimestep  = this.state;
//         if ( currentTimestep ) {
//             this.props.setCurrentTimestep(currentTimestep);
//         }
//         console.log(currentTimestep)
//     };

//     render() {
//         const { currentTimestep } = this.state;
//         return (
//             <>
//             <div className={selectorStyle.timestepPanel}>
//                 <input
//                     type="number"
//                     className={selectorStyle.inputStyle}
//                     placeholder="Enter Timestep"
//                     value={currentTimestep}
//                     onChange={this.handleChangeTimestep}
//                 />
//                 <button
//                 className={`button circular ${selectorStyle.applyButton}`}
//                 onClick={this.applyTimestep}>
//                     Apply
//                 </button>
//             </div>
//             </>
//         )
//     }
// }

